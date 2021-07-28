var express = require("express");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const {Transformer} = require("../models/transformer");
const {Service} = require("../models/service");

const {queue} = require("../service/schedulerService");
const KafkaService = require("../helpers/kafkaUtil");
const {Vault} = require("../helpers/vault");

const uuid = require("uuid/v1");
const messageUtils = require("../service/messageUtil");
const TransMessages = messageUtils.TRANSFORMER;
const programMessages = messageUtils.PROGRAM;
const responseCode = messageUtils.RESPONSE_CODE;
const errorCode = messageUtils.ERRORCODES;

// Refactor this to move to service
async function getAll(req, res) {
    const allTransformers = await Transformer.query().withGraphFetched("service");
    KafkaService.refreshSubscribers(allTransformers);
    sendSuccessRes(req,allTransformers,res)
}

async function getByID(req, res) {
    const errCode =
    programMessages.EXCEPTION_CODE + "_" + TransMessages.FORM.EXCEPTION_CODE;
    const transformer = await Transformer.query()
        .findById(req.params.id)
        .withGraphFetched("service");
        if(transformer){
            sendSuccessRes(req,transformer,res) 
        } else{
            sendErrorRes(req,res,
                TransMessages.UPDATE.FAIL_CODE,
                errorCode,
                TransMessages.UPDATE.FAIL_MESSAGE,
                `Transformer does not exists with the id ${req.params.id}`,
                errCode)
        }
}

async function update(req, res) {
    const data = req.body.data;
    const errCode =
    programMessages.EXCEPTION_CODE + "_" + TransMessages.UPDATE.EXCEPTION_CODE;
    const isExisting =
        (await Transformer.query().findById(req.params.id)) !== undefined;

    const serviceTxn = await Service.startTransaction();
    const transformerTxn = await Transformer.startTransaction();

    if (!isExisting) {
        sendErrorRes(req,res,
            TransMessages.UPDATE.FAIL_CODE,
            errorCode,
            TransMessages.UPDATE.FAIL_MESSAGE,
            `Transformer does not exists with the id ${req.params.id}`,
            errCode)
    } else {
        const serviceParams = {
            type: data.service.type,
            config: data.service.config,
        };
        let serviceType = await Service.query().findById(data.service_id);
        if (!serviceType) {
            serviceType = await Service.query(serviceTxn)
                .insert(serviceParams)
                .catch(console.log);
            data.service_id = serviceType.id;

        } else {
            await Service.query(serviceTxn)
                .patch(serviceParams).findById(data.service_id)
                .catch(console.log);
        }
        delete data.service;
        // TODO: Verify data

        console.log(data);
        await Transformer.query(transformerTxn).patch(data).findById(req.params.id);

        try {
            await serviceTxn.commit();
            await transformerTxn.commit();
            const getAgain = await Transformer.query().findById(req.params.id);
            sendSuccessRes(req,getAgain,res)

        } catch (e) {
            await serviceTxn.rollback()
            await transformerTxn.rollback()
            sendErrorRes(req,res,
                TransMessages.UPDATE.EXCEPTION_CODE,
                errorCode,
                TransMessages.UPDATE.FAIL_MESSAGE_1,
                e,
                errCode)
        }

    }
}

async function deleteByID(req, res) {
    const errCode =
    programMessages.EXCEPTION_CODE + "_" + TransMessages.DELETE.EXCEPTION_CODE;
    const transformer = await Transformer.query().deleteById(req.params.id);
    if(transformer === 0){
        sendErrorRes(req,res,
            TransMessages.DELETE.DELETE_CODE,
            errorCode,
            TransMessages.DELETE.DELETE_MESSAGE,
            `Transformer does not exists with the id ${req.params.id}`,
            errCode)
    }else{
        let resData = `Number of transformers deleted: ${transformer}`
        sendSuccessRes(req,resData,res);
    }
    
}

async function dryRun(req, res) {
    // TODO: Dry Run
    sendSuccessRes(req,responseCode.SUCCESS,res);
}

async function insert(req, res) {
    const data = req.body.data;
    const errCode =
    programMessages.EXCEPTION_CODE + "_" + TransMessages.INSERT.EXCEPTION_CODE;
    const isExisting =
        (await (await Transformer.query().where("name", data.name)).length) > 0;

    if (isExisting) {
        sendErrorRes(req,res,
            TransMessages.INSERT.ALREADY_EXIST_CODE,
            errorCode,
            TransMessages.INSERT.ALREADY_EXIST_MESSAGE,
            `Transformer already exists with the name ${data.name}`,
            errCode)
        // res.status(400).send({
        //     status: `Transformer already exists with the name ${data.name}`,
        // });
    } else {
        let serviceType = await Service.query().where(data.service)[0];

        // TODO: Verify data

        try {
            const trx = await Transformer.startTransaction();
            if (!serviceType)
                serviceType = await Service.query(trx).insert(data.service);
            data.service_id = serviceType.id;

            const inserted = await Transformer.query(trx).insert(data);
            const topicCreated = await KafkaService.addTransformer(
                inserted,
                serviceType
            );
            if (topicCreated === undefined) {
                await trx.rollback();
                sendErrorRes(req,res,
                    TransMessages.INSERT.TRANS_UNDEFINED,
                    errorCode,
                    TransMessages.INSERT.CANNOT_CREATE,
                    "Transformer could not be registered.",
                    errCode)
                // res.send({data: "Transformer could not be registered."});
            } else {
                await trx.commit();
                const transformer = await Transformer.query()
                    .findById(inserted.id)
                    .withGraphFetched("service");
                KafkaService.refreshSubscribers([transformer]);
                transformer.service = serviceType;
                sendSuccessRes(req,transformer,res);
                // res.send({data: transformer});
            }
        } catch (e) {
            console.error(e);
            sendErrorRes(req,res,
                TransMessages.INSERT.EXCEPTION_CODE,
                errorCode,
                TransMessages.INSERT.CANNOT_CREATE,
                e,
                errCode)
            // res.send({data: "Transformer could not be registered."});
        }
    }
}

async function getForms(req, res) {
    const errCode =
    programMessages.EXCEPTION_CODE + "_" + TransMessages.FORM.EXCEPTION_CODE;
    const transformer = await Transformer.query()
        .findById(req.params.id)
        .withGraphFetched("service");

    if (transformer.service.type === "odk") {
        const util = require("util");
        const {parseString} = require("xml2js");
        const DigestFetch = require("digest-fetch");

        const getODKForms = async (credentials) => {
            const client = new DigestFetch(
                credentials.username,
                credentials.password,
                {
                    logger: console,
                }
            );

            return client
                .fetch(`${credentials.uri}/formList`)
                .then((resp) => resp.text())
                .then(async (data) => {
                    data = await util.promisify(parseString)(data);
                    let flatForms = [];
                    if (data && data.forms && data.forms.form) {
                        flatForms = data.forms.form.map((f) => {
                            return {name: f._, id: `${f.$ && f.$.url.split("=")[1]}`};
                        });
                    }
                    return flatForms;
                })
                .catch((e) => console.log("DIGEST FETCH", e));
        };

        const vault = new Vault();

        const credentials = vault.getCredentials(
            "odk",
            transformer.service.config.credentials
        );
        const forms = await getODKForms(credentials);
        sendSuccessRes(req,forms,res);
        // res.send({data: forms});
    } else {
        sendErrorRes(req,res,
            TransMessages.FORM.FORM_FAIL_CODE,
            errorCode,
            TransMessages.FORM.FORM_FAIL_MESSAGE,
            "Transformer is not of ODK type",
            errCode)
        // res
        //     .status(400)
        //     .send({status: "Error", error: "Transformer is not of ODK type"});
    }
}

function getParams(msgId, status, errCode, msg) {
    var params = {};
    params.resmsgid = uuid();
    params.msgid = msgId || null;
    params.status = status;
    params.err = errCode;
    params.errmsg = msg;
  
    return params;
  }
  
  function sendErrorRes(rspObj,res,errCode,errorCode,errMsg,error){
      rspObj.errCode = errCode;
      rspObj.errMsg = errMsg;
      rspObj.responseCode = responseCode.CLIENT_ERROR;
      rspObj.result = {
        error: error,
      };
      return res
        .status(400)
        .send(errorResponse(rspObj, errCode + errorCode.CODE1));
  }
  
  function sendSuccessRes(rspObj,resData,res){
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = { data: resData };
      return res.status(200).send(successResponse(rspObj)); 
  }
  
  function successResponse(data) {
    var response = {};
    response.id = data.apiId;
    response.ver = data.apiVersion;
    response.ts = new Date();
    response.params = getParams(data.msgid, "successful", null, null);
    response.responseCode = data.responseCode || "OK";
    response.result = data.result;
    return response;
  }
  
  function errorResponse(data, errCode) {
    var response = {};
    response.id = data.apiId;
    response.ver = data.apiVersion;
    response.ts = new Date();
    response.params = getParams(data.msgId, "failed", data.errCode, data.errMsg);
    response.responseCode = errCode + "_" + data.responseCode;
    response.result = data.result;
    return response;
  }

module.exports = function (app) {
    app
        .route(BASE_URL + "/transformer/all")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            getAll
        );

    app
        .route(BASE_URL + "/transformer/create")
        .post(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            insert
        );

    app
        .route(BASE_URL + "/transformer/get/:id")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            getByID
        );

    app
        .route(BASE_URL + "/transformer/update/:id")
        .post(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            update
        );

    app
        .route(BASE_URL + "/transformer/delete/:id")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            deleteByID
        );

    app
        .route(BASE_URL + "/transformer/dryRun/:id")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            dryRun
        );

    app
        .route(BASE_URL + "/transformer/getForms/:id")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            getForms
        );
};

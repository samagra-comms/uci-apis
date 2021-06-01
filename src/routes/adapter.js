var express = require("express");
const {result} = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const {Service} = require("../models/service");
const {Adapter} = require("../models/adapter");
const {Vault} = require("../helpers/vault");

// Refactor this to move to service
async function getAll(req, res) {
    const allAdapters = await Adapter.query();
    res.send({data: allAdapters});
}

async function getByID(req, res) {
    const transformer = await Adapter.query().findById(req.params.id);
    if (transformer) res.send({data: transformer});
}

async function update(req, res) {
    const data = req.body.data;
    const isExisting =
        (await Adapter.query().findById(req.params.id)) !== undefined;

    if (!isExisting) {
        res.status(400).send({
            status: `Adapter does not exists with the id ${req.params.id}`,
        });
    } else {
        const trx = await Adapter.startTransaction();
        try {
            await Adapter.query().patch(data).findById(req.params.id);
            await trx.commit();
            const getAgain = await Adapter.query().findById(req.params.id);
            res.send({data: getAgain});
        } catch (e) {
            console.log(e);
            await trx.rollback();
            return res.status(400).send({
                status: `Adapter Cannot be Updated`,
            });
        }
    }
}

async function deleteByID(req, res) {
    const transformer = await Adapter.query().deleteById(req.params.id);
    res.send({data: `Number of adapters deleted: ${transformer}`});
}

async function dryRun(req, res) {
    // TODO: Dry Run
    res.send({data: "Success"});
}

async function insert(req, res) {
    const data = req.body.data;
    const isExisting = (await (await Adapter.query().where(data)).length) > 0;

    if (isExisting) {
        return res.status(400).send({
            status: `Adapter already exists.`,
        });
    } else {
        const trx = await Adapter.startTransaction();
        try {
            const inserted = await Adapter.query(trx).insert(data);
            await trx.commit();
            const getAgain = await Adapter.query().findById(inserted.id);
            res.send({data: getAgain});
        } catch (e) {
            console.log(e);
            await trx.rollback();
            return res.status(400).send({
                status: `Adapter Cannot be created`,
            });
        }

    }
}

async function getCredentials(req, res) {
    const id = req.params.id;
    const adapter = await Adapter.query().findById(id);
    const vault = new Vault();

    const credentials = vault.getCredentials(
        "Gupshup-Whatsapp",
        adapter.config.credentials
    );

    res.send(credentials);
}

module.exports = function (app) {
    app
        .route(BASE_URL + "/adapter/all")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            getAll
        );

    app
        .route(BASE_URL + "/adapter/create")
        .post(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            insert
        );

    app
        .route(BASE_URL + "/adapter/get/:id")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            getByID
        );

    app
        .route(BASE_URL + "/adapter/update/:id")
        .post(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            update
        );

    app
        .route(BASE_URL + "/adapter/delete/:id")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            deleteByID
        );

    app
        .route(BASE_URL + "/adapter/dryRun/:id")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            dryRun
        );

    app
        .route(BASE_URL + "/adapter/getCredentials/:id")
        .get(
            requestMiddleware.gzipCompression(),
            requestMiddleware.createAndValidateRequestBody,
            getCredentials
        );
};

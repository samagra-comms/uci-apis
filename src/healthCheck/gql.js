const response = require("../routes/response");
const requestMiddleware = require("../middlewares/request.middleware");
const gql = require("graphql-tag");

const fetch = require("node-fetch");
const messageUtils = require("../service/messageUtil");
const HealthMessages = messageUtils.HEALTH_CHECK;
const errorCode = messageUtils.ERRORCODES;
const BASE_URL = "/admin/v1";
const errCode = HealthMessages.EXCEPTION_CODE;
const GQLClient = require("./overAllHealths")

async function checkGQL(req, res){ 
    let checks = []  
    const client = GQLClient.getGQLClient() 
    if (client) {
        checks.push({"name":"connection",
        "healthy":" true"})   
    }
    checks.push({"name":"connection",
    "healthy":" true"})  
    let userQuery = `query getListOfStates{
        organisation(distinct_on:state){
          state
        }
      }`
    return client
      .query({
        query: gql`
          ${userQuery}
        `,    
      })
      .then(async (resp) => {
        console.log("Success", resp)   
        checks.push({"name":"Test-query",
        "healthy":" true"})  
        response.sendHealthSuccessRes(req, true,checks, res,HealthMessages.GQL.SUCCESS_CODE);
     
      })
      .catch((e) => {
        console.log("ERROR",e);   
        response.sendHealthErrorRes(
            req,
            res,
            HealthMessages.GQL.FAILED_CODE,
            errorCode,
            HealthMessages.GQL.FAILED_MESSAGE,
            false,
            errCode
          );     
      });
    } 
    // function getGQLClient(credentials) {
    //     return new ApolloClient({
    //       link: new HttpLink({
    //         uri:`${process.env.GRAPHQL_BASE_URL}/v1/graphql`,  
    //         fetch:fetch ,
    //         headers:     {
    //             "x-hasura-admin-secret": `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
    //           }                       
    //       }),
    //       cache: new InMemoryCache(),
    //     });
    //   }      


module.exports = function (app) {
    app
      .route(BASE_URL + "/health/gql")
      .get(
        requestMiddleware.gzipCompression(),
        requestMiddleware.createAndValidateRequestBody,
        checkGQL
      );
  };
const envVariables = require('../envVariables')
const registryUrl = envVariables['OPENSABER_SERVICE_URL']
const axios = require('axios');


class RegistryService {

    constructor() {
    }

    addRecord(value, callback) {
      const headers = this.getDefaultHeaders()
        axios.post(registryUrl+'/add', value.body, headers)
          .then((res) =>{
            callback(null, res)
          },
          (error)=>{
            callback(error)
          });

    }

    updateRecord(value, callback) {
      const  headers = this.getDefaultHeaders()

        axios.post(registryUrl+'/update', value.body, headers)
        .then((res) =>{
          callback(null, res)
        },
        (error)=>{
          callback(error)
        });

    }

    readRecord(value, callback) {
      const headers = this.getDefaultHeaders()

        axios.post(registryUrl+'/read', value.body, headers)
        .then((res) =>{
          callback(null, res)
        },
        (error)=>{
          callback(error)
        });
    }

    searchRecord(value, callback) {
        const headers = this.getDefaultHeaders()

        axios.post(registryUrl+'/search', value.body, headers)
        .then((res) =>{
          callback(null, res)
        },
        (error)=>{
          callback(error,null)
        });
    }

    searchAuditRecords(value, callback) {
      const  headers = this.getDefaultHeaders()

        axios.post(registryUrl+"/audit", value.body, headers)
        .then((res) =>{
          callback(null, res)
        },
        (error)=>{
          callback(error)
        });
    }

    getDefaultHeaders() {
        let headers = {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
        return headers;
    }
}


module.exports = RegistryService;

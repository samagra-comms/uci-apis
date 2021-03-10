/*
 * @file: index.js
 * @author: Anuj Gupta
 * @desc: using validator, we can perform validation on request body.
 */
var Validator = require('validatorjs');

function validate(data, rules) {

    var validation = new Validator(data, rules);
    return validation.passes();
}

module.exports = {
    validate: validate
};

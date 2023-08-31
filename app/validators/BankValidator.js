"use strict";
const Joi = require("joi");
const{validate} = require("../utils/helpers")
const{ACCOUNT_TYPE} =require("../utils/constants")
const moment = require('moment');

exports.createBankAccount = async (payload) => {
    const schema = {
        accountName: Joi.string().required(),
        Dob: Joi.string().custom((value, helpers) => {
                const date = moment(value, 'DD-MM-YYYY', true);
                if (!date.isValid()) {
                    return helpers.error('any.Please provide a date of birth with this format DD-MM-YYYY');
                }
                return date.format('DD:MM:YYYY');
            }).required(),
        accountType: Joi.string()
        .valid(ACCOUNT_TYPE.SAVINGS,
               ACCOUNT_TYPE.CHECKING,
               ACCOUNT_TYPE.CURRENT,
               ACCOUNT_TYPE.UNIVERSAL
            ).default(ACCOUNT_TYPE.SAVINGS).required(),
        initialBalance:Joi.number().positive().required(),
    };
    return validate(schema, payload);
};



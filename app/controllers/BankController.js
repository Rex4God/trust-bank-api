"use strict"
const response = require("../utils/responses");
const bankService = require("../services/BankService")


exports.createBankAccount =async(req, res)=>{
     const{
        error,
        data,
        statusCode
        }= await bankService.createBankAccount(req.body);

        if(error) return response.error(res, error, statusCode);

        return response.success(res, data, statusCode);
};

exports.resolveBankAccount =async(req, res)=>{
     const{
        error,
        data,
        statusCode
        } = await bankService.resolveBankAccount(req.params.accountNumber);

        if(error) return response.error(res, error, statusCode);

        return response.success(res, data, statusCode);
};

exports.fetchAllBankAccounts = async(req, res)=>{
     const{
        error,
        data,
        statusCode
         } = await bankService.fetchAllBankAccounts(req.query);

         if(error) return response.error(res, error, statusCode);

         return response.paginated(res, data, statusCode);
}

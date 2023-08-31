"use strict";
const bankValidator = require("../validators/BankValidator")
const {StatusCodes} = require("http-status-codes")
const bankRepository = require("../repositories/BankRepository")
const{resolveRequestQueryToMongoDBQuery} = require("../utils/helpers")
const {generateAccountNumber} = require("../utils/GenerateAccountNumber")


exports.createBankAccount=async(body)=>{
    try{
    const validatorError = await bankValidator.createBankAccount(body);
    if(validatorError) return{
        error:validatorError,
        statusCode:StatusCodes.UNPROCESSABLE_ENTITY
    }
   
    const accountNumber =await generateAccountNumber('008')
    const account = await bankRepository.create({
         accountNumber,
         accountName:body.accountName,
         Dob:body.Dob,
         accountType:body.accountType,
         initialBalance:body.initialBalance
    })
   
return{
    data:{
    account:{
      accountNumber:account.accountNumber,
      accountName:account.accountName,
      accountType:account.accountType,
      initialBalance:account.initialBalance
    }
    }, 
   statusCode:StatusCodes.CREATED
};

}catch(e){
    console.log("An Unknown error has occurred. Please try again later" +e);
    return{
        error:e.message,
        statCode:StatusCodes.INTERNAL_SERVER_ERROR
    };
}
};

exports.resolveBankAccount =async(accountNumber)=>{
    try{
    const account = await bankRepository.findOne({accountNumber});

    if(!account)return{
        error: "Oops! This  account is not found. Please check the accountNumber and try again",
        statusCode: StatusCodes.NOT_FOUND
    };

return{
    data:{
    account:{
        accountNumber:account.accountNumber,
        accountName:account.accountName,
        Dob:account.Dob,
        accountType:account.accountType,
        initialBalance:account.initialBalance
        }
        },
    statusCode: StatusCodes.OK
    };

}catch(e){
    console.log("An unknown error has occurred. Please try again later"+ e);
    return{
        error:e.message,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    };
  }
};

exports.fetchAllBankAccounts =async(requestParams)=>{
     try{
        
    const mongodbQuery = await resolveRequestQueryToMongoDBQuery(requestParams);

    const accounts = await bankRepository
    .all(mongodbQuery.filter, mongodbQuery.sort, mongodbQuery.page, mongodbQuery.limit);

    return {
        data: accounts,
        statusCode: StatusCodes.OK
    };

    }catch(e){
    console.log("An unknown error has occurred. Please try again later"+e);
    return{
        error:e.message,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    };
    }
};




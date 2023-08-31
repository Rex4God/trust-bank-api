"use strict";
const Model = require("../models/BankModel")
const Repository = require("./MongoDBRepository")

class BankRepository extends Repository{
    constructor(){
        super(Model);
    }
}
module.exports =(new BankRepository());
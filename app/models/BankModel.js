"use strict";
const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate");
const dayjs = require("dayjs")
const {ACCOUNT_TYPE} = require("../utils/constants")


const schema = new mongoose.Schema({
          accountName:{
            type: String,
            required:  true
          },
          Dob:{
            type: String,
            required: true
          },
          accountType:{
            type: String,
            enum: [ACCOUNT_TYPE.SAVINGS, ACCOUNT_TYPE.CHECKING, ACCOUNT_TYPE.CURRENT,ACCOUNT_TYPE.UNIVERSAL],
            default: ACCOUNT_TYPE.SAVINGS,
            required: true
          },
          initialBalance:{
            type: Number,
            required: true
          }
        }, {
          toJSON: {
            transform: function (doc, ret) {
              ret.id = ret._id.toString();
              ret.createdAt = dayjs(ret.createdAt)
                .unix();
              ret.updatedAt = dayjs(ret.updatedAt)
                .unix();
              delete ret.__v;
              delete ret._id;
            }
          },
          strict: false,
          timestamps: true

        })

schema.plugin(mongoosePaginate)
module.exports = mongoose.model("Bank", schema)
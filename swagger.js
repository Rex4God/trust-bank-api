"use strict";
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

 //const port = process.env.PORT || 9000; uncomment this  line for local testing using swagger

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Trust Bank Api",
      version: "0.0.0",
      description: "Documentation for Trust Bank  Api Service",
    },
    servers: [
      {
        url: "https://trust-bank-service.onrender.com/",  // `http://localhost:${port}` For local testing  using swagger uncomment this line 
      },
    ],
  },
  apis: ["./routes/bank.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;

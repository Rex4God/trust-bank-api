"use strict";
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require('express-rate-limit');

//Swagger 
const swaggerUi = require("swagger-ui-express");
const specs = require("../swagger")

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false,
    validate: false
})

module.exports = (app, express) => {
    app.set("trust proxy", true);
    app.use(cors());
    app.set(helmet());
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(limiter);

// SWAGGER UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

};
            

"use strict";
const router = require("express").Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: This endpoint is used to check if the GET method is working or not
 *     description: This endpoint is used to check if the GET method is working or not
 *     responses:
 *       200:
 *         description: Successful response. It means the GET method is working.
 */
router.get('/', (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});


module.exports = router;
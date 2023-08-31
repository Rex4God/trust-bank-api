"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../app/controllers/BankController")


 //GET BANK ACCOUNT DETAILS
 /**
 * @swagger
 * /v1/accounts/bankAccounts:
 *   get:
 *     summary: Fetch all bank accounts
 *     description: Retrieve the list of all  bank acccounts
 *     parameters:
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bank accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   accountNumber:
 *                     type: string
 *                   accountName:
 *                     type: string
 *                   Dob:
 *                     type: string
 *                   initialBalance:
 *                     type: string
 *                   accountType:
 *                     type: string 
 */
// CREATE BANK ACCOUNT
/**
 * @swagger
 * /v1/accounts/create-account:
 *   post:
 *     summary: Create a  bank account
 *     description: Create a  bank account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountName:
 *                 type: string
 *               Dob:
 *                 type: string
 *               initialBalance:
 *                 type: number
 *               accountType:
 *                 type: string
 *                 enum:
 *                   - Savings
 *                   - Checking
 *                   - Universal
 *                   - Current
 *     responses:
 *       '201':
 *         description: Bank account created successfully
 *       '400':
 *         description: Bad Request - Invalid input data
 *       '500':
 *         description: Internal Server Error
 */

//GET ACCOUNT DETAILS USING ACCOUNT-NUMBER
/**
 * @swagger
 * /v1/accounts/{accountNumber}:
 *   get:
 *     summary: Get account details using accountNumber
 *     description: Retrieve  account details by provided accountNumber
 *     parameters:
 *       - name: accountNumber
 *         in: path
 *         description: Retrieve  account details by provided accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: account not found
 *         content:
 *          application/json:
 *               properties:
 *                  type: string
 *           
 */

router.post("/create-account", controller.createBankAccount);

router.get("/bankAccounts",controller.fetchAllBankAccounts)

router.get("/:accountNumber", controller.resolveBankAccount);




module.exports=router
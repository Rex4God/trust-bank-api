const request = require('supertest');
const app = require('../app');
const db = require('./database');
const bankService= require('../app/services/BankService');
const {generateAccountNumber} = require("../app/utils/GenerateAccountNumber");


const agent = request.agent(app);


const accountNumber = generateAccountNumber('008')

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /v1/accounts/create-account', () => {
  test('It should store a new account details', async () => {
    const response = await agent
      .post('/v1/accounts/create-account')
      .send({
         accountNumber,
         accountName: "Precious Agamuyi",
         Dob: "12-12-2020",
         accountType: "Savings",
         initialBalance: 2000

        })
      .expect(201);

    expect(response.body.account).toBe();
  });
});

describe('GET/v1/accounts/:accountNumber', () => {
  test('It should retrieve bank account detail using accountNumber', async () => {

    const accountDetail = await bankService.resolveBankAccount(accountNumber)

    expect(accountDetail.accountName).toBe(accountDetail.accountName);
    expect(accountDetail.Dob).toBe(accountDetail.Dob);
    expect(accountDetail.accountType).toBe(accountDetail.accountType);
    expect(accountDetail.initialBalance).toBe(accountDetail.initialBalance)


  });
 });

 describe('GET /v1/accounts/bankAccounts', () => {
  test('It should retrieve bank account details ', async () => {

    const accounts = await bankService.fetchAllBankAccounts()

      expect(accounts.accountName).toBe(accounts.accountName);
      expect(accounts.Dob).toBe(accounts.Dob);
      expect(accounts.accountType).toBe(accounts.accountType);
      expect(accounts.initialBalance).toBe(accounts.initialBalance);
    });
  });





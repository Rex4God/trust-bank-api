"use strict";
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');



const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {

  await mongoose.disconnect();

  
  const mongod = await MongoMemoryServer.create();

  const mongoUri = await mongod.getUri();
  try {
    await mongoose.connect(mongoUri, opts);
    console.log("Connected to the database.");
  } catch (err) {
    console.error(err);
  }
};


const close = async () => {
  await mongoose.disconnect();
  console.log("Database connection closed.");
};


const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
  console.log("Collections cleared.");
};

module.exports = {
  connect,
  close,
  clear,
};

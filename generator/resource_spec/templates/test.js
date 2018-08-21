// Loads environment variables from .env.test
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

// Mongoose setup & configuration
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Chai configuration
const chai = require("chai");
chai.should();

// Runs before all testing begins
before(() => {
  return new Promise((resolve, reject) => {
    console.log('Opening Database connection...')
    mongoose.connect(process.env.MONGO_DB_URI)
    mongoose.connection.once('open',  () => {
      console.log('Opened Database connection.')
      resolve();
    })
  })
})

// Import all spec & integration tests here
<%- specPaths.join('\n') %>

// Runs after all tests are complete
after(() => {
    console.log('Closing Database connection.')
})

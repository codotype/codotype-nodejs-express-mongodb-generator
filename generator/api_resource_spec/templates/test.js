// Loads environment variables from .env.test
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') });

// Mongoose setup & configuration
const mongoose = require('mongoose')

// Mongoose Deprecations
// https://mongoosejs.com/docs/deprecations.html
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// Chai configuration
const chai = require("chai");
chai.should();

// Connects to MongoDB
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

// Import all library tests here
require('../src/lib/jwt.spec');
require('../src/lib/mailer.spec');
require('../src/lib/pagination.spec');
require('../src/api/middleware/authorization.spec');
require('../src/api/user/user.lib.spec');

// Import all spec & integration tests here
require('../src/api/auth/auth.spec')
<%- specPaths.join('\n') %>

// Runs after all tests are complete
after(() => {
  console.log('Closing Database connection.')
})

const generator = require('./run')

// Invoke generator directly with the ToDo List example
// TODO - this should be removed
new generator({
  // appconfig: require('codotype-generator/examples/todo-list.json'),
  // appconfig: require('codotype-generator/examples/grocery-list.json'),
  appconfig: require('./library-app.json'),
  buildId: 'LIBRARY_API'
}).write()


// NOTE - in-progress generator metadata structure
// QUESTION - should this be encapsulated in package.json? ...probably not
module.exports = {
  name: 'Node.js + Express + MongoDB Generator',
  keywords: [],
  generator: generator,
  destination_dir: 'expressjs_mongodb',
  additional_options: []
}
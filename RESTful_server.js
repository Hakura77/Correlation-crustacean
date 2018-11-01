var http = require('http')
const CorrelationCalculator = require('./src/CorrelationCalculator_node.js')
const RegressionCalculator = require('./src/RegressionCalculator_node.js')
const HelperFunctions = require('./src/HelperFunctions.js')

var server = http.createServer((req, resp) => {
  let inputStart = request.url.indexof('?') + 1
  let dataString = request.url.slice(inputStart)
})

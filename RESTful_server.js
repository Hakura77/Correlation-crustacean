var http = require('http')
const CorrelationCalculator = require('./src/CorrelationCalculator_node.js')
const RegressionCalculator = require('./src/RegressionCalculator_node.js')

var server = http.createServer((req, res) => {
  function badData (err) {
    res.writeHead(400, { 'content-type': 'text/plain' })
    res.end(`Bad Data Provided: ${err.message}`)
  }

  let inputStart = req.url.indexOf('?') + 1
  let dataString = req.url.slice(inputStart)
  let dataJSON
  let theResult
  try {
    dataString = dataString.split('%20').join('')
    dataString = dataString.split('%27').join('"')
    dataString = dataString.split('%22').join('"')
    console.log(`Data string: ${dataString}`)
    dataJSON = JSON.parse(dataString)
  } catch (err) {
    res.writeHead(400, { 'content-type': 'text/plain' })
    res.end('Error 400 - Invalid request syntax \n Valid Syntax is {"x": [...values], "y": [...values], "mode": [c|r], <xk>: [value]}')
    dataJSON = { 'mode': null }
  } finally {
    if (dataJSON.mode === 'c') {
      try {
        console.log('running correlation calculation')
        console.log(`X array ${dataJSON.x} | Y array ${dataJSON.y}`)
        let correlCalc = new CorrelationCalculator(dataJSON.x, dataJSON.y)
        theResult = correlCalc.calculate()
      } catch (err) {
        badData(err)
      }
    } else if (dataJSON.mode === 'r') {
      try {
        console.log('running regression calculation')
        console.log(`X array ${dataJSON.x} | Y array ${dataJSON.y}`)
        let regressCalc = new RegressionCalculator(dataJSON.x, dataJSON.y)
        theResult = regressCalc.calculate(dataJSON.xk)
      } catch (err) {
        badData(err)
      }
    } else {
      badData('Incorrect mode selector')
    }
  }
  let theReturn = '{'
  theResult.forEach((val, key) => {
    theReturn += `"${key}": "${val}",`
  })
  theReturn = theReturn.slice(0, -1)
  theReturn += '}'
  theJSON = JSON.parse(theReturn) // ta-da

  // and now we make it text again
  res.writeHead(200, { 'content-type': 'applicaiton/json' })
  res.end(JSON.stringify(theJSON))
}).listen(5000)

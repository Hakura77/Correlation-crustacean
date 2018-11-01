const fs = require('fs')
const CorrelationCalculator = require('./src/CorrelationCalculator_node.js')
const RegressionCalculator = require('./src/RegressionCalculator_node.js')
const HelperFunctions = require('./src/HelperFunctions.js')

function validatePath (path) {
  if (fs.existsSync(path)) {
    return true
  } else {
    Console.log(`File at path ${path} does not exist`)
    return false
  }
}

function getFileToArray (path) {
  rawData = fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`File reading failed: ${err.message}`)
      process.exit(1)
    } else {
      return data
    }
  })
  convertedValue = HelperFunctions.convertDataToArray(rawData)
  if (convertedValue) {
    console.log(`Import of ${path} successful`)
    return convertedValue
  } else {
    process.exit(1)
  }
}

function getXK (paths) {
  if (validatePath(paths.x) && validatePath(paths.y)) {
    arrays = {}
    arrays.x = getFileToArray(paths.x)
    arrays.y = getFileToArray(paths.y)
    return arrays
  } else {
    console.log('Process failed')
    process.exit(1)
  }
}

function writeOut (data, path) {
  console.log(`Writing to ${path}`)

  let writeStr = ''
  for (let aKey of data.keys()) {
    console.log(`Pushing to output buffer: ${aKey}: ${data.get(aKey)}`)
    writeStr += `${aKey}: ${data.get(aKey)}\r\n`
  }
  writeStr = writeStr.slice(0, -4) // strip last newline
  fs.writeFileSync(path, writeStr, 'utf8', (err) => {
    if (err) {
      console.log('Unable to write to file - data not saved \n Permission denied or folder does not exist')
      process.exit(1)
    }
  })
  console.log('Data written to file')
  process.exit(0)
}

function badCommand () {
  console.log('Incorrect usage of command.')
  console.log('Correct format is: \n node commandCalculate.js <Data file X> <Data file Y> <Data Out File> <mode> <xk>')
  process.exit(1)
}

function main () {
  if (process.argv.length === 6 || process.argv.length === 7) {
    // correct number of arguments
    if (['c', 'r'].includes(process.argv[5])) {
      let theCalculator
      let theReturn
      let paths = { 'x': process.argv[2], y: process.argv[3] }
      let arrays = getXK(paths)
      if (process.argv[5] === 'c') {
        console.log('launching in correlation mode')
        if (process.argv[6]) {
          console.log('You specified an xk value in correlation mode - ignoring')
        }
        try {
          theCalculator = new CorrelationCalculator(arrays.x, arrays.y)
          theReturn = theCalculator.calculate()
        } catch (err) {
          if (err instanceof RangeError) {
            console.log(`Analysis failed because ${err.message}`)
            process.exit(1)
          } else {
            throw err
          }
        }
      } else {
        console.log('Launching in regression mode')
        try {
          theCalculator = new RegressionCalculator(arrays.x, arrays.y)
          theReturn = theCalculator.calculate(process.argv[6])
        } catch (err) {
          if (err instanceof RangeError) {
            console.log(`Analysis failed because ${err.message}`)
            process.exit(1)
          } else {
            throw err
          }
        }
      }
      writeOut(theReturn, process.argv[4])
    } else {
      badCommand()
    }
  } else {
    badCommand()
  }
}

main()

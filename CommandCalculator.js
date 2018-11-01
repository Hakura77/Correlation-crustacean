// nodeJS command line calculator program for BCPR280 - 2018S2 - Thomas Baines

const fs = require('fs')
const readline = require('readline')

const CorrelationCalculator = require('./src/CorrelationCalculator.js')
const RegressionCalculator = require('./src/RegressionCalculator.js')
const HelperFunctions = require('./src/HelperFunctions.js')


// interactive mode
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var inputLoop = true
var mode;


console.log("Welcome to Thomas Baines's Calculator command line interface.")

let calculators = {correl: undefined, regress: undefined}

function getFileToArray(arrayID) {
  let get
  let path
  let rawData
  let convertedValue
  while(!get) {
    path = r1.question(`Please enter path for the ${arrayID} values file:`, (answer) => {
      return answer
    })
    rawData = fs.readFile(xPath, (err, data) => {
      if(err) {
        console.log(`Unable to access file at path \n ${err.path}`)
        console.log('Please try again')
        return false
      } else {
        return data
      }
    })
    if(rawData) {
      convertedValue = HelperFunctions.convertDataToArray(rawData)
      if(convertedValue) {
        console.log(`Import of ${arrayID} array successful`)
        get = true
      }
    }
  }
  return convertedValue
}

function getXK () {
  let exit
  let answer
  while(!exit) {
    r1.question('Enter an XK value or leave blank to skip:', (a) => {
      answer = a
    }
    if(answer === '') {
      return false
    } else if (!isNaN(parseFloat(answer))) {
      return answer
    } else {
      console.log('Please enter a valid XK value or leave blank to skip')
    }
  }
}

function getXandY() {
  let xArray = getFileToArray('X')
  let yArray = getFileToArray('Y')
  return {x: xArray, y: yArray}
}

while (inputLoop) {
  r1.question('Please Choose a calculator mode: (c for Correlation, R for Regression, X to exit)', (answer) => {
    mode = answer
  })
  switch(mode.charAt(0).toLowerCase()) {
    case 'c':
      console.log('Beginning Correlation Analysis')
      let theArrays = getXandY()
      break
    
    case 'r':
      console.log('Beginning Regression Analysis')
      let theArrays = getXandY()
      r1.question('Please enter an ')
      break
      
    case 'x':
      r1.question('Are you sure you want to exit? Y/N', (answer) => {
        if(answer.charAt(0).toLowerCase() === 'y') {
          inputLoop = false
        }
      })
      break
    default:
      console.log('Unrecognized input, please try again')
      break
  }
  
  
}


// select calculator mode
// if correl
//    ask for x values path
//    ask for y values path
//    import data
//    validate data
//    run correlation
//    return r and r2 to console
//    ask for path to save to file
//    save to file
// else if regress
//    ask for x values path
//    ask for y values path
//    ask for xk value (optional)
//    import data
//    validate data
//    run regression
//    return beta_0, beta_1, and optionally yk
//    ask for path to save to file
//    save to file
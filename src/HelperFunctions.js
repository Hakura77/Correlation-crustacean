class HelperFunctions {
  static convertDataToArray (data) {
    let newData
    data = data.split(' ').join('') // strip spaces

    if (data.length <= 0) { // no empty arrays, thank you
      console.warn('A Provided list was empty. Conversion process will be aborted')
      return false
    }

    if (data.includes('\n')) { // entries were seperated with new lines
      newData = data.split('\n')
    } else if (data.includes(',')) { // entries were seperated with commas
      newData = data.split(',')
    } else { // entries were not seperated using a supported method
      console.warn('The entries within a list were not seperated with a supported value. \nPlease use Commas or New Lines')
      return false
    }

    // check the data array contains only numbers - Slightly hacky, modifies the array in-place via parseFloat() and then checks to see if the call returned a NaN (and therefore the value passed isn't a number)
    for (let item in newData) {
      newData[item] = parseFloat(newData[item])
      if (isNaN(newData[item])) {
        console.warn("A provided list contained something that wasn't a number \nConversion process will be aborted")
        return false
      }
    }
    // data is now seperated into an array and contains only numbers and has data in it
    return newData
  }

  static checkData (xValue, yValue, regMode = false, xkValue = null) {
    let newX = this.convertDataToArray(xValue)
    let newY = this.convertDataToArray(yValue)

    if (newX && newY) {
      if (newX.length === newY.length) {
        if (!regMode) {
          return [newX, newY]
        } else {
          let newXK = parseFloat(xkValue)
          if (!isNaN(newXK)) {
            return [newX, newY, newXK]
          } else {
            return [newX, newY]
          }
        }
      } else {
        console.warn(`Provided array lengths did not match. X length: ${newX.length}, Y length: ${newY.length} \nConversion process will be aborted.`)

        return false
      }
    } else {
      return false
    }
  }
}

module.exports = HelperFunctions

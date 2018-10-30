class HelperFunctions {
  
  static convertDataToArray (data) {
    let newData;
    data = data.split(' ').join('') // strip spaces
    if (data.includes('\n')) { // entries were seperated with new lines
      newData = data.split('\n')
    } else if (data.includes(',')) { // entries were seperated with commas
      newData = data.split(',')
    } else { // entries were not seperated using a supported method
      return false
    }
    
    if (newData.length <= 0) { // no empty arrays, thank you
      return false
    }
    
    // check the data array contains only numbers - Slightly hacky, modifies the array in-place via parseFloat() and then checks to see if the call returned a NaN (and therefore the value passed isn't a number)
    for (let item in newData) {
      newData[item] = parseFloat(newData[item])
      if(isNaN(newData[item])) {
        return false
      }
    }
    // data is now seperated into an array and contains only numbers and has data in it
    return newData
  }
  
  static checkData (xValue, yValue, regMode = false, xkValue = null) {
    let newX = this.convertDataToArray(xValue)
    let newY = this.convertDataToArray(yValue)
    if(newX && newY) {
      if(!regMode) {
        return [newX, newY]
      } else {
        let newXK = parseFloat(xkValue)
        return [newX, newY, newXK]
      }
    }
    
  }
}
/* Created by Thomas Baines 16/10/2018 for BCPR280 Assignment two ARA Institute of Cantebury
All rights reserved
Does not conform to standardJS */

class CorrelationCalculator {
  // Class to take two arrays of numbers
  // calculates the correlation coefficent of the two arrays
  constructor(newNumberArrayX, newNumberArrayY) {
    this.numberArrayY = newNumberArrayY
    this.numberArrayX = newNumberArrayX
  }
  
  // calculator methods
  
  sum(anArray) {
    // adds all the numbers in an array and returns the sum
    // assumes it is passed an one-dimensional array that only contains numbers
    return anArray.reduce((accumulator, currentValue) => accumulator + currentValue)
  }
  
  avg(anArray) {
    // calculates the average of an array
    // same assumption as sum()
    return (this.sum(anArray) / anArray.length)
  }
  
  multiplyTogether(array1, array2) {
    // multiplies each value of the two arrays together, matching them by index
    // returns a single array
    // assumes both arrays are the same length, one dimensional, and contain only numbers
    let returnArray = [] 
    for (let anIndex in array1) {
      returnArray.push(array1[anIndex] * array2[anIndex])
    }
    return returnArray
  }
  
  squareArray(anArray) { // NOTE: is this too much abstraction?
    // returns an array where each value within the array has been squared. 
    // returns a single array
    // assumes the array is one dimensional and contains only numbers
    return this.multiplyTogether(anArray, anArray)
  }
  
  // getter methods - NOTE: Possibly too much abstraction / duplication
  
  get xSum() {
    return this.sum(this.numberArrayX)
  }
  
  get ySum() {
    return this.sum(this.numberArrayY)
  }
  
  get xySum() {
    return this.sum(this.multiplyTogether(this.numberArrayX, this.numberArrayY))
  }
  
  get sumXSquared() {
    return this.sum(this.squareArray(this.numberArrayX))
  }
  
  get sumYSquared() {
    return this.sum(this.squareArray(this.numberArrayY))
  }
  
  // controller methods
  
  calculate() {
    // method to calculate the correlation coefficent of the two stored arrays
    // assumes that both arrays contain only numbers, and are the same length
    let numerator = (this.numberArrayX.length * this.xySum) - (this.xSum * this.ySum)
    let denominator = Math.sqrt( 
      (this.numberArrayX.length * this.sumXSquared) - Math.pow(this.xSum, 2) 
      * (this.numberArrayY.length * this.sumYSquared) - Math.pow(this.ySum, 2) 
      )
      let r = numerator / denominator
      let rSquared = Math.pow(r, 2)
    return [r, rSquared]
  }  
  
}
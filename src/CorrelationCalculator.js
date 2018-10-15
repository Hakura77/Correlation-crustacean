/* Created by Thomas Baines 16/10/2018 for BCPR280 Assignment two ARA Institute of Cantebury
All rights reserved
Does not conform to standardJS */

class CorrelationCalculator () {
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
  
  standardize(anArray) {
    // calculates and returns the standardized version of all values within the provided array
    // assumes that it is provided a one dimensional array containing only numbers
    let returnArray = []
    let theAverage = this.avg(anArray) // calculate the average of the provided array
    let theStd = math.std(anArray) // calculate the standard deviation of the provided array
    let theStandardizedValue // create empty value to insert each recursion into
    for (let aCoordinate of anArray) {
      // iterate through the provided array, calculating the standardized version of each value
      theStandardizedValue = (aCoordinate - theAverage) / theStd
      returnArray.push(theStandardizedValue)
    }
    return returnArray
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
    let denominator = math.sqrt( 
      (this.numberArrayX.length * this.sumXSquared) - math.square(this.xSum) 
      * (this.numberArrayY.length * this.sumYSquared) - math.square(this.ySum) 
      )
    return numerator / denominator // calculate the correlation coefficent and return it 
  }  
  
}
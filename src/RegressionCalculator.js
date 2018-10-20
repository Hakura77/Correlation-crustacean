class RegressionCalculator extends CorrelationCalculator {
  constructor(newNumberArrayX, newNumberArrayY) {

    // confirm that there is sufficent data to produce a statistically significant result
    if (newNumberArrayX.length < 3 || newNumberArrayY.length < 3) {
      throw 'Array lengths are too short to show statistically significant result'
    } else if (newNumberArrayX.length < 5 || newNumberArrayX.length < 5) {
      console.warn('Array lengths are sub-optimal but calculation can proceed')
    }
    
    super(newNumberArrayX, newNumberArrayY)
    
  }
  
  get B1 () {
    // calculates sigma(x*y) - n*xAvg*yAvg / sigma(x^2) - n*avg(x^2)
    let numerator = this.xySum() - (this.numberArrayX.length * this.avg(this.numberArrayX) * this.avg(this.numberArrayY) 
    let denominator =  this.sumXSquared() - (this.numberArrayX.length * Math.pow(this.avg(this.numberArrayX), 2))
    return numerator / denominator // returns b1 value 
  }
  
  get b0 () {
    // calculates b0 average 
    return this.avg(this.numberArrayY) - (this.B1 - avg(this.numberArrayX) )
  }
  
  calculate () {
    // should contain some level of validation
    // assumes that the number arrays are populated already
    
    return this.B0 + (this.B1 *  ) // INCOMPLETE
    
  }
  
}
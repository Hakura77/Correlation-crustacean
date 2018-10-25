class RegressionCalculator extends CorrelationCalculator {
  constructor(newNumberArrayX, newNumberArrayY) {
    // expects arrays of identical length
    // confirm that there is sufficent data to produce a statistically significant result
    let warn
    if (newNumberArrayX.length < 3 || newNumberArrayY.length < 3) {
      throw new RangeError('Array lengths are too short to show statistically significant result')
    } else if (newNumberArrayX.length < 5 || newNumberArrayX.length < 5) {
      warn = true
    }
    
    super(newNumberArrayX, newNumberArrayY)
    
    if(warn) {
      this.warning = 'Array lengths are sub-optimal but calculation can proceed'
    }
    
  }
  
  calculateB1 () {
    // calculates sigma(x*y) - n*xAvg*yAvg / sigma(x^2) - n*avg(x^2)
    let numerator = this.xySum() - (this.numberArrayX.length * this.avg(this.numberArrayX) * this.avg(this.numberArrayY)) 
    let denominator = this.sumXSquared() - (this.numberArrayX.length * Math.pow(this.avg(this.numberArrayX), 2))
    return numerator / denominator // returns b1 value 
  }
  
  calculateB0 () {
    // calculates b0 average 
    return this.avg(this.numberArrayY) - (this.B1 - avg(this.numberArrayX) )
  }
  
  calculate (xk = undefined) {
    // should contain some level of validation
    // assumes that the number arrays are populated already
    
    let b0 = this.calculateb0
    let b1 = this.calculateB1
    let theReturn = new Map([['beta_0', this.b0], ['beta_1', this.b1]])
    
    if(xk) {
      let yk = b0 + (b1 * xk )
      theReturn.set(['yk', yk])
    }
    
    return theReturn
    
  }
  
}
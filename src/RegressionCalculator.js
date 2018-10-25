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
  
  calculateB1 (raw = false) {
    // calculates sigma(x*y) - n*xAvg*yAvg / sigma(x^2) - n*avg(x^2)
    let numerator = this.xySum - (this.numberArrayX.length * this.avg(this.numberArrayX) * this.avg(this.numberArrayY)) 
    let denominator = this.sumXSquared - (this.numberArrayX.length * Math.pow(this.avg(this.numberArrayX), 2))
    let beta_1 =  numerator / denominator // Accurate b1 value
    
    if(!raw) {
      beta_1 = parseFloat(beta_1.toFixed(4)) // fix to readable length
    }
    
    return beta_1
    
  }
  
  calculateB0 (raw = false) {
    // calculates b0 average 
    let beta_0 = this.avg(this.numberArrayY) - (this.calculateB1(true) * this.avg(this.numberArrayX))
    
    if(!raw) {
      beta_0 = parseFloat(beta_0.toFixed(2))
    }
    
    return beta_0
  }
  
  calculate (xk = undefined) {
    // should contain some level of validation
    // assumes that the number arrays are populated already
    
    let b0 = this.calculateB0()
    let b1 = this.calculateB1()
    let theReturn = new Map([['beta_0', b0], ['beta_1', b1]])
    
    if(xk) {
      let yk = this.calculateB0(true) + (this.calculateB1(true) * xk )
      theReturn.set(['yk', yk])
    }
    
    return theReturn
    
  }
  
}
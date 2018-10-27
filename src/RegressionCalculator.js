class RegressionCalculator extends CorrelationCalculator {
  constructor(newX, newY) {
    // expects arrays of identical length
    // confirm that there is sufficent data to produce a statistically significant result
    super(newX, newY)
    this.validateData(newX, newY, true)
  }
  
  validateData(newX, newY, quick = true) {
    /* quick mode exists because of the way extensions work
    the super constructor must be called before accessing this. or returning from the child constructor.
    to avoid Running super.validateData() twice, there is now a "quick" mode that only runs the extra validation for RegressionCalculator, as CorrelationCalculator runs its own validate date when initalizing. Unfortunately this has also resulted in having to have a different logic flow between initalizing and re-initalizing in RegressionCalculator, hense the two later methods 
    Also, when working in super.MethodOnSuper() the this. construct still refers to an instance of the child class, so code in super that calls one of it's own methods, when run via a super call, will run the child method instead
    */
    
    if(!quick) {
      super.validateData()
    }
    if (newX.length < 3 || newY.length < 3) {
      throw new RangeError('Array lengths are too short to show statistically significant result')
    } else if (newX.length < 5 || newY.length < 5) {
      this.warning = 'Array lengths are sub-optimal but calculation can proceed'
      return false
    } else {
      return true
    }  
  }
  
  reInitalize(newX, newY) {
    if(!this.validateData(newX, newY, false)) {
      console.warn(this.warning)
    }
    super.initalize(newX, newY)
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
  
  calculate (xk) {
    // should contain some level of validation
    // assumes that the number arrays are populated already
    
    let b0 = this.calculateB0()
    let b1 = this.calculateB1()
    let theReturn = new Map([['beta_0', b0], ['beta_1', b1]])
    
    if(xk) {
      let yk = this.calculateB0(true) + (this.calculateB1(true) * xk )
      yk = parseFloat(yk.toFixed(2))
      theReturn.set('yk', yk)
    }
    
    return theReturn
    
  }
  
}
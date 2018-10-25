describe('Regression Calculator: ', function() {
  var dataset1 = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961] 
  var dataset2 = [163, 765, 141, 166, 137, 355, 136 ,1206, 433, 1130]
  var dataset3 = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
  
  var regressionCalculator1 = new RegressionCalculator(dataset1, dataset3)
  var regressionCalculator2 = new RegressionCalculator(dataset2, dataset3)
  
  var calculator1Expected = new Map ([['beta_0',  -22.55], ['beta_1', 1.7279]])
  var calculator2Expected = new Map ([['beta_0',  -23.92], ['beta_1', 1.4310]])
  
  function fixToExpected(aValue, expected) {
    return parseFloat(aValue.toFixed(expected))
  }
  
  describe('The constructed instances ', function() {
    it('Should extend CorrelationCalculator', function() {
      expect(regressionCalculator1 instanceof CorrelationCalculator).toBeTruthy()
      expect(regressionCalculator2 instanceof CorrelationCalculator).toBeTruthy()
    })
    
    it('Should have a numberArrayX property', function() {
      expect(regressionCalculator1.hasOwnProperty('numberArrayX')).toBeTruthy()
      expect(regressionCalculator2.hasOwnProperty('numberArrayX')).toBeTruthy()
    })
    
    it('Should have a numberArrayY property', function() {
      expect(regressionCalculator1.hasOwnProperty('numberArrayY')).toBeTruthy()
      expect(regressionCalculator2.hasOwnProperty('numberArrayY')).toBeTruthy()
    })
    
  })
  
  describe('The validation within the constructor should ', function() {
    it('Should return an error with array lengths less than 3', function() {
      let returnError
      try {
        let testLessThanThree = new RegressionCalculator([1, 2], [1, 2])
      } catch(err) {
        returnError = err
      }
      
      expect(returnError instanceof RangeError).toBeTruthy()
      
    })
    
    it('Should return a warning with array lengths > 3 and < 5', function() {
      
      let testLessThanFive = new RegressionCalculator([1, 2, 3, 4], [1, 2, 3, 4])
      expect(testLessThanFive.warning).toBeTruthy()
      
    })
  })
  
  describe('The calculateB0 method ', function() {
    it('Should exist', function() {
      expect(typeof(regressionCalculator1.calculateB0)).toBe('function')
      expect(typeof(regressionCalculator2.calculateB0)).toBe('function')
    })
    
    it('Should return the correctly calculated value', function() {
      expect(regressionCalculator1.calculateB0()).toBe(calculator1Expected.get('beta_0'))
      expect(regressionCalculator2.calculateB0()).toBe(calculator2Expected.get('beta_0'))
    })
    
  })
  
  describe('The calculateB1 method ', function() {
    it('Should exist', function() {
      expect(typeof(regressionCalculator1.calculateB1)).toBe('function')
      expect(typeof(regressionCalculator2.calculateB1)).toBe('function')
    })
    
    it('Should return the correctly calculated value', function() {
      expect(regressionCalculator1.calculateB1()).toBe(calculator1Expected.get('beta_1'))
      expect(regressionCalculator2.calculateB1()).toBe(calculator2Expected.get('beta_1'))
    })
    
  })
  
  describe('The Calculate method ', function() {
    it('Should exist', function() {
      expect(typeof(regressionCalculator1.calculate)).toBe('function')
      expect(typeof(regressionCalculator2.calculate)).toBe('function')
    })
    
    it('Should return two values when not passed a xk value', function() {
      expect(regressionCalculator1.calculate().size).toBe(2)
      expect(regressionCalculator2.calculate().size).toBe(2)
    })
    
    it('Should return the expected beta_0 and beta_1 values', function() {
      let rC1Values = regressionCalculator1.calculate()
      for (let aKey of rC1Values.keys()){
        expect(rC1Values.get(aKey)).toBe(calculator1Expected.get(aKey))
      }
      
      let rC2Values = regressionCalculator2.calculate()
      for (let aKey of rC2Values.keys()){
        expect(rC2Values.get(aKey)).toBe(calculator2Expected.get(aKey))
      }
      
    })
    
    it ('Should return three values when passed an xk value', function() {
      expect(regressionCalculator1.calculate(2).size).toBe(3)
      expect(regressionCalculator2.calculate(2).size).toBe(3)
    })
    
    it('Should return the correct yk value when passed an xk value', function() {
      // do not have clear spec for this test from client - FIX LATER!!!
      // expect(regressionCalculator1.calculate(2)).toBe(3)
      // expect(regressionCalculator2.calculate(2)).toBe(3)
      
      expect("I don't know what to expect").toBe('A value of some kind')
      
    })
    
    
  })
  
})
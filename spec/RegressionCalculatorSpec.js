describe('Regression Calculator: ', function() {
  var dataset1 = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961] 
  var dataset2 = [163, 765, 141, 166, 137, 355, 136 ,1206, 433, 1130]
  var dataset3 = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
  
  var regressionCalculator1 = new RegressionCalculator(dataset1, dataset3)
  var regressionCalculator2 = new RegressionCalculator(dataset2, dataset3)
  
  var calculator1Expected = new Map ([['beta_0',  -22.55], ['beta_1', 1.7279]])
  var calculator1Expected = new Map ([['beta_0',  -23.92], ['beta_1', 1.4310]])
  
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
  
})
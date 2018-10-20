describe ('Check to confirm correct initalization of CorrelationCalculator and all methods', function () {
  'use strict';
  var theCorrelationCalculator = new CorrelationCalculator([186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601], [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2
    ])
  
  describe ('The construction method results', function() {
    
    describe ('the numberArrayX property', function() {
      it ("Should have a numberArrayX property", function () {
        expect(theCorrelationCalculator.hasOwnProperty('numberArrayX')).toBeTruthy()
      })
      it ("Should reference an array", function() {
        expect(Array.isArray(theCorrelationCalculator.numberArrayX)).toBeTruthy()
      })
    })
    
    describe ('the numberArrayY property', function() {
      it ("Should have a numberArrayY property", function () {
        expect(theCorrelationCalculator.hasOwnProperty('numberArrayY')).toBeTruthy()
      })
      it ("Should reference an array", function() {
        expect(Array.isArray(theCorrelationCalculator.numberArrayY)).toBeTruthy()
      })
    })
    
    
  })
  
  describe('The Sum method', function() {
    beforeEach( function() {
      this.arrayToSum = theCorrelationCalculator.numberArrayX
      this.expectedResult = 6389
    })
    
    it ('Should exist as a method', function () {
      expect(typeof(theCorrelationCalculator.sum)).toBe('function')
    })
    
    it ('Should return a single value', function () {
      expect(typeof(theCorrelationCalculator.sum(this.arrayToSum))).toBe('number')
    })
    
    it(`Should correctly return ${this.expectedResult} from summing ${this.arrayToSum}`, function() {
      expect(theCorrelationCalculator.sum(this.arrayToSum)).toBe(this.expectedResult)
    })
  
  })
  
  describe('The avg method', function() {
    beforeEach( function() {
      this.arrayToAvg = theCorrelationCalculator.numberArrayX
      this.expectedResult = 638.9
    })
    
    it ('Should exist as a method', function () {
      expect(typeof(theCorrelationCalculator.avg)).toBe('function')
    })
    
    it ('Should return a single value', function () {
      expect(typeof(theCorrelationCalculator.avg(this.arrayToAvg))).toBe('number')
    })
    
    it(`Should correctly return 638.9`, function() {
      expect(theCorrelationCalculator.avg(this.arrayToAvg)).toBe(this.expectedResult)
    })
  
  })
  
  describe('The multiplyTogether method', function() {
    beforeEach( function() {
      this.array1 = theCorrelationCalculator.numberArrayX
      this.array2 = theCorrelationCalculator.numberArrayY
      this.expectedResults = [2790, 48860.100000000006, 858, 6092.799999999999, 8264.4, 21812.9, 3860.6, 375543, 30574.399999999998, 221258.19999999998]
    })
    
    it ('Should exist as a method', function () {
      expect(typeof(theCorrelationCalculator.multiplyTogether)).toBe('function')
    })
    
    it ('Should return an array of values', function () {
      expect(Array.isArray(theCorrelationCalculator.multiplyTogether(this.array1, this.array2))).toBeTruthy()
    })
    
    it(`Should correctly return ${this.expectedResults} from multipling together ${this.array1} and ${this.array2} `, function() {
      let returnArray = theCorrelationCalculator.multiplyTogether(this.array1,this.array2)
      for (let item in returnArray) {
        expect(returnArray[item]).toBe(this.expectedResults[item])
      }
    })
  
  })
  
  describe('The squareArray method', function() {
    beforeEach( function() {
      this.arrayToSquare = theCorrelationCalculator.numberArrayX
      this.expectedResults = [34596, 488601, 17424, 73984, 84681, 109561, 39601, 3572100, 620944, 2563201]
    })
    it ('Should exist as a method', function () {
      expect(typeof(theCorrelationCalculator.multiplyTogether)).toBe('function')
    })
    
    it ('Should return an array of values', function () {
      expect(Array.isArray(theCorrelationCalculator.multiplyTogether(this.array1, this.array2))).toBeTruthy()
    })
    
    it(`Should correctly return ${this.expectedResults} from squaring ${this.arrayToSquare} `, function() {
      let returnArray = theCorrelationCalculator.squareArray(this.arrayToSquare)
      for (let item in returnArray) {
        expect(returnArray[item]).toBe(this.expectedResults[item])
      }
    })
  
  })
  
  describe( 'the xSum method', function() {
    beforeEach( function() {
      this.xSumSpy = spyOn(theCorrelationCalculator, 'xSum').and.callThrough()
      this.expectedResult = 6389
    })
    
    it (`Should return 6389`, function() {
      expect(theCorrelationCalculator.xSum).toBe(this.expectedResult)
    })
    
    it ('Should have been called by the previous it', function() {
      expect(this.xSumSpy).toHaveBeenCalled()
    })
  })
  
  describe( 'the sumXSquared method', function() {
    beforeEach( function() {
      this.xSumSquaredSpy = spyOn(theCorrelationCalculator, 'sumXSquared').and.callThrough()
      this.expectedResult = 7604693
    })
    
    it (`Should return 7604963`, function() {
      expect(theCorrelationCalculator.sumXSquared).toBe(this.expectedResult)
    })
    
    it ('Should have been called by the previous it', function() {
      expect(this.xSumSquaredSpy).toHaveBeenCalled()
    })
  })
  
  describe( 'the ySum method', function() {
    beforeEach( function() {
      this.ySumSpy = spyOn(theCorrelationCalculator, 'ySum').and.callThrough()
      this.expectedResult = 603.2
    })
    
    it (`Should return 603.2`, function() {
      expect(theCorrelationCalculator.ySum).toBe(this.expectedResult)
    })
    
    it ('Should have been called by the previous it', function() {
      expect(this.ySumSpy).toHaveBeenCalled()
    })
  })
  
  describe( 'the sumYSquared method', function() {
    beforeEach( function() {
      this.ySquaredSpy = spyOn(theCorrelationCalculator, 'sumYSquared').and.callThrough()
      this.expectedResult = 71267.12
    })
    it (`Should return ${this.expectedResult}`, function() {
      expect(theCorrelationCalculator.sumYSquared).toBe(this.expectedResult)
    })
    
    it ('Should have been called by the previous it', function() {
      expect(this.ySquaredSpy).toHaveBeenCalled()
    })
  })
  
  describe( 'the xySum method', function() {
    beforeEach( function() {
      this.xySquaredSpy = spyOn(theCorrelationCalculator, 'xySum').and.callThrough()
      this.expectedResult = 719914.4
    })
    
    it (`Should return ${this.expectedResult}`, function() {
      expect(theCorrelationCalculator.xySum).toBe(this.expectedResult)
    })
    
    it ('Should have been called by the previous it', function() {
      expect(this.xySquaredSpy).toHaveBeenCalled()
    })
  })
  
  describe('the calculate method', function() {
    beforeEach( function() {
      this.expectedResults = [0.9107, 0.9107]
    })
    it ('Should exist as a method', function () {
      expect(typeof(theCorrelationCalculator.calculate)).toBe('function')
    })
    
    it (`Should return ${this.expectedResult}`, function() {
      expect(theCorrelationCalculator.calculate()).toBe(this.expectedResult)
    })
    
  })
  
})
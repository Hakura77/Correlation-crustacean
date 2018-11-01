describe('Correlation Calculator: ', function () {
  var theCorrelationCalculator = new CorrelationCalculator([186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601], [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2
  ])

  describe('The construction method results', function () {
    describe('the numberArrayX property', function () {
      it('Should have a numberArrayX property', function () {
        expect(theCorrelationCalculator.hasOwnProperty('numberArrayX')).toBeTruthy()
      })
      it('Should reference an array', function () {
        expect(Array.isArray(theCorrelationCalculator.numberArrayX)).toBeTruthy()
      })
    })

    describe('the numberArrayY property', function () {
      it('Should have a numberArrayY property', function () {
        expect(theCorrelationCalculator.hasOwnProperty('numberArrayY')).toBeTruthy()
      })
      it('Should reference an array', function () {
        expect(Array.isArray(theCorrelationCalculator.numberArrayY)).toBeTruthy()
      })
    })
  })

  describe('The Sum method', function () {
    beforeEach(function () {
      this.arrayToSum = theCorrelationCalculator.numberArrayX
      this.expectedResult = 6389
    })

    it('Should exist as a method', function () {
      expect(typeof (theCorrelationCalculator.sum)).toBe('function')
    })

    it('Should return a single value', function () {
      expect(typeof (theCorrelationCalculator.sum(this.arrayToSum))).toBe('number')
    })

    it(`Should correctly return 6389`, function () {
      expect(theCorrelationCalculator.sum(this.arrayToSum)).toBe(this.expectedResult)
    })
  })

  describe('The avg method', function () {
    beforeEach(function () {
      this.arrayToAvg = theCorrelationCalculator.numberArrayX
      this.expectedResult = 638.9
    })

    it('Should exist as a method', function () {
      expect(typeof (theCorrelationCalculator.avg)).toBe('function')
    })

    it('Should return a single value', function () {
      expect(typeof (theCorrelationCalculator.avg(this.arrayToAvg))).toBe('number')
    })

    it(`Should correctly return 638.9`, function () {
      expect(theCorrelationCalculator.avg(this.arrayToAvg)).toBe(this.expectedResult)
    })
  })

  describe('The multiplyTogether method', function () {
    beforeEach(function () {
      this.array1 = theCorrelationCalculator.numberArrayX
      this.array2 = theCorrelationCalculator.numberArrayY
      this.expectedResults = [2790, 48860.100000000006, 858, 6092.799999999999, 8264.4, 21812.9, 3860.6, 375543, 30574.399999999998, 221258.19999999998]
    })

    it('Should exist as a method', function () {
      expect(typeof (theCorrelationCalculator.multiplyTogether)).toBe('function')
    })

    it('Should return an array of values', function () {
      expect(Array.isArray(theCorrelationCalculator.multiplyTogether(this.array1, this.array2))).toBeTruthy()
    })

    it(`Should correctly calculate it's result `, function () {
      let returnArray = theCorrelationCalculator.multiplyTogether(this.array1, this.array2)
      for (let item in returnArray) {
        expect(returnArray[item]).toBe(this.expectedResults[item])
      }
    })
  })

  describe('The squareArray method', function () {
    beforeEach(function () {
      this.arrayToSquare = theCorrelationCalculator.numberArrayX
      this.expectedResults = [34596, 488601, 17424, 73984, 84681, 109561, 39601, 3572100, 620944, 2563201]
    })
    it('Should exist as a method', function () {
      expect(typeof (theCorrelationCalculator.squareArray)).toBe('function')
    })

    it('Should return an array of values', function () {
      expect(Array.isArray(theCorrelationCalculator.squareArray(this.arrayToSquare))).toBeTruthy()
    })

    it(`Should correctly return squared values from the provided array `, function () {
      let returnArray = theCorrelationCalculator.squareArray(this.arrayToSquare)
      for (let item in returnArray) {
        expect(returnArray[item]).toBe(this.expectedResults[item])
      }
    })
  })

  describe('the xSum  getter method', function () {
    beforeEach(function () {
      this.expectedResult = 6389
    })

    it(`Should return 6389`, function () {
      expect(theCorrelationCalculator.xSum).toBe(this.expectedResult)
    })
  })

  describe('the sumXSquared getter method', function () {
    beforeEach(function () {
      this.expectedResult = 7604693
    })

    it(`Should return 7604963`, function () {
      expect(theCorrelationCalculator.sumXSquared).toBe(this.expectedResult)
    })
  })

  describe('the ySum getter method', function () {
    beforeEach(function () {
      this.expectedResult = 603.2
    })

    it(`Should return 603.2`, function () {
      expect(theCorrelationCalculator.ySum).toBe(this.expectedResult)
    })
  })

  describe('the sumYSquared getter method', function () {
    beforeEach(function () {
      this.expectedResult = 71267.12
    })
    it(`Should return 71267.12`, function () {
      expect(theCorrelationCalculator.sumYSquared).toBe(this.expectedResult)
    })
  })

  describe('the xySum getter method', function () {
    beforeEach(function () {
      this.expectedResult = 719914.4
    })

    it(`Should return 719914.4`, function () {
      expect(theCorrelationCalculator.xySum).toBe(this.expectedResult)
    })
  })

  describe('the calculate method', function () {
    beforeEach(function () {
      this.expectedResults = new Map([['r', 0.9543], ['rSquared', 0.9107]])
    })
    it('Should exist as a method', function () {
      expect(typeof (theCorrelationCalculator.calculate)).toBe('function')
    })

    it(`Should return [0.9543, 0.9107]`, function () {
      let theResults = theCorrelationCalculator.calculate()
      expect(theResults instanceof Map).toBeTruthy()
      for (let aKey in this.expectedResults.keys()) {
        expect(theResults.get(aKey)).toBe(this.expectedResults.get(aKey))
      }
    })
  })
})

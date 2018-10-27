
function vueLoad() {
  theVue = new Vue ({
    el: '#vueBox',
    
    data: {
      theCorrelationCalculator: undefined,
      theRegressionCalculator: undefined,
      xPlaceholder: 'Enter your X values here, one per line or comma seperated',
      yPlaceholder: 'Enter your Y values here, one per line or comma seperated',
      xkPrompt: 'Enter your XK value here (optional)',
      xValue: '',
      yValue: '',
      xkValue: '',
      display: false,
      correlationValues: undefined,
      regressionValues: undefined
      
    },
    
    methods: {
      
      convertDataToArray: function(data) {
        data = data.split(' ').join('') // strip spaces
        if (data.includes('\n')) { // entries were seperated with new lines
          newData = data.split('\n')
        } else if (data.includes(',')) { // entries were seperated with commas
          newData = data.split(',')
        } else { // entries were not seperated using a supported method
          return false
        }
        
        if (newData.length <= 0) { // no empty arrays, thank you
          return false
        }
        
        // check the data array contains only numbers - Slightly hacky, modifies the array in-place via parseFloat() and then checks to see if the call returned a NaN (and therefore the value passed isn't a number)
        for (let item in newData) {
          newData[item] = parseFloat(newData[item])
          if(isNaN(newData[item])) {
            return false
          }
        }
        // data is now seperated into an array and contains only numbers and has data in it
        return newData
      },
      
      checkData: function(regMode = false) {
        let newX = this.convertDataToArray(this.xValue)
        let newY = this.convertDataToArray(this.yValue)
        if(newX && newY) {
          if(!regMode) {
            return [newX, newY]
          } else {
            let newXK = parseFloat(this.xkValue)
            return [newX, newY, newXK]
          }
        }
        
      },
      
      runCorrelation: function() {
        // convert entered x and y data into arrays.
        let theData = this.checkData()
        if(typeof(this.theCorrelationCalculator) !== 'object') {
          this.theCorrelationCalculator = new CorrelationCalculator(...theData)
        } else {
          this.theCorrelationCalculator.initalize(...theData)
        }
        this.correlationValues = this.theCorrelationCalculator.calculate()
        this.display = 'c'
      },
      
      runRegression: function() {
        let theData = this.checkData(true)
        if(typeof(this.theRegressionCalculator) !== 'object') {
          this.theRegressionCalculator = new RegressionCalculator(...theData)
        } else {
          this.theRegressionCalculator.reInitalize(...theData)
        }
        this.regressionValues = this.theRegressionCalculator.calculate(theData[2])
        this.display = 'r'
        
        // return false // not implimented yet
      }
      
    }
    
  })
}
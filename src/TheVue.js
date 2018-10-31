
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
      
      runCorrelation: function() {
        // convert entered x and y data into arrays.
        let theData = HelperFunctions.checkData(this.xValue, this.yValue)
        if(theData) {
          if(!(this.theCorrelationCalculator instanceof CorrelationCalculator)) {
            this.theCorrelationCalculator = new CorrelationCalculator(...theData)
          } else {
            this.theCorrelationCalculator.initalize(...theData)
          }
          this.correlationValues = this.theCorrelationCalculator.calculate()
          this.display = 'c'
        } else {
          this.display = 'warn'
        }
      },
      
      runRegression: function() {
        let theData = HelperFunctions.checkData(this.xValue, this.yValue, true, this.xkValue)
        if (theData) {
          if(!(this.theRegressionCalculator instanceof RegressionCalculator)) {
            this.theRegressionCalculator = new RegressionCalculator(...theData)
          } else {
            this.theRegressionCalculator.reInitalize(...theData)
          }
          this.regressionValues = this.theRegressionCalculator.calculate(theData[2])
          this.display = 'r'
        } else {
          this.display = 'warn'
        }
      }
      
    }
    
  })
}
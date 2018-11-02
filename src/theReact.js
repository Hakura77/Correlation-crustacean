
// this section is in babel

var root = document.getElementById('reactInterface')
const reactSectionHeader = 'ReactJS User Interface:'

class EntryArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
    this.getValue = this.getValue.bind(this)
  }

  handleChange (e) {
    this.setState({
      value: event.target.value
    })
  }

  getValue () {
    return this.state.value
  }

  render () {
    return (
      <div className={this.props.entrytype + 'Entry col-md-6'}>
        <h3>{`${this.props.entrytype} values:`}</h3>
        <textarea name={`react${this.props.entrytype}`} placeholder={`Enter your ${this.props.entrytype} values here, one per line or comma seperated`} cols='10' rows='15' value={this.state.value} onChange={this.handleChange} />
      </div>
    )
  }
}

class ActionButtons extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    if (e.target.name === 'correlation') {
      // run correlation analysis
      console.log('Running correlation')
      this.props.callback('c')
    } else if (e.target.name === 'regression') {
      console.log('Running Regression')
      this.props.callback('r')
    } else { // shouldn't happen
      console.log('Abberant behaveour in ActionButtons.handleClick()')
    }
  }

  render () {
    return (
      <div className='actionButtons btn-group'>
        <input type='button' className='btn btn-primary' onClick={this.handleClick} name='correlation' value='Calculate Correlation' />
        <input type='button' className='btn btn-primary' onClick={this.handleClick} name='regression' value='Calculate Regression' />
      </div>
    )
  }
}

class EntryBoxes extends React.Component {
  constructor (props) {
    super(props)
    this.state = { xkValue: '' }
    this.getValues = this.getValues.bind(this)
    this.xkChange = this.xkChange.bind(this)
  }

  xkChange () {
    this.setState({
      xkValue: event.target.value
    })
  }

  getValues () {
    let theX = this.entryX.getValue()
    let theY = this.entryY.getValue()
    return new Map([['x', theX], ['y', theY], ['xk', this.state.xkValue]])
  }

  render () {
    return (
      <div className='reactEntryBoxes'>
        <div className='EntryTextAreas row'>
          <EntryArea entrytype='X' ref={entryX => { this.entryX = entryX }} />
          <EntryArea entrytype='Y' ref={entryY => { this.entryY = entryY }} />
        </div>
        <div className='xkEntry'>
          <label htmlFor='reactXK'> {'Enter your XK value here (optional)'} </label>
          <input type='text' id='reactXK' value={this.state.xkValue} onChange={this.xkChange} />
        </div>
      </div>
    )
  }
}

class RegressionWarning extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (!this.props.warning) {
      return null
    } else {
      return <p id='r_warning'> {this.props.warning} </p>
    }
  }
}

class ResponseSegement extends React.Component {
  constructor (props) {
    super(props)
    this.state = { displayMode: null, regressionValues: new Map(), correlationValues: new Map(), rWarning: undefined }
    this.stateUpdate = this.stateUpdate.bind(this)
  }

  stateUpdate (mode, values, warning) {
    switch (mode) {
      case 'c':
        this.setState({ displayMode: mode, correlationValues: values })
      case 'r':
        this.setState({ displayMode: mode, regressionValues: values, rWarning: warning })
        break
      case null:
        this.setState({ displayMode: mode })
        break
      default:
        console.warn('Warning, abberant behaveour detected in ResponseSegement.stateUpdate()')
    }
  }

  render () {
    switch (this.state.displayMode) {
      case null:
        return null
        break
      case 'c':
        return (
          <div id='reactCorrelation'>
            <label htmlFor='rCorrelationR'><i>r</i>:</label>
            <p id='rCorrelationR'>{this.state.correlationValues.get('r')}</p>

            <label htmlFor='rCorrelationR2'><i>r<sup>2</sup></i>:</label>
            <p id='rCorrelationR2'>{this.state.correlationValues.get('rSquared')}</p>
          </div>
        )
        break
      case 'r':
        return (
          <div id='reactRegression'>
            <label htmlFor='rBeta_0'>Beta 0</label>
            <p id='rBeta_0'> {this.state.regressionValues.get('beta_0')} </p>
            <label htmlFor='rBeta_1'>Beta 1</label>
            <p id='rBeta_1'> {this.state.regressionValues.get('beta_1')} </p>
            <RegressionWarning warning={this.state.rWarning} />
          </div>
        )
        break
      default:
        // this should never occour
        console.warn('Abberant Behaveour detected in ResponseSegment')
    }
  }
}

class ErrorMessage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { shown: false }
    this.setShown = this.setShown.bind(this)
  }

  setShown (newState) {
    this.setState({ shown: newState })
  }

  render () {
    if (this.state.shown) {
      return (
        <p>Invalid data was provided - please try again. (see console for details)</p>
      )
    } else {
      return null
    }
  }
}

class ReactUI extends React.Component {
  constructor (props) {
    super(props)
    this.correlCalc = undefined
    this.regressCalc = undefined
    this.state = { displayMode: null, regressionValues: undefined, correlationValues: undefined }
    this.renderCall = this.renderCall.bind(this)
  }

  renderCall (mode) {
    // get entryBoxes two arrays - validation required.
    let theValues = this.theEntries.getValues() // get the values from the input boxes
    this.theErrorMessage.setShown(false) // hide the error message - might be displayed again later
    if (mode === 'c') {
      let validatedData = HelperFunctions.checkData(theValues.get('x'), theValues.get('y'))

      if (validatedData) {
        if (!(this.correlCalc instanceof CorrelationCalculator)) {
          // define new correlation calculator
          this.correlCalc = new CorrelationCalculator(...validatedData)
        } else {
          // reinitalize
          this.correlCalc.initalize(...validatedData)
        }
        let calculated = this.correlCalc.calculate()
        this.theResponder.stateUpdate(mode, calculated)
      } else {
        // something went wrong with the validation - one of the arrays was wrong. Show an error?
        this.theErrorMessage.setShown(true)
      }
    } else if (mode === 'r') {
      let validatedData = HelperFunctions.checkData(theValues.get('x'), theValues.get('y'), true, theValues.get('xk')) // validate and reformat data
      // console.log(validatedData)

      if (validatedData) {
        if (!(this.regressCalc instanceof RegressionCalculator)) {
          // create new regression calculator
          this.regressCalc = new RegressionCalculator(...validatedData)
        } else { // a regression calculator already exists
          this.regressCalc.reInitalize(...validatedData) // reinitalize
        }
        let calculated = this.regressCalc.calculate(validatedData[2])
        this.theResponder.stateUpdate(mode, calculated, this.regressCalc.warning)
      } else {
        this.theErrorMessage.setShown(true)
        // data validation failed - show error of some kind to user
      }
    } else {
      console.warn('Abberant behaveour detected in reactUI.renderCall()') // - tried to call with an unsupported mode
    }
  }

  render () {
    return (
      <div id='This Div exists because babel 6 is stupid - fix later'>
        <h2 className='card-header'>{reactSectionHeader}</h2>
        <ErrorMessage ref={(theErrorMessage) => this.theErrorMessage = theErrorMessage} />
        <EntryBoxes ref={(theEntries) => this.theEntries = theEntries} />
        <ActionButtons callback={this.renderCall} />
        <ResponseSegement ref={(theResponder) => this.theResponder = theResponder} />
      </div>
    )
  }
}

ReactDOM.render(
  <ReactUI />, root
)


// this section is in babel

var root = document.getElementById('reactInterface')
const reactSectionHeader = 'ReactJS User Interface:'

class EntryArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }
 
  
  render () {
    return (
      <div className={this.props.entrytype + 'Entry'}>
        <h3>{`${this.props.entrytype} values:`}</h3>
        <textarea name={`react${this.props.entrytype}`} placeholder={`Enter your ${this.props.entrytype} values here, one per line or comma seperated`} cols='10' rows='15' ></textarea>
      </div>
    )
  }
}


class ActionButtons extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick (e) {
    if(e.target.name === 'correlation') {
      // run correlation analysis
      console.log('Running correlation')
    } else if (e.target.name === 'regression') {
      console.log('Running Regression')
    } else { // shouldn't happen
      console.log('Abberant behaveour in ActionButtons.handleClick()')
    }
  }
  
  render () {
    return (
    <div className='actionButtons'>
      <input type='button' onClick={this.handleClick} name='correlation' value='Calculate Correlation' />
      <input type='button' onClick={this.handleClick} name='regression' value='Calculate Regression' />
    </div>
    )
  }
}

class EntryBoxes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {X: '', Y: '', xkValue: ''}
  }
  
  onChange(event) {
    let theTargetName = event.target.name
    this.setState({theTargetName: event.target.value})
  }
  
  render() {
    return (
      <div className='reactEntryBoxes'> 
        <div className = 'EntryTextAreas' onChange={this.onChange}>
          <EntryArea entrytype='Y' />
          <EntryArea entrytype='X' />
        </div>
        <div className = 'xkEntry'>
          <label htmlFor='reactXK'> {'Enter your XK value here (optional)'} </label>
          <input type='text' id='reactXK' /> 
        </div>
      </div>
    )
  }
  
}

class Regressionwarning extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    if (!this.props.warning) {
      return null
    } else {
      <p id='r_yk_warning'> {this.props.warning} </p>
    }
  }
  
}


class ResponseSegement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {displayMode: null, regressionValues: new Map(), correlationValues: new Map()}
  }
  
  stateUpdate(mode, values) {
    switch(mode) {
      case 'c':
        this.setState({displayMode: mode, correlationValues: values})
      case 'r':
        this.state.displayMode = mode
        this.regressionValues = values
        break
      case null:
        this.state.displayMode = null
        break
      default:
        console.warn('warning, abberant behaveour detected in ResponseSegement.stateUpdate()')
    }
  }
  
  render() {
    switch (this.state.displayMode) {
      case null:
        return null
        break
      case "c": 
        return(
          <div id='reactCorrelation'>
            <label for="rCorrelationR"><i>r</i>:</label>
            <p id='rCorrelationR'>{this.state.correlationValues.get('r')}</p>
        
            <label for="rCorrelationR2"><i>r<sup>2</sup></i>:</label>
            <p id='rCorrelationR2'>{this.state.correlationValues.get('rSquared')}</p>
          </div>
        )
        break
      case "r": 
        return(
          <div id='reactRegression'>
            <label htmlFor='rBeta_0'>Beta 0</label>
            <p id='rBeta_0'> {this.state.regressionValues.get('beta_0')} </p>
            <label htmlFor='rBeta_1'>Beta 1</label>
            <p id='rBeta_1'> {this.state.regressionValues.get('beta_1')} </p>
            <Regressionwarning warning={this.state.regressionValues.warning} />
          </div>
        )
        break
      default:
        // this should never occour
        console.warn('Abberant Behaveour detected in ResponseSegment')
    }
    
  }
  
  
}

class ReactUI extends React.Component {
  constructor(props) {
    super(props)
    this.correlCalc = undefined
    this.regressCalc = undefined
    this.state = {displayMode: null, regressionValues: undefined, correlationValues: undefined}
  }
  
  renderCall(mode) {
    // get entryBoxes two arrays - validation required.
    let theValues = this.theEntries.getValues()
    if (mode === 'r') {
      // call regressCalc with new arrays, and xk if provided
      // set state of responseSegment to {displayMode: 'r', regressionValues: {as calculated from regressionCalc} }
    } else if (mode === 'c') {
      // call correlCalc with new arrays
      // set state of responseSegment to {displayMode: 'c', correlationValues: {as calculated from correlation calc} }
    } else {
      console.warn('Abberant behaveour detected in reactUI.renderCall()') // error
    }
  }
  
  render() {
    return (
        <div id='This Div exists because babel 6 is stupid - fix later'>
          <h2>{reactSectionHeader}</h2>
          <EntryBoxes ref={theEntries => this.theEntries = theEntries} />
          <ActionButtons callback={this.rendercall}/>
          <ResponseSegement ref={theResponder => this.theResponder = theResponder} />
        </div>
      )
  }
  
  
}


ReactDOM.render(
  <ReactUI />, root
)
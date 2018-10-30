
// this section is in babel

function reactLoad() {
  
  const root = document.getElementById('reactInterface')
  
  const reactSectionHeader = 'ReactJS User Interface'
  
  const sectionHeader = (
    <h2> {sectionHeader} </h2>
  )
  
  ReactDOM.render(
    sectionHeader, root
  )
  
}
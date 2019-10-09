import React, { Component } from 'react'

export class ExampleWindow extends Component {
  constructor(props){
    super(props)
  }
  render() {
    if(this.props.exampleText) {
      return (
        <div id="terminal" className="example-window">
          Example:  {this.props.exampleText}
        </div>
      )
    } else {
      return (
        <div className="example-window">No examples</div>
      )
    }
  }
}

export default ExampleWindow

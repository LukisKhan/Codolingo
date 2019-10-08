import React, { Component } from 'react'

export class Repl extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputText: "",
      outputText: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    let inputText = this.state.inputText;
    let outputText = JSON.stringify(inputText);
    let parsed = JSON.parse(outputText);
    this.setState({outputText: parsed});
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.inputText}
            onChange={e => this.setState({inputText: e.target.value})} />
          <button>Test your code</button>
        </form>
        <div>{this.state.outputText}</div>
      </div>
    )
  }
}

export default Repl

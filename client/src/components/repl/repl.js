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
    let idx = inputText.indexOf('=');
    if (idx) {
      inputText = inputText.slice(idx+1);
    }
    let parsed;
    try {
      parsed = JSON.parse(inputText);
      parsed = inputText.toString();
    } catch (error) {
      parsed = eval(inputText);
    }
    this.setState({outputText: parsed});
  }
  render() {
    return (
      <div className="repl">
        <h6>Test single line expression in js</h6>
        <form onSubmit={this.handleSubmit}>
          <textarea 
            style={{ minHeight: 100, minWidth: 250 }}
            value={this.state.inputText}
            placeholder='Test your code here' 
            onChange={e => this.setState({ inputText: e.target.value })} >
          </textarea>
          <button>Test your code</button>
        </form>
        <div>{this.state.outputText.toString()}</div>
      </div>
    )
  }
}

export default Repl

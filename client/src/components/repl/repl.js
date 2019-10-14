import React, { Component } from 'react'

export class Repl extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputText: "",
      outputText: "Please enter an expression",
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
    try{
      try {
        parsed = JSON.parse(inputText);
        parsed = inputText.toString();
      } catch (error) {
        parsed = eval(inputText);
      }
    } catch (error) {
      parsed = error.toString();
    }
    this.setState({outputText: `> ${this.state.inputText} \n ${parsed}`});
  }
  render() {
    return (
      <div className="repl">
        <form className="repl-form" onSubmit={this.handleSubmit}>
          <input type="text" 
            style={{ fontSize: "20px", minWidth: 250 }}
            value={this.state.inputText}
            placeholder='Test your code here' 
            onChange={e => this.setState({ inputText: e.target.value })} >
          </input>
          <button id="enter-code-button">Enter</button>
        </form>
        <div id="output-text">{this.state.outputText}</div>
      </div>
    )
  }
}

export default Repl

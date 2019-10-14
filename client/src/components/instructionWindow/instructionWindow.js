import React, { Component } from 'react'

export class InstructionWindow extends Component {
  constructor(props){
    super(props)
  }
  render() {
    if(this.props.hintText) {
      return (
        <div 
          className={`hint-window ${this.props.propsClassName}`}
          onClick={e => e.stopPropagation()}>
            Hint:  {this.props.hintText}
        </div>
      )
    } else {
      return (
        <div 
          className={`hint-window ${this.props.propsClassName}`}
          onClick={e => e.stopPropagation()}>
            No hints
        </div>
      )
    }
  }
}

export default InstructionWindow

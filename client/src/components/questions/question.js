import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { NEW_QUESTION } from '../../graphql/mutations';
import Queries from '../../graphql/queries';
const { FETCH_QUESTIONS } = Queries;

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "Message in constructor",
      prompt: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
    };
    // this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field){
    return e =>  this.setState({[field]: e.target.value});
  }

  updateCache(cache, { data }) {
    let questions;
    try {
      questions = cache.readQuery({ query: FETCH_QUESTIONS });
    } catch (err) {
      return;
    }

    if (questions) {
      // take care of un-nesting things before we write to our cache
      let questionArray = questions.questions;
      let newQuestion = data.newQuestion;
      cache.writeQuery({
        query: FETCH_QUESTIONS,
        data: { questions: questionArray.concat(newQuestion) }
      });
    }
  }
  handleSubmit(e, newQuestion) {
    e.preventDefault();
    let prompt = this.state.prompt;
    newQuestion({
      variables: {
        prompt: prompt
      }
    }).then( data => {
      this.setState({
        message: `New question has been created`,
        prompt: "",
      });
    });
  }
  render() {
    return (
      <Mutation
        mutation={NEW_QUESTION}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newQuestion, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newQuestion)}>
              <label> Question
              <input onChange={this.updateField("prompt")} value={this.state.prompt} /><br />
              </label>
              <label> Answer Choice
              <input onChange={this.updateField("answerA")} type="text" /><br />
              </label>
              <label> Answer Choice
              <input onChange={this.updateField("answerB")} type="text" /><br />
              </label>
              <label> Answer Choice
              <input onChange={this.updateField("answerC")} type="text" /><br />
              </label>
              <label> Answer Choice
              <input onChange={this.updateField("answerD")} type="text" /><br />
              </label>
              <button>+</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
        
    )
  }
}

export default Question;

import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import Repl from "../repl/repl";
const { FETCH_LESSON } = Queries;

class LessonDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = { questionIdx: 0, correctAnswer: "", incorrectAnswer: ""};
  }
  chooseAnswer(e, isCorrect, answer){
    e.stopPropagation();
    if (isCorrect){
      console.log("Correct");
      this.setState({correctAnswer: ` ${answer} \n> Correct!`, incorrectAnswer: ""})
    } else {
      console.log("Try again");
      this.setState({ incorrectAnswer: ` ${answer} \n> Sorry, try again`, correctAnswer: "" })
    }
  }
  render() {
    return (
      <div className="lesson-detail">
          <Query query={FETCH_LESSON} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              let questionArray = data.lesson.questions;
              let questionCurrent = questionArray[this.state.questionIdx];
              console.log(this.state.questionIdx);
              if (this.state.questionIdx >= questionArray.length) {
                return <div>End of lesson</div>
              } else {
                return (
                  <div>
                    <p>Lesson details</p>
                    <p>Title: {data.lesson.title}</p>
                    <p>ID: {data.lesson._id}</p>
                    <div id="terminal">
                      <div id="top-terminal-bar"></div>
                        <p id="question-intro">What would the follow expression return: </p>
                        <p id="prompt"> > {questionCurrent.prompt}</p>
                        <p id="correct-answer">{this.state.correctAnswer}</p>
                        <p id="incorrect-answer">{this.state.incorrectAnswer}</p>
                    </div>
                      <ul>
                        {questionCurrent.answers.map((answer) => {
                          return (
                            <li key={answer._id} onClick={e => this.chooseAnswer(e, answer.isCorrect, answer.answer)}>
                              <h4>{answer.answer}</h4>
                              {/* <h4>Correct: {answer.isCorrect.toString()}</h4> */}
                            </li>
                          )
                        })}
                      </ul>
                    <button onClick={e => { this.setState({ questionIdx: this.state.questionIdx + 1, correctAnswer: "", incorrectAnswer:"" }) }}>Next</button>
                  </div>
                )

              }
            }}
          </Query>
          <div id="repl">
            Test your code
          </div>
      </div>
    )
  }
};

export default LessonDetail;

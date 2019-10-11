import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import Repl from "../repl/repl";
import InstructionWindow from "../instructionWindow/instructionWindow";
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
      this.setState({correctAnswer: `> You choose: ${answer} \n> Correct!`, incorrectAnswer: ""})
    } else {
      console.log("Try again");
      this.setState({ incorrectAnswer: `> You choose: ${answer} \n> Sorry, try again`, correctAnswer: "" })
    }
  }
  render() {
    return (
      <div className="lessonContainer">
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
                  <div className="lesson-detail-page">
                    <div className="lesson-window">
                      <div><h2>Title: {data.lesson.title}</h2></div>
                      <div><h3>Prompt: {questionCurrent.prompt}</h3></div>
                      <div id="terminal">
                        <div id="top-terminal-bar"></div>
                          <p id="example">{`  > ${questionCurrent.example}`}</p>
                          <p id="correct-answer">{this.state.correctAnswer}</p>
                          <p id="incorrect-answer">{this.state.incorrectAnswer}</p>
                      </div>
                      <div className="answer-window">
                        <ul className="answer-choice-list">
                          {questionCurrent.answers.map((answer) => {
                            return (
                              <li 
                                className="answer-choice"
                                key={answer._id} 
                                onClick={e => this.chooseAnswer(e, answer.isCorrect, answer.answer)}>
                                <div className="answer-text">{answer.answer}</div>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <button 
                        onClick={e => { this.setState({ questionIdx: this.state.questionIdx + 1, correctAnswer: "", incorrectAnswer:"" }) }}
                        className="next-button">
                          Next</button>
                    </div>
                    <div className="instruction-window">
                      <InstructionWindow hintText={questionCurrent.example} />
                      <div className="repl-window">
                        <Repl />
                      </div>
                    </div>
                  </div>
                )

              }
            }}
          </Query>
      </div>
    )
  }
};

export default LessonDetail;

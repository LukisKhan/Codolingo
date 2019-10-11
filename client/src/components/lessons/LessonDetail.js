import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom";
import Repl from "../repl/repl";
import InstructionWindow from "../instructionWindow/instructionWindow";
const { FETCH_LESSON } = Queries;

class LessonDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = { questionIdx: 0, correctAnswer: "", incorrectAnswer: "", 
                   displayHintWindow: false, displayReplWindow: false};
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
  goBack(){
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="lessonContainer">
          <Query query={FETCH_LESSON} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              let questionArray = data.lesson.questions,
                questionCurrent = questionArray[this.state.questionIdx],
                questionExample = "", 
                backButton,
                hintWindowClassName = "hide-hint-window",
                replWindowClassName = "hide-repl-window";
              if (this.state.displayHintWindow) hintWindowClassName = "display-hint-window";
              if (this.state.displayReplWindow) replWindowClassName = "display-repl-window";
              if (this.state.questionIdx > 0) {
                backButton =  (
                  <button
                    onClick={e => { this.setState({ questionIdx: this.state.questionIdx - 1, correctAnswer: "", incorrectAnswer: "" }) }}
                    className="back-button">Back
                  </button>
                );
              }
              console.log(this.state.questionIdx);
              if (this.state.questionIdx < questionArray.length && questionCurrent.example){
                questionExample = questionCurrent.example;
              }
              if (this.state.questionIdx >= questionArray.length) {
                return ( 
                  <div className="end-of-lesson">End of lesson
                      <button 
                        className="end-of-lesson-button"
                        onClick={this.goBack.bind(this)} >Back to Lessons</button>
                  </div>
                )
              } else {
                return (
                  <div className="lesson-detail-page">
                    <div className="lesson-window">
                      <div><h2>Title: {data.lesson.title}</h2></div>
                      <div><h3>Prompt: {questionCurrent.prompt}</h3></div>
                      <div id="terminal">
                        <div id="top-terminal-bar"></div>
                          <p id="example">{`  > ${questionExample}`}</p>
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
                      <div className="lesson-button">
                        {backButton}
                        <button
                          onClick={e => { this.setState({ questionIdx: this.state.questionIdx + 1, correctAnswer: "", incorrectAnswer: "" }) }}
                          className="next-button">Next
                        </button>
                        <button
                          onClick={e => { this.setState({ displayHintWindow: true })}}>
                          Open Hint Window
                        </button>
                        <button
                          onClick={e => { this.setState({ displayHintWindow: false }) }}>
                          Close Hint Window
                        </button>
                        <button
                          onClick={e => { this.setState({ displayReplWindow: true }) }}>
                          Open Repl Window
                        </button>
                        <button
                          onClick={e => { this.setState({ displayReplWindow: false }) }}>
                          Close Repl Window
                        </button>
                      </div>
                    </div>
                    <div className="instruction-window">
                      <InstructionWindow 
                        propsClassName={`${hintWindowClassName}`}
                        hintText={questionCurrent.hint} />
                      <div className={`${replWindowClassName} repl-window`}>
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

export default withRouter(LessonDetail);

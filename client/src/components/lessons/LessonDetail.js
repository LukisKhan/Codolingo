import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom"
const { FETCH_LESSON } = Queries;

class LessonDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = { questionIdx: 0 }
  }
  chooseAnswer(e, isCorrect){
    // e.preventDefault();
    e.stopPropagation();
    // console.log(e.target.value);
    if (isCorrect){
      console.log("Correct");
    } else {
      console.log("Try again");
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
                      <p>What would the follow expression return: </p>
                      <p>{questionCurrent.prompt}</p>
                      <ul>
                        {questionCurrent.answers.map((answer) => {
                          return (
                            <li key={answer._id} onClick={e => this.chooseAnswer(e, answer.isCorrect)}>
                              <h4>{answer.answer}</h4>
                              {/* <h4>Correct: {answer.isCorrect.toString()}</h4> */}
                            </li>
                          )
                        })}
                      </ul>
                    <button onClick={e => { this.setState({ questionIdx: this.state.questionIdx + 1 }) }}>Next</button>
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

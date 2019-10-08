import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import { withRouter } from "react-router-dom"
const { FETCH_LESSON } = Queries;

class LessonDetail extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="lesson-detail">
          <Query query={FETCH_LESSON} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              return (
                <div>
                  <p>Lesson details</p>
                  <p>Title: {data.lesson.title}</p>
                  <p>ID: {data.lesson._id}</p>
                  <ul>
                    {data.lesson.questions.map((question) => {
                      return (
                        <li key={question._id}>
                            <h4>{question.prompt}</h4>
                          <ul>
                            {question.answers.map((answer) => {
                              console.log(answer);
                              return (
                                  <li key={answer._id}>
                                      <h4>{answer.answer}</h4>
                                      <h4>Correct: {answer.isCorrect.toString()}</h4>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </li>
                      )
                    }
                  )}
                  </ul>
                </div>
              )
            }}
          </Query>

      </div>
    )
  }
};

export default LessonDetail;

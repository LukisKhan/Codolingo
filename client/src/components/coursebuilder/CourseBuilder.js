import React from 'react';
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Queries from "../../graphql/queries";
const {
  FETCH_QUESTIONS,
  FETCH_LESSONS,
  FETCH_COURSES
} = Queries;


class CourseBuilder extends React.Component {

  render() {
    return (
      <div className="coursebuilder-container">
        <h1>Course Builder</h1>
        <Query query={FETCH_COURSES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
debugger
            return data.courses.map(({ _id, language, lessons }) => (
              <li key={_id}>
                <p>{language}</p>
                <Link to={`/lessons/${_id}`}></Link>
                
                <ul>
                  {lessons.map(lesson => {
                    return (
                      <li key={lesson._id}>
                        { lesson.title }
                        <ul>
                          {lesson.questions.map(question => {
                            return (
                              <li key={question._id}>
                                {question.prompt}
                                <ul>
                                  {question.answers.map(answer => {
                                    return (
                                      <li key={answer._id}>
                                        {answer.answer}
                                        {answer.isCorrect}
                                      </li>
                                    )
                                  })}
                                </ul>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ));
          }}
        </Query>

      </div>
    )
  }
}

export default CourseBuilder;
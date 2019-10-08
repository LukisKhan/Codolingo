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
            return data.courses.map(({ _id, language, lessons }) => (
              <li key={_id}>
                <Link to={`/lessons/${_id}`}></Link>
                <p>{language}</p>
                <p>{lessons}</p>
              </li>
            ));
          }}
        </Query>

      </div>
    )
  }
}

export default CourseBuilder;
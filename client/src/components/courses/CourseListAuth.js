import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_COURSES, IS_LOGGED_IN } = Queries;

const CourseListAuth = (props) => {
  return (
    <div className="course-list">
      <ul>
        <Query query={FETCH_COURSES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.courses.map(({ _id, language }) => (
              <li key={_id} language={language}>
                <Link to={`/courses/${language}`}>
                  <h4>{language}</h4>
                </Link>
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default CourseListAuth;

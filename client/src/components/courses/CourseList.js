import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import CourseHeader from './CourseHeader';
import Ruby from '../../assets/ruby-logo.png';

const { FETCH_COURSES } = Queries;

const CourseList = (props) => {
  return (
    <div className="course-list">
      <CourseHeader />
      <ul>
        <Query query={FETCH_COURSES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.courses.map(({ _id, language }) => (
              <div className="courseListItemContainer" key={_id} language={language}>
                <Link className="courseListLink" to={`/courses/${language}`}>
                  <div className="courseListItem">
                    <img src={Ruby} alt="language logo" />
                    <h4>{language}</h4>
                    <h5>5,000,000,000<br></br>users learning this language!</h5>
                  </div>
                </Link>
              </div>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default CourseList;

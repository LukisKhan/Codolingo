import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import CourseHeader from './CourseHeader';
import Ruby from '../../assets/ruby-logo.png';
import JavaScript from '../../assets/javascript-logo.png';
import SQL from '../../assets/sql-logo.png';

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
            console.log(data);
            return data.courses.map(({ _id, language, icon, description }) => (
              <div className="courseListItemContainer" key={_id} language={language}>
                <Link className="courseListLink" 
                  to={{
                    pathname: `/courses/${language}`,
                    state: { id: `${_id}`}
                  }}>
                  <div className="courseListItem">
                    <img src={process.env.PUBLIC_URL + icon} alt="language logo" />
                    <h4>{language}</h4>
                  </div>
                  <div className="courseRight">
                    {description}
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

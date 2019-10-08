import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_LESSONS } = Queries;

const LessonList = () => {
  return (
    <div className="lesson-list">
      <ul>
        <Query query={FETCH_LESSONS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.lessons.map(({ _id, title }) => (
              <li key={_id}>
                <Link to={`/lessons/${_id}`}>
                  <h4>{title}</h4>
                </Link>
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default LessonList;

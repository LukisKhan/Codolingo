import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_LESSONS, IS_LOGGED_IN } = Queries;

const LessonList = (props) => {
  return (
    <div className="lesson-list">
      <Link to="/courses">Choose a new language</Link>
      <ApolloConsumer>
          {client => (
            <Query query={IS_LOGGED_IN}>
              {({ data }) => (
                <div>
                  <Link to="/">
                    <button
                      onClick={e => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        client.writeData({ data: { isLoggedIn: false } });
                        props.history.push("/");
                      }}
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              )}
            </Query>
          )}
        </ApolloConsumer>
      <ul>
        <Query query={FETCH_LESSONS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.lessons.map(({ _id, title }) => (
              <li key={_id}>
                <Link to={`/lessons/${_id}`}>
                  <h4 className="question-title">{title}</h4>
                  <div class='ball'>
                    <div class='layer moving'>
                      <div class='layer gridplane xline'></div>
                      <div class='layer gridplane xline2'></div>
                      <div class='layer gridplane yline'></div>
                      <div class='layer gridplane zline'></div>
                      <div class='layer gridplane laser'></div>
                      <div class='layer gridplane laser2'></div>
                    </div>
                    <div class='layer clip'>
                      <div class='shade'>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="line">
                </div>
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default LessonList;

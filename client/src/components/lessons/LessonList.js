import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_LESSONS, IS_LOGGED_IN } = Queries;

const LessonList = (props) => {
  return (
    <div >
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
      <div >
      <ul className="lesson-list">
        <Query query={FETCH_LESSONS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.lessons.map(({ _id, title }) => (
              <li key={_id}>
                <Link to={`/lessons/${_id}`}>
                  <h4 className="question-title">{title}</h4>
                  <div className='ball'>
                    <div className='layer moving'>
                      <div className='layer gridplane xline'></div>
                      <div className='layer gridplane xline2'></div>
                      <div className='layer gridplane yline'></div>
                      <div className='layer gridplane zline'></div>
                      <div className='layer gridplane laser'></div>
                      <div className='layer gridplane laser2'></div>
                    </div>
                    <div className='layer clip'>
                      <div className='shade'>
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
    </div>
  );
};

export default LessonList;

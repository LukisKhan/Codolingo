import React from 'react';
import { Link, withRouter } from "react-router-dom";

// import Register from '../auth/Register';

import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const SplashNav = props => {
    return (
      <div>
        <ApolloConsumer>
          {client => (
            <Query query={IS_LOGGED_IN}>
              {({ data }) => {
                if (data.isLoggedIn) {
                  return (
                    <div>
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
                      <Link to="/courses">Courses</Link>
                      <Link to="/courses">Achievements</Link>
                      <Link to="/courses">Profile</Link>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <Link to="/">Home</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/register">Register</Link>
                    </div>
                  );
                }
              }}
            </Query>
          )}
        </ApolloConsumer>
      </div>
  )
}

export default withRouter(SplashNav);
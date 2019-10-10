import React from 'react';
import { Link } from 'react-router-dom';
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import Logo from '../assets/codolingo-logo2.png';
const { IS_LOGGED_IN } = Queries;

const CourseHeader = (props) => {
    return(
        <div className="courseHeader">
            <img className="courseHeaderLogo" src={Logo} alt="site logo" />
            <Link to={`/courses/${props.courseId}`}>Study</Link>
            <Link to="/courses">Choose a new language</Link>
            <ApolloConsumer>
                {client => (
                    <Query query={IS_LOGGED_IN}>
                        {({ data }) => (
                            <div>
                                <button className="logoutButton"
                                    onClick={e => {
                                        e.preventDefault();
                                        localStorage.removeItem("auth-token");
                                        client.writeData({ data: { isLoggedIn: false } });
                                        props.history.push("/");
                                    }}
                                >
                                Logout
                                </button>
                            </div>
                        )}
                    </Query>
                )}
            </ApolloConsumer>
        </div>
    )
}

export default CourseHeader;
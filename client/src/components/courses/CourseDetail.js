import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_LESSONS, IS_LOGGED_IN } = Queries;

class CourseDetail extends React.Component {
    render() {
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
                                this.props.history.push("/");
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
                {this.props.match.params.id}
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
    }
};

export default CourseDetail;

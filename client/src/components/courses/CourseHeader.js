import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import Logo from '../assets/codolingo-logo2.png';
import Profile from '../../assets/profile-icon.png';

const { IS_LOGGED_IN, FETCH_USER } = Queries;

class CourseHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { profilePopup: false };
        this.togglePopup = this.togglePopup.bind(this);
        console.log(props);
    }

    componentDidMount() {
        const body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", (event) => {
            if(this.state.profilePopup) {
                if(!Array.from(event.target.classList).includes("profileLink")
                && !Array.from(event.target.classList).includes("logoutButton")
                && !Array.from(event.target.classList).includes("profilePopup")) {
                    if(this.state.profilePopup) {
                        this.setState({profilePopup: false})
                    }
                }
            }
        })
    }

    togglePopup() {
        this.setState({
            profilePopup: !this.state.profilePopup
        })
    }

    render() {
        let authToken = localStorage.getItem("auth-token");
        let studyLink;
        if (this.props.courseId) studyLink = (<Link to={`/courses/${this.props.courseId}`}>Study</Link>);
        return(
            <div className="courseHeader">
                <img className="courseHeaderLogo" src={Logo} alt="site logo" />
                {studyLink}
                <Link to="/courses">Choose a new language</Link>
                <img src={Profile} alt="profile" onClick={this.togglePopup} />
                { this.state.profilePopup && 
                    <div className="profilePopup">
                        {/* <Link className="profileLink" to={'/users'}>Profile</Link> */}
                        <ApolloConsumer>
                            {client => (
                                <Query query={IS_LOGGED_IN}>
                                    {({ data }) => (
                                        <button className="logoutButton"
                                            onClick={e => {
                                                e.preventDefault();
                                                localStorage.removeItem("auth-token");
                                                client.writeData({ data: { isLoggedIn: false } });
                                                this.props.history.push("/");
                                            }}
                                        >
                                        Logout
                                        </button>
                                    )}
                                </Query>
                            )}
                        </ApolloConsumer>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(CourseHeader);
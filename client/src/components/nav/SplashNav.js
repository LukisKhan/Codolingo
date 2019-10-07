import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import HeaderDropdown from './header_dropdown';
import Menu from '../../assets/hamburger-menu.svg';

import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

class SplashNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dropdown: false};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", (event) => {
            if(this.state.dropdown) {
                if(!Array.from(event.target.classList).includes("headerDropdown")
                && !Array.from(event.target.classList).includes("dropdownItem")) {
                    if(this.state.dropdown) {
                        this.setState({dropdown: false})
                    }
                }
            }
        })
    }

    handleClick() {
        this.setState({
            dropdown: true
        })
    }

    render() {
        return(
            <div className="splashNav">
                <a href="#">Codolingo</a>
                <div className="dropdownButton" onClick={this.handleClick}>
                    <img className="headerMenu" src={Menu} alt="hamburger menu" />
                    {this.state.dropdown && <HeaderDropdown />}
                </div>
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
                                    this.props.history.push("/");
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
}

export default withRouter(SplashNav);


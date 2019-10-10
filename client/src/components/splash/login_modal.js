import React from 'react';
import {Mutation} from 'react-apollo';
import {LOGIN_USER} from '../../graphql/mutations';
import { withRouter } from 'react-router-dom';

import Close from '../../assets/close.svg';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
    }

    update(field) {
        return (e) => this.setState({
            [field]: e.target.value
        })
    }

    updateCache(client, {data}) {
        // here we can write directly to our cache with our returned mutation data
        client.writeData({
            data: { isLoggedIn: data.login.loggedIn }
        });
    }

    render() {
        return(
            <Mutation mutation={LOGIN_USER}
                onCompleted={data => {
                    const {token} = data.login;
                    localStorage.setItem("auth-token", token);
                    this.props.history.push("/courses");
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                {loginUser => (
                    <div className="authModal">
                        <div className="closeButton">
                            <img src={Close} alt="close button" onClick={this.props.toggleLoginModal}/>
                        </div>
                        <h3>Log in</h3>
                        <form className="authInputForm"
                            onSubmit={e => {
                                e.preventDefault();
                                loginUser({
                                    variables: {
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                });
                            }}
                        >
                            <div className="authInputContainer">
                                <input className="authInput" type="text" placeholder="Email"
                                    value={this.state.email} onChange={this.update("email")} />
                                <input className="authInput" type="password" placeholder="Password"
                                    value={this.state.password} onChange={this.update("password")} />
                            </div>
                            <button className="authButton" type="submit">Log in</button>
                        </form>
                        
                        <div className="disclaimer">
                            <h5>By signing in to Codolingo, you agree to our Terms and Privacy Policy</h5>
                            <div className="switchAuth">
                                <h5>Don't have an account?</h5>
                                <button className="switchAuthButton" onClick={this.props.toggleBothModals}>Sign up</button>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default withRouter(LoginModal);
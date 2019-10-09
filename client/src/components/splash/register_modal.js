import React from 'react';
import {Mutation} from 'react-apollo';
import {REGISTER_USER} from '../../graphql/mutations';
import { Link } from 'react-router-dom';

import Close from '../../assets/close.svg';

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", name: ""};
    }

    update(field) {
        return (e) => this.setState({
            [field]: e.target.value
        })
    }

    updateCache(client, { data }) {
        client.writeData({
          data: { isLoggedIn: data.register.loggedIn }
        });
    }

    render() {
        return(
            <Mutation mutation={REGISTER_USER}
                onCompleted={data => {
                    console.log(data);
                    const {token} = data.register;
                    localStorage.setItem("auth-token", token);
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                {registerUser => (
                    <div className="authModal">
                        <div>
                            <img src={Close} alt="close button" onClick={this.props.toggleRegisterModal}/>
                        </div>
                        <h3>Sign up</h3>
                        <form className="authInputContainer"
                            onSubmit={e => {
                                e.preventDefault();
                                registerUser({
                                    variables: {
                                        name: this.state.name,
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                });
                            }}
                        >
                            <input className="authInput" type="text" placeholder="Username"
                                value={this.state.name} onChange={this.update("name")} />
                            <input className="authInput" type="text" placeholder="Email"
                                value={this.state.email} onChange={this.update("email")} />
                            <input className="authInput" type="password" placeholder="Password"
                                value={this.state.password} onChange={this.update("password")} />
                            <Link to="/lessons">
                                <button className="authButton" type="submit">Sign up</button>
                            </Link>
                        </form>
        
                        <div className="disclaimer">
                            <h5>By signing in to Codolingo, you agree to our Terms and Privacy Policy</h5>
                            <div className="switchAuth">
                                <h5>Already have an account?</h5>
                                <button className="switchAuthButton" onClick={this.props.toggleBothModals}>Log in</button>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default RegisterModal;
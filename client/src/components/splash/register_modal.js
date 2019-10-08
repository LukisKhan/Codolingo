import React from 'react';

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

    render() {
        return(
            <div className="authModal">
                <div>
                    <img src={Close} alt="close button" onClick={this.props.toggleRegisterModal}/>
                </div>
                <h3>Sign up</h3>
                <div className="authInputContainer">
                    <input className="authInput" type="text" placeholder="Username"
                        value={this.state.name} onChange={this.update("name")} />
                    <input className="authInput" type="text" placeholder="Email"
                        value={this.state.email} onChange={this.update("email")} />
                    <input className="authInput" type="password" placeholder="Password"
                        value={this.state.password} onChange={this.update("password")} />
                </div>

                <button className="authButton">Sign up</button>
                <div className="disclaimer">
                    <h5>By signing in to Codolingo, you agree to our Terms and Privacy Policy</h5>
                    <div className="switchAuth">
                        <h5>Already have an account?</h5>
                        <button className="switchAuthButton" onClick={this.props.toggleBothModals}>Log in</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterModal;
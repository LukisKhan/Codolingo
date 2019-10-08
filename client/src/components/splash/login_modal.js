import React from 'react';

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

    render() {
        return(
            <div className="authModal">
                <div>
                    <img src={Close} alt="close button" onClick={this.props.toggleLoginModal}/>
                </div>
                <h3>Log in</h3>
                <div className="authInputContainer">
                    <input className="authInput" type="text" placeholder="Email"
                        value={this.state.email} onChange={this.update("email")} />
                    <input className="authInput" type="password" placeholder="Password"
                        value={this.state.password} onChange={this.update("password")} />
                </div>
                    
                <button className="authButton">Log in</button>
                <div className="disclaimer">
                    <h5>By signing in to Codolingo, you agree to our Terms and Privacy Policy</h5>
                    <div className="switchAuth">
                        <h5>Don't have an account?</h5>
                        <button className="switchAuthButton" onClick={this.props.toggleBothModals}>Sign up</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal;
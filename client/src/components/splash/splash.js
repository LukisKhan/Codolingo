import React from 'react';
import {Link} from 'react-router-dom';

import SplashNav from '../nav/SplashNav';
import SplashFooter from './splash_footer';
import LoginModal from './login_modal';
import RegisterModal from './register_modal';

import Planet from '../../assets/earth-two-rings.svg';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = { registerModal: false, loginModal: false };
        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleBothModals = this.toggleBothModals.bind(this);
    }

    componentDidMount() {
        const body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", (event) => {
            if(this.state.loginModal) {
                if(!Array.from(event.target.classList).includes("loginModal")
                && !Array.from(event.target.classList).includes("authButton")
                && !Array.from(event.target.classList).includes("switchAuthButton")
                && !Array.from(event.target.classList).includes("authInput")) {
                    if(this.state.loginModal) {
                        this.setState({loginModal: false})
                    }
                }
            } if(this.state.registerModal) {
                if(!Array.from(event.target.classList).includes("registerModal")
                && !Array.from(event.target.classList).includes("authButton")
                && !Array.from(event.target.classList).includes("switchAuthButton")
                && !Array.from(event.target.classList).includes("authInput")) {
                    if(this.state.registerModal) {
                        this.setState({registerModal: false})
                    }
                }
            }
        })
    }

    toggleLoginModal() {
        this.setState({loginModal: !this.state.loginModal})
    }

    toggleRegisterModal() {
        this.setState({registerModal: !this.state.registerModal})
    }

    toggleBothModals() {
        this.setState({registerModal: !this.state.registerModal,
            loginModal: !this.state.loginModal
        })
    }

    render() {
        return(
            <div className="splashBody">
                <SplashNav toggleLoginModal={() => this.toggleLoginModal()}
                    toggleRegisterModal={() => this.toggleRegisterModal()}
                    toggleBothModals={() => this.toggleBothModals()} />
                { this.state.registerModal && 
                    <RegisterModal 
                    toggleRegisterModal={() => this.toggleRegisterModal()} 
                    toggleBothModals={() => this.toggleBothModals()} /> }
                { this.state.loginModal && 
                    <LoginModal 
                    toggleLoginModal={() => this.toggleLoginModal()}
                    toggleBothModals={() => this.toggleBothModals()} /> }
                <div className="splashRegisterContainer">
                    <img className="planet" src={Planet} alt="planet" />
                    <div className="splashRegister">
                        <h1>Learn coding for free.</h1>
                        <button className="signupButton" onClick={this.toggleRegisterModal}>
                            GET STARTED
                        </button>
                        <button className="signinButton" onClick={this.toggleLoginModal}>
                            I ALREADY HAVE AN ACCOUNT
                        </button>
                    </div>
                </div>
                <div className="splashPromotion">
                    <h2>Stuff about the website</h2>
                </div>
                <SplashFooter toggleRegisterModal={() => this.toggleRegisterModal()}
                    toggleBothModals={() => this.toggleBothModals()} />
            </div>
        )
    }
}

export default Splash;
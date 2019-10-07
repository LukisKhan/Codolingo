import React from 'react';

import SplashNav from '../nav/SplashNav';
import SplashFooter from './splash_footer';

import Planet from '../../assets/earth-two-rings.svg';

class Splash extends React.Component {
    render() {
        return(
            <div className="splashBody">
                <SplashNav />
                <div className="splashRegisterContainer">
                    <img className="planet" src={Planet} alt="planet" />
                    <div className="splashRegister">
                        <h1>Learn coding for free.</h1>
                        <div><button className="signupButton">GET STARTED</button></div>
                        <div><button className="signinButton">I ALREADY HAVE AN ACCOUNT</button></div>
                    </div>
                </div>
                <div className="splashPromotion">
                    <h2>Stuff about the website</h2>
                </div>
                <SplashFooter />
            </div>
        )
    }
}

export default Splash;
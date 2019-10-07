import React from 'react';
import {Link} from 'react-router-dom';

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
                        <Link to="/register"><button className="signupButton">GET STARTED</button></Link>
                        <Link to="login"><button className="signinButton">I ALREADY HAVE AN ACCOUNT</button></Link>
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
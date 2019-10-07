import React from 'react';
import {Link} from 'react-router-dom';

class SplashFooter extends React.Component {
    render() {
        return(
            <div className="splashFooter">
                <h1>Learn coding with Codolingo</h1>
                <Link to="/register"><button className="signupButton">GET STARTED</button></Link>
                <div className="footerLinks">
                    <h4>Contact us:</h4>
                    <a href="https://github.com/ropfa0604">Brett Meyer</a>
                    <a href="https://github.com/kmoonwright">Kyle Moon Wright</a>
                    <a href="https://github.com/LukisKhan">Luat Pham</a>
                </div>
            </div>
        )
    }
}

export default SplashFooter;
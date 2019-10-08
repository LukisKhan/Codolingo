import React from 'react';

class SplashFooter extends React.Component {
    render() {
        return(
            <div className="splashFooter">
                <h1>Learn coding with Codolingo</h1>
                <button className="signupButton" onClick={this.props.toggleRegisterModal}>
                    GET STARTED
                </button>
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
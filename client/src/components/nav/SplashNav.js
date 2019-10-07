import React from 'react';

import HeaderDropdown from './header_dropdown';

import Menu from '../../assets/hamburger-menu.svg';

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
            </div>
        )
    }
}

export default SplashNav;
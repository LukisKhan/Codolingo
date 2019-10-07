import React from 'react';
import Link from 'react-router-dom';

class HeaderDropdown extends React.Component {
    render() {
        return(
            <div className="headerDropdown">
                <div className="dropdownTriangle"></div>
                <ul className="dropdownList">
                    <li className="dropdownItem">Sign in</li>
                    <li className="dropdownItem">Get started</li>
                    <li className="dropdownItem">Site language: English</li>
                </ul>
            </div>
        )
    }
}

export default HeaderDropdown;
import React from 'react';
import {Link} from 'react-router-dom';

class HeaderDropdown extends React.Component {
    render() {
        return(
            <div className="headerDropdown">
                <div className="dropdownTriangle"></div>
                <ul className="dropdownList">
                    <li className="dropdownItem">
                        <Link to="/login">Sign in</Link>
                    </li>
                    <li className="dropdownItem">
                        <Link to="/register">Get started</Link>
                    </li>
                    <li className="dropdownItem">Site language: English</li>
                </ul>
            </div>
        )
    }
}

export default HeaderDropdown;
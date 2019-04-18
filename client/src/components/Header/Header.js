import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = props => {
    return (
        <header className="header-container">
            <h1><Link to="/">CHAT APP</Link></h1>
            <div>{props.children}</div>
    </header>
    );
};

export default Header;
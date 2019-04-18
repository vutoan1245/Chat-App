import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header-container">
            <h1><Link to="/">CHAT APP</Link></h1>
            <button className="logout-button">Logout</button>
    </header>
    );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/feeling-lucky">I'm Feeling Lucky</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;

import React from 'react';
import "./NavBar.css"
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
    <nav>
        <h1>Fuel Website</h1>
        <ul className = 'nav-links'>
            <li>Fuel Quote</li>
            <li>Fuel Quote History</li>
            <li>Profile Management</li>
        </ul>
    </nav>
    );
}

export default NavBar;
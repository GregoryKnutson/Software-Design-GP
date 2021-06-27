import React from 'react';
import './NavBar.css'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
    <nav>
        <h1>Fuel Website</h1>
        <ul className = 'nav-links'>
            <NavLink 
                to="/"
                exact
                activeStyle={{
                    fontWeight: "bold",
                }}>
                Home
            </NavLink>

            <NavLink 
                to="/fuelquote"
                activeStyle={{
                    fontWeight: "bold",
                }}>
                Fuel Quote
            </NavLink>

            <NavLink 
                to="/history"
                activeStyle={{
                    fontWeight: "bold",
                }}>
                Fuel Quote History
            </NavLink>

            <NavLink 
                to="/profile"
                activeStyle={{
                    fontWeight: "bold",
                }}>
                Profile Management
            </NavLink>

        </ul>
    </nav>
    );
}

export default NavBar;
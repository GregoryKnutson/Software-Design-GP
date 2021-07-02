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
                className='nav-item'
                to="/"
                exact
                activeStyle={{
                    fontWeight: "bold",
                }}>
                Home
            </NavLink>

            <NavLink 
                className='nav-item'
                to="/fuelquote"
                activeStyle={{
                    fontWeight: "bold",
                }}>
                Fuel Quote
            </NavLink>

            <NavLink 
                className='nav-item'
                to="/history"
                activeStyle={{
                    fontWeight: "bold",
                }}>
                Fuel Quote History
            </NavLink>

            <NavLink 
                className='nav-item'
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
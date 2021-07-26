import React from 'react';
import './NavBar.css'
import { NavLink, useHistory, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { destroyAuth } from '../../verifyLogin';

const NavBar = () => {
    const history = useHistory();

    const logout=()=>{
        destroyAuth()
        history.push("/login")
    }

    return (
    <nav>
        <h1>Fuel Website</h1>
        <ul className = 'nav-links'>
            <NavLink 
                className='nav-item'
                to="/home"
                exact
                activeStyle={{
                    fontWeight: 800,
                }}>
                Home
            </NavLink>

            <NavLink 
                className='nav-item'
                to="/fuelquote"
                activeStyle={{
                    fontWeight: 800,
                }}>
                Fuel Quote
            </NavLink>

            <NavLink 
                className='nav-item'
                to="/history"
                activeStyle={{
                    fontWeight: 800,
                }}>
                Fuel Quote History
            </NavLink>

            <NavLink 
                className='nav-item'
                to="/profile"
                activeStyle={{
                    fontWeight: 800,
                }}>
                Profile Management
            </NavLink>
            <button
                className='signout'
                onClick={logout}
            >
                Sign Out
            </button>

        </ul>
    </nav>
    );
}

export default NavBar;
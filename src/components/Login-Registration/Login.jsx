import { render } from '@testing-library/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../../auth';
import loginImg from "./loginPic.svg";

export class Login extends React.Component {
    
    constructor(props) {
        super(props);
    }

    handleClick(props) {
        console.log("Logging in")
        auth.login()

        if (auth.isAuthenticated()){
            
            return (
                <Redirect to="/home"/>
            )
        }
        
    }


    render() {
        return (
        <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password"></input>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={() => this.handleClick()}>Login</button>
            </div>
        </div>
        );
    }
}
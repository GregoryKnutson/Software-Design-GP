import { render } from '@testing-library/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import fakeAuth from '../../auth';
import loginImg from "./loginPic.svg";

export class Login extends React.Component {

    state = {
        redirectToReferrer: false
    }
    
    constructor(props) {
        super(props);
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    }

    render() {
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return (
                <Redirect to='/home' />
            )
        }
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
                <button type="button" className="btn" onClick={this.login}>Login</button>
            </div>
        </div>
        );
    }
}
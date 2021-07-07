import React from "react";
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Component } from "react";
import auth from "./auth";
import fakeAuth from "./auth";

export const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
    ? <Component {...props} />
    : <Redirect to='/login' />
  )}/>
)

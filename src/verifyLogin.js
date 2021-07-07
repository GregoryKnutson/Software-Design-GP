import React from "react";
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Component } from "react";
import auth from "./auth";

export const PrivateRoute = ({component, ...rest}) => {
  const Component = component;
  return (
    <Route {...rest} render={props => (
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    )} />
  )
};
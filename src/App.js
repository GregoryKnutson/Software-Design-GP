import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { PrivateRoute } from "./verifyLogin"
import Logins from './components/Login-Registration/Logins'
import FuelQuote from './components/FuelQuote/FuelQuote';
import FuelQuoteHistory from './components/History/History';
import ProfileManagement from './components/Profile/ProfileManagement';
import Home from './components/Home/Home';

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <PrivateRoute path="/home" component={Home} />
        <Route path="/login" component={Logins} />
        <PrivateRoute path="/fuelquote" component={FuelQuote} />
        <PrivateRoute path="/history" component={FuelQuoteHistory}/>
        <PrivateRoute path="/profile" component={ProfileManagement}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
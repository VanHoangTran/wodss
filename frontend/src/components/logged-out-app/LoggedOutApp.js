import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import SignUp from "../sign-up/SignUp";
import Login from "../login/Login";
import ResetPassword from "../reset-password/ResetPassword";

class LoggedOutApp extends Component {

  render() {
    return (
      <div>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/resetPassword" component={ResetPassword}/>
        </Switch>
      </div>
    );
  }
}

export default LoggedOutApp;

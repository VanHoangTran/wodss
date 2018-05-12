import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Registration from "../registration/Registration";
import Login from "../login/Login";
import ResetPassword from "../reset-password/ResetPassword";

class LoggedOutApp extends Component {

  render() {
    return (
      <div>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signUp" component={Registration}/>
            <Route exact path="/resetPassword" component={ResetPassword}/>
        </Switch>
      </div>
    );
  }
}

export default LoggedOutApp;

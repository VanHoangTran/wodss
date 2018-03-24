import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from '../header/Header';
import MatchList from '../match-list/MatchList';
import SignUp from "../sign-up/SignUp";

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Switch>
            <Route exact path="/" component={MatchList}/>
            <Route exact path="/signup" component={SignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;

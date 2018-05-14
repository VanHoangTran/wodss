import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from '../header/Header';
import MatchList from '../match-list/MatchList';
import Registration from "../registration/Registration";

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Switch>
            <Route exact path="/" component={MatchList}/>
            <Route exact path="/signup" component={Registration}/>
        </Switch>
      </div>
    );
  }
}

export default App;

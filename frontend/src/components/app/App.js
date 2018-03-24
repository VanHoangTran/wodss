import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from '../header/Header';
import MatchList from '../match-list/MatchList';

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Switch>
            <Route exact path="/" component={MatchList}/>
        </Switch>
      </div>
    );
  }
}

export default App;

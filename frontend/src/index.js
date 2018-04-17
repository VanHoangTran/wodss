import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import Root from './components/Root';
import allReducers from './reducers';
import {loadState, saveState} from './util/localState';
import {Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {appTheme} from "./util/constants";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './components/login/Login';
import {Switch} from 'react-router-dom';
import SignUp from './components/sign-up/SignUp'
import MatchList from './components/match-list/MatchList';
import PrivateRoute from './components/private-route/PrivateRoute';

const persistedState = loadState();

const store = createStore(
    allReducers,
    persistedState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

const requireAuth = (nextState, replace) => {
  alert("asdasd");
}

store.subscribe(() => {
  saveState(store.getState());
});

render(
  <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
    <Provider store={store}>
        <Router>
          <Switch>      
            <Route exact path="/" component={Root}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <PrivateRoute path="/list" component={MatchList}/>
          </Switch>
        </Router>
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('root')
)

registerServiceWorker();

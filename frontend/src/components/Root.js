import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './app/App'
import Login from './login/Login'
import Header from './header/Header'

const Root = ({ store }) => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
    </Switch>
  </div>
);

export default Root
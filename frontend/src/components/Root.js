import React from 'react'
import {Route, Switch} from 'react-router-dom'
import App from './app/App'
import Login from './login/Login'
import Header from './header/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {appTheme} from "../styles/AppTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import "./Root.css";

const Root = ({store}) => (
    <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signUp" component={Login}/>
                <Route exact path="/resetPassword" component={Login}/>
            </Switch>
        </div>
    </MuiThemeProvider>
);

export default Root
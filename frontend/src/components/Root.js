import React from 'react';
import App from './app/App';
import Login from './login/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {appTheme} from "../constants";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import "./Root.css";

function ValidateAuth(props) {
    // TODO: do magic here...
    let loggedIn = true;

    if (loggedIn) {
        return <App/>;
    } else {
        return <Login/>;
    }
}

const Root = ({store}) => (
    <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
        <div>
            <ValidateAuth/>
        </div>
    </MuiThemeProvider>
);

export default Root
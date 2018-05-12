import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {appTheme} from "../util/constants";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import "./Root.css";
import MatchList from "./match-list/MatchList";

class Root extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
                <MatchList/>
            </MuiThemeProvider>
        );
    }
}

export default Root;
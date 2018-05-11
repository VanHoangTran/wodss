import React, {Component} from 'react';
import App from './app/App';
import Login from './login/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {appTheme} from "../util/constants";
import {connect} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import "./Root.css";
import Counter from "./counter/Counter";
import Match from "./match/Match";
import LoggedOutApp from "./logged-out-app/LoggedOutApp";
import MatchList from "./match-list/MatchList";
import SignUp from "./sign-up/SignUp";
import ResetPassword from "./reset-password/ResetPassword";
import SetPassword from "./set-password/SetPassword";
import EditProfile from "./edit-profile/EditProfile";

class Root extends Component {

    render() {
        let authenticated = false;

        if (this.props.user && this.props.user.authenticationState.authenticated === true) {
            authenticated = true;
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
                <div>
                    {authenticated === true ? <EditProfile/> : <EditProfile/>}
                </div>
            </MuiThemeProvider>
        );
    }
}

// subscribe user's authentication state
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(Root);
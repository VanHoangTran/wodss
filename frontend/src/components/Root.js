import React, {Component} from 'react';
import App from './app/App';
import Login from './login/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {appTheme} from "../util/constants";
import {connect} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import "./Root.css";

class Root extends Component {

    render() {

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
                <div>
                    {this.props.authenticationState === true ? <App/> : <Login/>}                   
                </div>
            </MuiThemeProvider>
        );
    }
}

// subscribe user's authentication state
const mapStateToProps = state => {
    return {
        authenticationState: state.user.authenticationState
    }
}

export default connect(mapStateToProps, {})(Root);
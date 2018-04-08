import React, {Component} from 'react';
import App from './app/App';
import Login from './login/Login';
import {connect} from 'react-redux';
import "./Root.css";

class Root extends Component {

    render() {
        let authenticated = false;

        if (this.props.user && this.props.user.authenticationState.authenticated === true) {
            authenticated = true;
        }

        return (
            <div>
                Hallo Welt, hier wäre die APP (geschützter Bereich)
            </div>
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
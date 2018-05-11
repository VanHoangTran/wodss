import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Route} from 'react-router-dom';
import {pages} from "../../util/constants";

class PrivateRoute extends Route {
    render() {
        let authenticated = this.props.token !== null;

        if (authenticated) {
            let Component = this.props.component;
            return <Component/>;
        } else {
            return <Redirect to={pages.login}/>;
        }
    }
}

// subscribe user's authentication state
const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, {})(PrivateRoute);
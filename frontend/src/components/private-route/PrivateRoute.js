import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Route} from 'react-router-dom';

const authenticated = false;

class PrivateRoute extends Route {
  render() {
    let authenticated = this.props.user && this.props.user.authenticationState.authenticated === true;

    if (authenticated) {
      let Component = this.props.component;
      return <Component />;
    } else {
      return <Redirect to='/login' />;
    }
  }
}

// subscribe user's authentication state
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(PrivateRoute);
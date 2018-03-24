import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
import {colors, dimensions} from "../../constants";
import {Link} from "react-router-dom";
import {strings} from "../../strings";
import {apiAuthenticate, updateCredentials} from '../../actions/user-actions';
import {connect} from 'react-redux';

const styles = {
    card: {
        display: 'inline-block',
    },
    cardHeader: {
        backgroundColor: colors.primaryColor,
        color: colors.light,
    },
    textField: {
        borderColor: colors.primaryColor,
        color: colors.primaryColor,
    },
    button: {
        marginTop: dimensions.bigSpacing,
        width: '100%',
    },
    actionLinksContainer: {
        marginTop: dimensions.defaultSpacing,
        color: colors.hint,
    },
};

class Login extends Component {

    render() {
        return (
            <Card style={styles.card}>
                <CardHeader title={strings.login} style={styles.cardHeader} titleColor={styles.cardHeader}/>
                <CardText>
                  <div>{this.props.user.authenticationFailure ? 'auth failed' : ''}</div>
                    <TextField
                        id="username"
                        floatingLabelText={strings.userName}
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                        onChange={this.onUpdateCredentials}
                    />
                    <br/>
                    <TextField
                        id="password"
                        floatingLabelText={strings.password}
                        type="password"
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                        onChange={this.onUpdateCredentials}
                    />
                    <br/>
                    <RaisedButton label="OK" onClick={this.authenticate} primary={true} style={styles.button}/>
                    <div style={styles.actionLinksContainer}>
                        <span>{strings.forgotPassword} </span>
                        <Link exact to="/resetPassword">{strings.resetPassword}</Link>
                        <br/>
                        <span>{strings.noAccountYet} </span>
                        <Link exact to="/signUp">{strings.signUp}</Link>
                    </div>
                </CardText>
            </Card>
        );
    }

    constructor(props) {
        super(props);

        this.authenticate = this.authenticate.bind(this);
        this.onUpdateCredentials = this.onUpdateCredentials.bind(this);
    }

    // update local state by user's input
    onUpdateCredentials(event) {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        this.props.onUpdateCredentials(username, password);
    }

    // send login request to api
    authenticate(event) {
        let username = this.props.user.username;
        let password = this.props.user.password;
        this.props.authenticate(username, password);
    }

}

// subscribes store to Login.props
const mapStateToProps = state => {
  return {
    user : state.user,
    error: state.error
  }
}

const mapActionsToProps = {
    authenticate: apiAuthenticate,
    onUpdateCredentials: updateCredentials
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
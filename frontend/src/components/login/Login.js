import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {NavLink} from 'react-router-dom'
import {strings} from "../../strings";
import {apiAuthenticate} from '../../actions/user-actions';
import {connect} from 'react-redux';
import animate from 'animate.css'

const styles = {
    card: {
        width: dimensions.formCardWidth,
        margin: 'auto',
        marginTop: dimensions.formCardMarginTop,
    },
    cardHeader: {
        backgroundColor: colors.primaryColor,
    },
    cardBody: {
        padding: dimensions.bigSpacing,
        paddingTop: dimensions.defaultSpacing,
    },
    textField: {
        borderColor: colors.primaryColor,
        color: colors.primaryColor,
        width: '100%',
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

class Login extends React.Component {

    render() {

        return (
            <Card id="loginForm" style={styles.card}>
                <CardHeader title={strings.login} style={styles.cardHeader} titleColor={colors.light}/>
                <CardText style={styles.cardBody}>
                    <TextField
                        id="username"
                        style={styles.textField}
                        floatingLabelText={strings.username}
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                        onChange={this.onUpdateCredentials}
                    />
                    <br/>
                    <TextField
                        id="password"
                        type="password"
                        style={styles.textField}
                        floatingLabelText={strings.password}
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                        onChange={this.onUpdateCredentials}
                    />
                    <br/>
                    <RaisedButton label="OK" onClick={this.authenticate} primary={true} style={styles.button}/>
                    <div style={styles.actionLinksContainer}>
                        <span>{strings.forgotPassword} </span>
                        <NavLink exact to="/resetPassword">{strings.resetPassword}</NavLink>
                        <br/>
                        <span>{strings.noAccountYet} </span>
                        <NavLink exact to="/signUp">{strings.signUp}</NavLink>
                    </div>
                </CardText>
            </Card>
        );
    }

    constructor(props) {
        super(props);

        this.authenticate = this.authenticate.bind(this);
    }

    // send login request to api
    authenticate(event) {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        this.props.authenticate(username, password);
    }

}

// subscribes store to Login.props
const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapActionsToProps = {
    authenticate: apiAuthenticate
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
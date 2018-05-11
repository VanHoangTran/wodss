import React from "react";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {RaisedButton, TextField} from "material-ui";
import {colors, dimensions, pages} from "../../util/constants";
import {NavLink} from "react-router-dom"
import {strings} from "../../strings";
import {apiAuthenticate} from "../../actions/user-actions";
import {connect} from "react-redux";
import "animate.css";

const styles = {
    card: {
        width: dimensions.formCardWidth,
        margin: "auto",
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
        width: "100%",
    },
    button: {
        marginTop: dimensions.bigSpacing,
        width: "100%",
    },
    actionLinksContainer: {
        marginTop: dimensions.defaultSpacing,
        color: colors.hint,
    },
};

class Login extends React.Component {
    message = null;

    componentWillReceiveProps(nextProps) {
        let loginSuccessful = nextProps.user.authenticationState.authenticated;
        if (loginSuccessful) {
            this.onLoginSuccessful();
        } else {
            this.onLoginFailed();
        }
    }

    render() {

        return (
            <Card style={styles.card}
                  onAnimationEnd={this.onAnimationEnd}
                  className={this.state.failAnimationActive ? "shake animated" : ""}>
                <CardHeader title={strings.login} style={styles.cardHeader} titleColor={colors.light}/>
                <CardText style={styles.cardBody}>
                    <TextField style={styles.textField}
                               value={this.state.username}
                               onChange={this.onUsernameChanged}
                               onKeyPress={this.onKeyPress}
                               floatingLabelText={strings.username}
                               underlineFocusStyle={styles.textField}
                               floatingLabelFocusStyle={styles.textField}
                    />
                    <br/>
                    <TextField style={styles.textField}
                               value={this.state.password}
                               onChange={this.onPasswordChanged}
                               type="password"
                               floatingLabelText={strings.password}
                               onKeyPress={this.onKeyPress}
                               underlineFocusStyle={styles.textField}
                               floatingLabelFocusStyle={styles.textField}
                    />
                    <br/>
                    <RaisedButton style={styles.button}
                                  label={strings.ok}
                                  primary={true}
                                  onClick={this.authenticate}
                                  disabled={this.state.loginOngoing}
                    />
                    <div style={styles.actionLinksContainer}>
                        <span>{strings.forgotPassword} </span>
                        <NavLink exact to={pages.resetPassword}>{strings.resetPassword}</NavLink>
                        <br/>
                        <span>{strings.noAccountYet} </span>
                        <NavLink exact to={pages.signUp}>{strings.signUp}</NavLink>
                    </div>
                </CardText>
            </Card>
        );
    }

    constructor(props) {
        super(props);
        this.authenticate = this.authenticate.bind(this);

        this.state = {
            username: "",
            password: "",
            failAnimationActive: false,
            loginOngoing: false,
        };
    }

    onUsernameChanged = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    onPasswordChanged = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    // send login request to api
    authenticate() {
        this.props.authenticate(this.state.username, this.state.password);
        this.setState({
            loginOngoing: true,
        });
    }

    onLoginSuccessful() {
        this.props.history.push(pages.matchList);
    }

    onLoginFailed() {
        this.setState({
            password: "",
            failAnimationActive: true,
            loginOngoing: false,
        });
    }

    onKeyPress = (event) => {
        if (event.key === "Enter") {
            this.authenticate();
        }
    };

    onAnimationEnd = () => {
        this.setState({
            failAnimationActive: false,
        });
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
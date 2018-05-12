import React, {Component} from "react";
import {Card, CardHeader, CardText, Dialog, FlatButton, RaisedButton, TextField} from "material-ui";
import {colors, dimensions, pages} from "../../util/constants";
import {strings} from "../../strings";
import {getAvatarUrl} from "../../util/avatarUtil";
import "animate.css";
import {connect} from "react-redux";
import {apiRegister} from "../../actions/registration-actions";

const styles = {
    card: {
        width: '46rem',
        margin: 'auto',
        marginTop: dimensions.formCardMarginTop,
    },
    cardHeader: {
        backgroundColor: colors.primaryColor,
    },
    cardBody: {
        padding: 0,
        textAlign: 'center',
    },
    avatar: {
        display: 'inline-block',
        margin: dimensions.bigSpacing,
        marginRight: 0,
        width: '20rem',
        borderRadius: '10rem',
    },
    form: {
        display: 'inline-block',
        width: '20rem',
        padding: dimensions.bigSpacing,
        paddingTop: dimensions.defaultSpacing,
        textAlign: 'left',
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
};

const MAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/;
const PASSWORD_REGEX = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}/;

class Registration extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);

        this.state = {
            username: "",
            mail: "",
            password: "",
            passwordConfirmation: "",
            avatarUrl: getAvatarUrl(),

            usernameInvalid: false,
            mailInvalid: false,
            passwordInvalid: false,
            passwordConfirmationInvalid: false,
            formInvalid: true,

            loginOngoing: false,
            failAnimationActive: false,

            dialogOpen: false,
            errorMessage: "",
        };
    }

    componentWillReceiveProps(nextProps) {
        let registrationSuccessful = nextProps.registration.successful;
        if (registrationSuccessful) {
            this.onRegistrationSuccessful();
        } else {
            this.onRegistrationFailed();
        }
    }

    register() {
        this.props.register(this.state.username, this.state.password, this.state.mail);
        this.setState({
            loginOngoing: true,
        });
    };

    onRegistrationSuccessful() {
        this.props.history.push(pages.root);
    }

    onRegistrationFailed() {
        this.setState({
            username: "",
            mail: "",
            password: "",
            passwordConfirmation: "",
            avatarUrl: getAvatarUrl(),

            loginOngoing: false,
            failAnimationActive: true,

            dialogOpen: true,
            errorMessage: this.props.registration.responseText,
        }, this.handleSubmitButton);
    }

    onUsernameChanged = (event) => {
        let username = event.target.value.trim();
        this.setState({
            username: username,
            usernameInvalid: username.length === 0 || username.length > 50,
            avatarUrl: getAvatarUrl(username),
        }, this.handleSubmitButton);
    };

    onMailChanged = (event) => {
        let mail = "" + event.target.value.trim();
        this.setState({
            mail: mail,
            mailInvalid: !MAIL_REGEX.test(mail.toUpperCase()),
        }, this.handleSubmitButton);
    };

    onPasswordChanged = (event) => {
        let password = event.target.value;
        this.setState({
            password: password,
            passwordInvalid: !PASSWORD_REGEX.test(password),
            passwordConfirmationInvalid: password !== this.state.passwordConfirmation,
        }, this.handleSubmitButton);
    };

    onPasswordConfirmationChanged = (event) => {
        let passwordConfirmation = event.target.value;
        let passwordConfirmationInvalid = passwordConfirmation !== this.state.password;
        this.setState({
            passwordConfirmation: passwordConfirmation,
            passwordConfirmationInvalid: passwordConfirmationInvalid
        }, this.handleSubmitButton);
    };

    handleSubmitButton() {
        let formInvalid = this.state.loginOngoing
            || (
                this.state.usernameInvalid
                || this.state.mailInvalid
                || this.state.passwordInvalid
                || this.state.passwordConfirmationInvalid
            );
        this.setState({
            formInvalid: formInvalid,
        });
    };

    onKeyPress = (event) => {
        if (event.key === "Enter") {
            this.register();
        }
    };

    onAnimationEnd = () => {
        this.setState({
            failAnimationActive: false,
        });
    };

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
        });
    };

    render() {
        const actions = [
            <FlatButton
                label={strings.ok}
                primary={true}
                onClick={this.handleCloseDialog}
            />,
        ];
        return (
            <div>
                <Card className={this.state.failAnimationActive ? "shake animated" : ""}
                      onAnimationEnd={this.onAnimationEnd}
                      style={styles.card}>
                    <CardHeader title={strings.registration} style={styles.cardHeader} titleColor={colors.light}/>
                    <CardText style={styles.cardBody}>
                        <img src={this.state.avatarUrl}
                             style={styles.avatar}
                             alt=""/>
                        <div style={styles.form}>
                            <TextField value={this.state.username}
                                       onChange={this.onUsernameChanged}
                                       errorText={this.state.usernameInvalid ? strings.usernameInvalid : ""}
                                       onKeyPress={this.onKeyPress}
                                       style={styles.textField}
                                       floatingLabelText={strings.username}
                                       underlineFocusStyle={styles.textField}
                                       floatingLabelFocusStyle={styles.textField}/>
                            <br/>
                            <TextField value={this.state.mail}
                                       onChange={this.onMailChanged}
                                       errorText={this.state.mailInvalid ? strings.mailInvalid : ""}
                                       onKeyPress={this.onKeyPress}
                                       style={styles.textField}
                                       floatingLabelText={strings.mail}
                                       underlineFocusStyle={styles.textField}
                                       floatingLabelFocusStyle={styles.textField}/>
                            <br/>
                            <TextField value={this.state.password}
                                       onChange={this.onPasswordChanged}
                                       errorText={this.state.passwordInvalid ? strings.passwordInvalid : ""}
                                       onKeyPress={this.onKeyPress}
                                       type="password"
                                       style={styles.textField}
                                       floatingLabelText={strings.password}
                                       underlineFocusStyle={styles.textField}
                                       floatingLabelFocusStyle={styles.textField}/>
                            <br/>
                            <TextField value={this.state.passwordConfirmation}
                                       onChange={this.onPasswordConfirmationChanged}
                                       errorText={this.state.passwordConfirmationInvalid ? strings.confirmPasswordInvalid : ""}
                                       onKeyPress={this.onKeyPress}
                                       type="password"
                                       style={styles.textField}
                                       floatingLabelText={strings.confirmPassword}
                                       underlineFocusStyle={styles.textField}
                                       floatingLabelFocusStyle={styles.textField}/>
                            <br/>
                            <RaisedButton label={strings.ok}
                                          onClick={this.register}
                                          disabled={this.state.formInvalid}
                                          primary={true}
                                          style={styles.button}/>
                        </div>
                    </CardText>
                </Card>
                <Dialog
                    title={strings.errorOccurred}
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleCloseDialog}>
                    {this.state.errorMessage}
                </Dialog>
            </div>
        );
    }
}

// subscribes store to Login.props
const mapStateToProps = state => {
    return {
        registration: state.registration
    }
};

const mapActionsToProps = {
    register: apiRegister
};

export default connect(mapStateToProps, mapActionsToProps)(Registration);
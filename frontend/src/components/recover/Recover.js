import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, CardHeader, CardText, Dialog, FlatButton, RaisedButton, TextField} from "material-ui";
import {colors, dimensions, pages, PASSWORD_REGEX} from "../../util/constants";
import {strings} from "../../strings";
import "animate.css";
import {apiCompleteRecovery} from "../../actions/recovery-actions";

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
        width: '20rem',
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
};

class Recover extends Component {
    constructor(props) {
        super(props);
        this.completeRecovery = this.completeRecovery.bind(this);

        // parse recovery token from current URL
        let recoveryToken = this.props.history.location.pathname.replace(pages.recover + "/", "");
        this.state = {
            recoveryToken: recoveryToken,
            password: "",
            passwordConfirmation: "",

            formInvalid: true,
            passwordInvalid: false,
            passwordConfirmationInvalid: false,

            recoveryOngoing: false,
            recoverySuccessfully: false,

            failAnimationActive: true,

            dialogOpen: false,
            errorMessage: "",
        };
    }

    componentWillReceiveProps(nextProps) {
        let completed = nextProps.recovery.completed;
        if (completed) {
            this.handleRecoverySuccessful();
        } else {
            this.handleRecoveryFailed();
        }
    }

    completeRecovery() {
        this.props.completeRecovery(this.state.recoveryToken, this.state.password);
        this.setState({
            recoveryOngoing: true,
        }, this.handleSubmitButton);
    }

    handleRecoverySuccessful() {
        this.props.history.push(pages.login + pages.paramRecovered);
    }

    handleRecoveryFailed() {
        this.setState({
            password: "",
            passwordConfirmation: "",

            formInvalid: true,

            recoveryOngoing: false,
            failAnimationActive: true,

            dialogOpen: true,
            errorMessage: this.props.recovery.responseText,
        }, this.handleSubmitButton);
    }

    onPasswordChanged = (event) => {
        let password = event.target.value;
        this.setState({
            password: password,
            passwordInvalid: !PASSWORD_REGEX.test(password),
        }, this.handleSubmitButton);

        if (this.state.passwordConfirmation.length > 0) {
            this.setState({
                passwordConfirmationInvalid: password !== this.state.passwordConfirmation,
            }, this.handleSubmitButton);
        }
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
        this.setState({
            formInvalid: this.state.recoveryOngoing
            || (this.state.passwordInvalid || this.state.passwordConfirmationInvalid)
            || (this.state.password.length === 0 || this.state.passwordConfirmation.length === 0),
        });
    };

    onKeyPress = (event) => {
        if (event.key === "Enter" && !this.state.formInvalid) {
            this.completeRecovery();
        }
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
                keyboardFocused={true}
                onClick={this.handleCloseDialog}
            />,
        ];
        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader title={strings.setPassword} style={styles.cardHeader} titleColor={colors.light}/>
                    <CardText style={styles.cardBody}>
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
                                      onClick={this.completeRecovery}
                                      disabled={this.state.formInvalid}
                                      primary={true}
                                      style={styles.button}/>
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

const mapStateToProps = state => {
    return {
        recovery: state.recovery
    }
};

const mapActionsToProps = {
    completeRecovery: apiCompleteRecovery
};

export default connect(mapStateToProps, mapActionsToProps)(Recover);

import React, {Component} from "react";
import {Card, CardHeader, CardText, RaisedButton, TextField} from 'material-ui';
import {colors, dimensions, MAIL_REGEX, pages} from "../../util/constants";
import {strings} from "../../strings";
import {getAvatarUrl} from "../../util/avatarUtil";
import {connect} from "react-redux";
import {apiInitiateRecovery} from "../../actions/recovery-actions";

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

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.initiateRecovery = this.initiateRecovery.bind(this);

        this.state = {
            username: "",
            mail: "",

            usernameInvalid: false,
            mailInvalid: false,

            resetOngoing: false,
            failAnimationActive: false,

            dialogOpen: false,
            errorMessage: "",
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        let initiated = nextProps.recovery.initiated;
        if (initiated) {
            this.handleRecoveryInitiationSuccessful();
        } else {
            this.handleRecoveryInitiationFailed();
        }
    }

    handleRecoveryInitiationSuccessful() {
        this.props.history.push(pages.login + pages.paramRecoveryInitiated);
    }

    handleRecoveryInitiationFailed() {
        this.setState({
            username: "",
            mail: "",
            failAnimationActive: true,
            resetOngoing: false,
        });
    }

    initiateRecovery() {
        this.props.initiateRecovery(this.state.username, this.state.mail);
        this.setState({
            resetOngoing: true,
        }, this.handleSubmitButton);
    };

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

    onKeyPress = (event) => {
        if (event.key === "Enter" && !this.state.formInvalid) {
            this.initiateRecovery();
        }
    };

    onAnimationEnd = () => {
        this.setState({
            failAnimationActive: false,
        });
    };

    render() {
        return (
            <Card className={this.state.failAnimationActive ? "shake animated" : ""}
                  onAnimationEnd={this.onAnimationEnd}
                  style={styles.card}>
                <CardHeader title={strings.resetPassword} style={styles.cardHeader} titleColor={colors.light}/>
                <CardText style={styles.cardBody}>
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
                    <RaisedButton label={strings.ok}
                                  onClick={this.initiateRecovery}
                                  primary={true}
                                  disabled={this.state.resetOngoing}
                                  style={styles.button}/>
                </CardText>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        recovery: state.recovery
    }
};

const mapActionsToProps = {
    initiateRecovery: apiInitiateRecovery
};

export default connect(mapStateToProps, mapActionsToProps)(ResetPassword);

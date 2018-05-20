import React, {Component} from 'react'
import {Card, CardHeader, CardText, Dialog, FlatButton, RaisedButton, TextField} from "material-ui";
import {colors, dimensions, PASSWORD_REGEX} from "../../util/constants";
import {strings} from "../../strings";
import {Col, Row} from "react-grid-system";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {apiGetAccountInformation} from "../../actions/user-actions";
import {getAvatarUrl} from "../../util/imageUtil";
import {apiChangePassword} from "../../actions/password-change-actions";

const styles = {
    card: {},
    cardHeader: {
        backgroundColor: colors.primaryColor,
    },
    cardBody: {
        padding: dimensions.bigSpacing,
    },
    cardBodyForm: {
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
    avatar: {
        display: 'inline-block',
        width: '100%',
        borderRadius: '50%',
        marginBottom: dimensions.defaultSpacing,
    },
    row: {
        margin: '0px',
        padding: dimensions.smallSpacing,
        justifyContent: "center",
    },
    col: {
        padding: dimensions.smallSpacing,
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);
        this.getAccountInformation = this.getAccountInformation.bind(this);
        this.changePassword = this.changePassword.bind(this);

        this.state = {
            password: "",
            passwordConfirmation: "",

            passwordInvalid: false,
            passwordConfirmationInvalid: false,
            formInvalid: true,

            passwordChangeOngoing: false,

            dialog: {
                open: false,
                title: "",
                message: "",
            },
            dialogOpen: false,
            errorMessage: "",

            constructionTime: new Date(),
        };

        this.getAccountInformation();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.passwordChange.successful !== undefined) {
            if (this.state.constructionTime < nextProps.passwordChange.responseTime) {
                let successful = nextProps.passwordChange.successful;

                this.setState({
                    password: "",
                    passwordConfirmation: "",

                    formInvalid: true,

                    passwordChangeOngoing: false,

                    dialog: {
                        open: true,
                        title: successful ? strings.passwordChanged : strings.errorOccurred,
                        message: successful ? strings.passwordChangedSuccessfully : this.props.passwordChange.responseText,
                    },
                }, this.handleSubmitButton);

                if (successful) {
                    this.handlePasswordChangeSuccessful();
                } else {
                    this.handlePasswordChangeFailed();
                }
            }
        }
    }

    getAccountInformation() {
        this.props.getAccountInformation();
    }

    changePassword() {
        this.setState({
            passwordChangeOngoing: true,
        }, this.handleSubmitButton);

        this.props.changePassword(this.state.password);
    }

    handlePasswordChangeSuccessful() {
    }

    handlePasswordChangeFailed() {
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
            formInvalid: this.state.passwordChangeOngoing
            || (
                this.state.passwordInvalid
                || this.state.passwordConfirmationInvalid
            )
            || (
                this.state.password.length === 0
                || this.state.passwordConfirmation.length === 0
            ),
        });
    };

    onKeyPress = (event) => {
        if (event.key === "Enter" && !this.state.formInvalid) {
            this.changePassword();
        }
    };

    handleCloseDialog = () => {
        this.setState({

            dialog: {
                open: false,
            },
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
            <Row style={styles.row}>
                <Col xs={12} sm={6} md={4} lg={3} xl={3} style={styles.col}>
                    <Card style={styles.card}>
                        <CardHeader title={strings.userInformation} style={styles.cardHeader}
                                    titleColor={colors.light}/>
                        <CardText style={styles.cardBody}>
                            <img style={styles.avatar}
                                 src={getAvatarUrl(this.props.user.username)}
                                 alt=""/>
                            {this.props.user.username}<br/>
                            {this.props.user.mail}
                        </CardText>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} xl={4} style={styles.col}>
                    <Card style={styles.card}>
                        <CardHeader title={strings.changePassword} style={styles.cardHeader} titleColor={colors.light}/>
                        <CardText style={styles.cardBodyForm}>
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
                            <RaisedButton label={strings.changePassword}
                                          onClick={this.changePassword}
                                          disabled={this.state.formInvalid}
                                          primary={true}
                                          style={styles.button}/>
                        </CardText>
                    </Card>
                </Col>
                <Dialog
                    title={this.state.dialog.title}
                    actions={actions}
                    modal={false}
                    open={this.state.dialog.open}
                    onRequestClose={this.handleCloseDialog}>
                    {this.state.dialog.message}
                </Dialog>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        passwordChange: state.passwordChange,
    }
};

const mapActionsToProps = {
    getAccountInformation: apiGetAccountInformation,
    changePassword: apiChangePassword,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Profile));

import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
import {colors} from "../../styles/colors";
import {dimensions} from "../../styles/dimensions";
import {Link} from "react-router-dom";
import {strings} from "../../strings";

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
                    <TextField
                        floatingLabelText={strings.userName}
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                    />
                    <br/>
                    <TextField
                        floatingLabelText={strings.password}
                        type="password"
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                    />
                    <br/>
                    <RaisedButton label="OK" primary={true} style={styles.button}/>
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
}

export default Login;
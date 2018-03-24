import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
import {colors, dimensions} from "../../constants";
import {NavLink} from "react-router-dom";
import {strings} from "../../strings";
import Divider from 'material-ui/Divider';

const styles = {
    card: {
        display: 'inline-block',
        marginTop: '10rem',
        marginLeft: '20rem',
    },
    cardHeader: {
        backgroundColor: colors.primaryColor,
    },
    cardBody: {
        padding: 0,
        textAlign: 'center',
    },
    avatar: {
        margin: dimensions.bigSpacing,
        marginRight: 0,
        float: 'left',
        width: '20rem',
        borderRadius: '10rem',
    },
    form: {
        width: '20rem',
        padding: dimensions.bigSpacing,
        paddingTop: 0,
        float: 'left',
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

class SignUp extends Component {

    render() {
        return (
            <Card style={styles.card}>
                <CardHeader title={strings.signUp} style={styles.cardHeader} titleColor={colors.light}/>
                <CardText style={styles.cardBody}>
                    <img id="avatar" style={styles.avatar} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89x8AAuEB74Y0o2cAAAAASUVORK5CYII="/>
                    <div style={styles.form}>
                        <TextField
                            style={styles.textField}
                            floatingLabelText={strings.username}
                            underlineFocusStyle={styles.textField}
                            floatingLabelFocusStyle={styles.textField}
                            onChange={this.onUsernameChanged}
                        />
                        <br/>
                        <TextField
                            style={styles.textField}
                            floatingLabelText={strings.mail}
                            underlineFocusStyle={styles.textField}
                            floatingLabelFocusStyle={styles.textField}
                            onChange={this.onUpdateCredentials}
                        />
                        <br/>
                        <TextField
                            style={styles.textField}
                            floatingLabelText={strings.password}
                            type="password"
                            underlineFocusStyle={styles.textField}
                            floatingLabelFocusStyle={styles.textField}
                            onChange={this.onUserNameChanged}
                        />
                        <br/>
                        <TextField
                            style={styles.textField}
                            floatingLabelText={strings.confirmPassword}
                            type="password"
                            underlineFocusStyle={styles.textField}
                            floatingLabelFocusStyle={styles.textField}
                            onChange={this.onUpdateCredentials}
                        />
                        <br/>
                        <RaisedButton label="OK" onClick={this.authenticate} primary={true} style={styles.button}/>
                    </div>
                </CardText>
            </Card>
        );
    }

    onUsernameChanged(event) {
        document.getElementById('avatar').src = 'https://api.adorable.io/avatars/500/' + event.target.value + '.png';
    };


}

export default SignUp
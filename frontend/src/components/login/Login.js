import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
import {primaryColor} from "../../styles/colors";

const styles = {
    card: {
        display: 'inline-block',
    },
    cardHeader: {
        backgroundColor: primaryColor,
    },
    textField: {
        borderColor: primaryColor,
        color: primaryColor,
    },
};

class Login extends Component {

    render() {
        return (
            <Card style={styles.card}>
                <CardHeader title="Login" style={styles.cardHeader} titleColor="white"/>
                <CardText>
                    <TextField
                        floatingLabelText="Benutzername"
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                    />
                    <br/>
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                    />
                </CardText>
                <CardActions>
                    <RaisedButton label="OK" primary={true}/>
                </CardActions>
            </Card>
        );
    }
}

export default Login;
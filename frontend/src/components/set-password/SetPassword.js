import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {strings} from "../../strings";

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

class SetPassword extends React.Component {

    render() {
        return (
            <Card style={styles.card}>
                <CardHeader title={strings.setPassword} style={styles.cardHeader} titleColor={colors.light}/>
                <CardText style={styles.cardBody}>
                    <TextField
                        style={styles.textField}
                        floatingLabelText={strings.password}
                        type="password"
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                    />
                    <br/>
                    <TextField
                        style={styles.textField}
                        floatingLabelText={strings.confirmPassword}
                        type="password"
                        underlineFocusStyle={styles.textField}
                        floatingLabelFocusStyle={styles.textField}
                    />
                    <RaisedButton label="OK" primary={true} style={styles.button}/>
                </CardText>
            </Card>
        );
    }
}

export default SetPassword
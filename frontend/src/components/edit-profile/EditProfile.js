import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {strings} from "../../strings";
import {Col, Row} from "react-grid-system";

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

class EditProfile extends React.Component {

    render() {
        return (
            <Row style={styles.row}>
                <Col xs={12} sm={6} md={4} lg={3} xl={3} style={styles.col}>
                    <Card style={styles.card}>
                        <CardHeader title={strings.userInformation} style={styles.cardHeader} titleColor={colors.light}/>
                        <CardText style={styles.cardBody}>
                            <img id="avatar" style={styles.avatar}
                                 alt=""
                                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89x8AAuEB74Y0o2cAAAAASUVORK5CYII="/>
                            Van Hoang Tran<br/>
                            hoang.tran@students.fhnw.ch
                        </CardText>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} xl={4} style={styles.col}>
                    <Card style={styles.card}>
                        <CardHeader title={strings.changePassword} style={styles.cardHeader} titleColor={colors.light}/>
                        <CardText style={styles.cardBodyForm}>
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
                            <RaisedButton label={strings.changePassword} primary={true} style={styles.button}/>
                        </CardText>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default EditProfile
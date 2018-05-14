import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, CardHeader, CardText, RaisedButton} from "material-ui";
import {apiLogout} from "../../actions/user-actions";
import {colors, dimensions, pages} from "../../util/constants";
import {strings} from "../../strings";
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
    button: {
        marginTop: dimensions.bigSpacing,
        width: "100%",
    },
};

class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.logout();
    }

    logout() {
        this.props.logout();
    }

    onButtonClick = () => {
        this.props.history.push(pages.root);
    };

    render() {
        return (
            <Card style={styles.card}>
                <CardHeader title={strings.logout} style={styles.cardHeader} titleColor={colors.light}/>
                <CardText style={styles.cardBody}>
                    <span>{strings.logoutSuccessfully}</span>
                    <br/>
                    <RaisedButton label={strings.ok}
                                  primary={true}
                                  onClick={this.onButtonClick}
                                  style={styles.button}/>
                </CardText>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapActionsToProps = {
    logout: apiLogout
};

export default connect(mapStateToProps, mapActionsToProps)(Logout);

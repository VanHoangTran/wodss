import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, CardHeader, CardText, CircularProgress, RaisedButton} from "material-ui";
import {colors, dimensions, pages} from "../../util/constants";
import {strings} from "../../strings";
import "animate.css";
import {apiActivate} from "../../actions/registration-actions";

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

class Activate extends Component {
    constructor(props) {
        super(props);
        this.activate = this.activate.bind(this);

        // parse activation token from current URL
        let activationToken = this.props.history.location.pathname.replace(pages.activate + "/", "");
        this.state = {
            activationToken: activationToken,
            activationOngoing: true,
            accountActivated: false,
        };

        this.activate();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activationOngoing: false,
            accountActivated: nextProps.registration.activated,
        });
    }

    activate() {
        this.props.activate(this.state.activationToken);
    }

    onButtonClick = () => {
        this.props.history.push(pages.root);
    };

    render() {
        return (
            <div>
                <CircularProgress style={{
                    margin: "auto",
                    marginTop: dimensions.formCardMarginTop,
                    display: this.state.activationOngoing ? "block" : "none"
                }}/>
                <div style={{display: this.state.activationOngoing ? "none" : "block"}}>
                    <Card style={styles.card}>
                        <CardHeader
                            title={this.state.accountActivated ? strings.accountActivated : strings.errorOccurred}
                            style={styles.cardHeader}
                            titleColor={colors.light}/>
                        <CardText style={styles.cardBody}>
                            <span>{this.state.accountActivated ? strings.accountActivatedSuccessfully : this.props.registration.responseText}</span>
                            <br/>
                            <RaisedButton label={strings.ok}
                                          primary={true}
                                          onClick={this.onButtonClick}
                                          style={styles.button}/>
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        registration: state.registration
    }
};

const mapActionsToProps = {
    activate: apiActivate
};

export default connect(mapStateToProps, mapActionsToProps)(Activate);

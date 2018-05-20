import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
    RaisedButton,
    TextField,
    TableRow,
    TableRowColumn,
    Divider,
    FlatButton,
    IconButton,
    DropDownMenu, MenuItem
} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {strings} from "../../strings";
import {connect} from 'react-redux';
import {Col, Row} from "react-grid-system";
import ReactTooltip from 'react-tooltip'
import "./Match.css"
import Bet from '../bet/Bet';
import {getAvatarUrl, getFlagImage} from "../../util/imageUtil";
import {withRouter} from "react-router";

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
};

class AdminGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: this.props.teams,
            game: this.props.game,
            home: this.props.game.home,
            away: this.props.game.away,
            homeGoals: this.props.game.homeGoals,
            awayGoals: this.props.game.awayGoals,

            inEditMode: false,

            backupHome: this.props.game.home,
            backupAway: this.props.game.away,
            backupHomeGoals: this.props.game.homeGoals,
            backupAwayGoals: this.props.game.awayGoals,
        };
    }

    handleHomeGoalsChange = (event) => {
        let value = this.formatGoalsValue(event.target.value);
        if (value === undefined) {
            // keep old value if new value not valid
            value = this.state.homeGoals;
        }
        this.changeHomeGoalsValue(value);
    };

    changeHomeGoalsValue(value) {
        this.setState({
            homeGoals: value,
        }, this.handleSubmitButton);
    }

    handleAwayGoalsChange = (event) => {
        let value = this.formatGoalsValue(event.target.value);
        if (value === undefined) {
            // keep old value if new value not valid
            value = this.state.homeGoals;
        }
        this.changeAwayGoalsValue(value);
    };

    changeAwayGoalsValue(value) {
        this.setState({
            awayGoals: value,
        }, this.handleSubmitButton);
    }

    formatGoalsValue(value) {
        value = value.trim();

        // return empty value
        if (value.length === 0) {
            return "";
        }

        // return undefined if value not valid
        let intValue = parseInt(value, 10);
        if (("" + intValue) !== value && ("0" + intValue) !== value) {
            return undefined;
        } else if (intValue < 0 || intValue > 20) {
            return undefined;
        }

        // return valid value
        return intValue;
    }

    handleHomeGoalsKeyPress = (event) => {
        if (event.key === "Enter") {
        }
    };

    handleAwayGoalsKeyPress = (event) => {
        if (event.key === "Enter") {
        }
    };

    handleEditButtonClick = () => {
        this.setState({
            inEditMode: true,
            backupHomeGoals: this.state.homeGoals,
            backupAwayGoals: this.state.awayGoals,
        }, this.handleSubmitButton);
    };

    handleSaveButtonClick = () => {
        this.setState({
            inEditMode: false,
        }, this.handleSubmitButton);
    };

    handleCancelButtonClick = () => {
        this.setState({
            inEditMode: false,
            homeGoals: this.state.backupHomeGoals,
            awayGoals: this.state.backupAwayGoals,
        }, this.handleSubmitButton);
    };

    handleSubmitButton() {
    };


    formatDate(matchDate) {
        let date = matchDate.getDate();
        if (date < 10) {
            date = '0' + date;
        }
        let month = (matchDate.getMonth() + 1);
        if (month < 10) {
            month = '0' + month;
        }
        let minutes = (matchDate.getMinutes());
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return date + '.' + month + '.' + matchDate.getFullYear() + ' ' + matchDate.getHours() + ':' + minutes;
    }

    handleChange = (event, index, value) => {
        console.log(event);
        console.log(index);
        console.log(value);
    };

    render() {
        return (
            <div>
                <DropDownMenu value={this.state.home.countryFifaCode} onChange={this.handleChange}>
                    {this.props.teams.map((team) => {
                        return (<MenuItem key={team.countryFifaCode} value={team.countryFifaCode} primaryText={team.name}/>);
                    })}
                </DropDownMenu>
                <div className={"game-header"}>
                    <div className={"labels"}>
                        <span>{this.formatDate(new Date(this.state.game.date))}</span>
                        <span>{this.state.game.stadium.name} - {this.state.game.stadium.city}</span>
                    </div>
                    <div style={{display: this.state.inEditMode ? "none" : "block"}}>
                        <IconButton iconClassName="material-icons"
                                    onClick={this.handleEditButtonClick}>edit</IconButton>
                    </div>
                    <div style={{display: this.state.inEditMode ? "block" : "none"}}>
                        <IconButton iconClassName="material-icons"
                                    onClick={this.handleSaveButtonClick}>save</IconButton>
                        <IconButton iconClassName="material-icons"
                                    onClick={this.handleCancelButtonClick}>cancel</IconButton>
                    </div>
                </div>
                <Row className="row">
                    <Col xs={4.5} className="col country-name">
                        <img src={getFlagImage(this.state.game.home.countryFifaCode)} className="flag"/>
                        {this.state.game.home.name}
                    </Col>
                    <Col xs={1.5} className={"col goals"}>
                        <TextField value={this.state.homeGoals}
                                   onChange={this.handleHomeGoalsChange}
                                   onKeyPress={this.handleHomeGoalsKeyPress}
                                   disabled={!this.state.inEditMode}
                                   hintText={strings.goals}
                                   style={styles.textField}
                                   underlineFocusStyle={styles.textField}/>
                    </Col>
                    <Col xs={1.5} className={"col goals"}>
                        <TextField value={this.state.awayGoals}
                                   onChange={this.handleAwayGoalsChange}
                                   onKeyPress={this.handleAwayGoalsKeyPress}
                                   disabled={!this.state.inEditMode}
                                   hintText={strings.goals}
                                   style={styles.textField}
                                   underlineFocusStyle={styles.textField}/>
                    </Col>
                    <Col xs={4.5} className="col country-name right">
                        {this.state.game.away.name}
                        <img src={getFlagImage(this.state.game.away.countryFifaCode)} className="flag"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

function formatDate(matchDate) {
    let date = matchDate.getDate();
    if (date < 10) {
        date = '0' + date;
    }
    let month = (matchDate.getMonth() + 1);
    if (month < 10) {
        month = '0' + month;
    }
    let minutes = (matchDate.getMinutes());
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return date + '.' + month + '.' + matchDate.getFullYear() + ' ' + matchDate.getHours() + ':' + minutes;
}


const mapStateToProps = state => {
    return {}
};

export default withRouter(connect(mapStateToProps, {})(AdminGame));

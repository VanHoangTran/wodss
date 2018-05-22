import React, {Component} from 'react';
import {Dialog, DropDownMenu, FlatButton, IconButton, MenuItem, TextField} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {strings} from "../../strings";
import {connect} from 'react-redux';
import {Col, Row} from "react-grid-system";
import "./AdminGame.css"
import {getFlagImage} from "../../util/imageUtil";
import {withRouter} from "react-router";
import {apiPutGame} from "../../actions/admin-actions";

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

        this.handleChangeHomeTeam = this.handleChangeHomeTeam.bind(this);
        this.handleChangeAwayTeam = this.handleChangeAwayTeam.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.handleUpdateGameSuccessful = this.handleUpdateGameSuccessful.bind(this);

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

            showErrorDialog: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        let updatedGame = nextProps.admin.game;
        if (updatedGame.gameId === this.state.game.id) {
            let updateGameSuccessful = updatedGame.apiStatus === 200;
            if (updateGameSuccessful) {
                this.handleUpdateGameSuccessful(updatedGame);
            } else {
                this.handleUpdateGameFailed();
            }
        }
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
        });
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
        });
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
            backupHome: this.state.home,
            backupAway: this.state.away,
            backupHomeGoals: this.state.homeGoals,
            backupAwayGoals: this.state.awayGoals,
        });
    };

    handleSaveButtonClick = () => {
        this.setState({
            inEditMode: false,
            home: this.state.backupHome,
            away: this.state.backupAway,
            homeGoals: this.state.backupHomeGoals,
            awayGoals: this.state.backupAwayGoals,
        });
        this.updateGame();
    };

    handleCancelButtonClick = () => {
        this.setState({
            inEditMode: false,
            home: this.state.backupHome,
            away: this.state.backupAway,
            homeGoals: this.state.backupHomeGoals,
            awayGoals: this.state.backupAwayGoals,
        });
    };

    static formatDate(matchDate) {
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

    handleChangeHomeTeam(event, index, value) {
        let selectedTeam = this.props.teams[index];
        // check if both are the same team
        if (this.state.away.id === selectedTeam.id) {
            // swap teams
            this.setState({
                away: this.state.home
            });
        }
        this.setState({
            home: selectedTeam
        });
    };

    handleChangeAwayTeam(event, index, value) {
        let selectedTeam = this.props.teams[index];
        // check if both are the same team
        if (this.state.home.id === selectedTeam.id) {
            // swap teams
            this.setState({
                home: this.state.away
            });
        }

        this.setState({
            away: selectedTeam
        });
    };

    handleCloseDialog = () => {
        this.setState({
            showErrorDialog: false,
        });
    };

    handleUpdateGameSuccessful(updatedGame) {
        let homeTeam = this.props.teams.filter(function (team) {
            return team.id === updatedGame.homeId;
        })[0];
        let awayTeam = this.props.teams.filter(function (team) {
            return team.id === updatedGame.awayId;
        })[0];
        this.setState({
            home: homeTeam,
            away: awayTeam,
            homeGoals: updatedGame.homeGoals,
            awayGoals: updatedGame.awayGoals,

            backupHome: homeTeam,
            backupAway: awayTeam,
            backupHomeGoals: updatedGame.homeGoals,
            backupAwayGoals: updatedGame.awayGoals,
        });
    }

    handleUpdateGameFailed() {
        this.setState({
            showErrorDialog: true,
        });
    }

    updateGame() {
        this.props.putGame(this.state.game.id, this.state.home.id, this.state.away.id, this.state.homeGoals, this.state.awayGoals);
    }

    render() {
        return (
            <div>
                <div className={"game-header"}>
                    <div className={"labels"}>
                        <span>{AdminGame.formatDate(new Date(this.state.game.date))}</span>
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
                        <img src={getFlagImage(this.state.home.countryFifaCode)} className="flag" alt={""}/>
                        <DropDownMenu value={this.state.home.countryFifaCode}
                                      onChange={this.handleChangeHomeTeam}
                                      disabled={!this.state.inEditMode}
                                      className={"dropdown-team"}>
                            {this.props.teams.map((team) => {
                                return (<MenuItem key={team.countryFifaCode}
                                                  value={team.countryFifaCode}
                                                  primaryText={team.name}/>);
                            })}
                        </DropDownMenu>
                    </Col>
                    <Col xs={1.5} className={"col goals"}>
                        <TextField value={this.state.homeGoals}
                                   onChange={this.handleHomeGoalsChange}
                                   onKeyPress={this.handleHomeGoalsKeyPress}
                                   disabled={!this.state.inEditMode}
                                   style={styles.textField}
                                   underlineFocusStyle={styles.textField}/>
                    </Col>
                    <Col xs={1.5} className={"col goals"}>
                        <TextField value={this.state.awayGoals}
                                   onChange={this.handleAwayGoalsChange}
                                   onKeyPress={this.handleAwayGoalsKeyPress}
                                   disabled={!this.state.inEditMode}
                                   style={styles.textField}
                                   underlineFocusStyle={styles.textField}/>
                    </Col>
                    <Col xs={4.5} className="col country-name right">
                        <DropDownMenu value={this.state.away.countryFifaCode}
                                      onChange={this.handleChangeAwayTeam}
                                      disabled={!this.state.inEditMode}
                                      className={"dropdown-team"}>
                            {this.props.teams.map((team) => {
                                return (<MenuItem key={team.countryFifaCode}
                                                  value={team.countryFifaCode}
                                                  primaryText={team.name}/>);
                            })}
                        </DropDownMenu>
                        <img src={getFlagImage(this.state.away.countryFifaCode)} className="flag" alt={""}/>
                    </Col>
                </Row>
                <Dialog
                    title={strings.errorOccurred}
                    actions={[
                        <FlatButton
                            label={strings.ok}
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleCloseDialog}
                        />
                    ]}
                    modal={false}
                    open={this.state.showErrorDialog}
                    onRequestClose={this.handleCloseDialog}>
                    {strings.failedToUpdateGame}
                </Dialog>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin,
    }
};

const mapActionsToProps = {
    putGame: apiPutGame
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(AdminGame));

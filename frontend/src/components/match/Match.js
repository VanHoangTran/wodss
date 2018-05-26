import React, {Component} from 'react';
import {Dialog, FlatButton, IconButton} from "material-ui";
import {strings} from "../../strings";
import {connect} from 'react-redux';
import "./Match.css"
import Bet from '../bet/Bet';
import {getFlagImage} from "../../util/imageUtil";
import {Col, Row} from "react-grid-system";
import GameStats from "../game-stats/GameStats";

class Match extends Component {


    constructor(props) {
        super(props);

        this.state = {
            dialog: undefined,
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    handleShowStatsButtonClick = () => {
        let dialogContent = (
            <GameStats game={this.props.match}/>
        );
        this.setState({
            dialog: {
                title: strings.stats,
                content: dialogContent,
            },
        });
    };

    handleCloseDialog = () => {
        this.setState({
            dialog: undefined,
        });
    };

    render() {
        let match = this.props.match;
        let matchDate = new Date(match.date);
        let points = '-';

        // check for points
        if (match.resultsEntered && !match.open) {
            let bet = this.props.betStore.bets.find(b => b.gameId === match.id);
            if (bet) {
                points = bet.points;
            }
        }

        return (
            <div className={"game"}>
                <div className={"game-header"}>
                    <div className={"labels"}>
                        <span>{formatDate(matchDate)}</span>
                        <span>{match.stadium.name} - {match.stadium.city}</span>
                    </div>
                    <IconButton iconClassName="material-icons" onClick={this.handleShowStatsButtonClick}>
                        insert_chart
                    </IconButton>
                </div>
                <Row className="row">
                    <Col xs={4.5} className="col country-name">
                        <img src={getFlagImage(match.home.countryFifaCode)} className="flag" alt={""}/>
                        <span className="team">{match.home.name}</span>
                    </Col>
                    <Col xs={3} className={"col goals"}>
                        <Bet matchId={match.id} open={match.open}/>
                    </Col>
                    <Col xs={4.5} className="col country-name right">
                        <span className="team">{match.away.name}</span>
                        <img src={getFlagImage(match.away.countryFifaCode)} className="flag" alt={""}/>
                    </Col>
                </Row>
                <Row className="row">
                    <Col xs={4.5}>
                        <span className="points">{strings.points}: {points}</span>
                    </Col>
                    <Col xs={3} className={"col goals"}>
                        <div className="result">
                            <span className="actual home">{!match.resultsEntered ? '-' : match.homeGoals}</span>
                            <span className="actual away">{!match.resultsEntered ? '-' : match.awayGoals}</span>
                        </div>
                    </Col>
                    <Col xs={4.5}>
                    </Col>
                </Row>

                {this.state.dialog &&
                <Dialog
                    title={this.state.dialog.title}
                    actions={[
                        <FlatButton
                            label={strings.ok}
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleCloseDialog}
                        />
                    ]}
                    modal={false}
                    open={!!this.state.dialog}
                    onRequestClose={this.handleCloseDialog}
                    bodyStyle={{padding: 0}}>
                    {this.state.dialog.content}
                </Dialog>
                }
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
    return {
        betStore: state.betStore
    }
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Match);
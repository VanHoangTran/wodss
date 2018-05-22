import React, {Component} from 'react';
import {TableRow, TableRowColumn} from "material-ui";
import {strings} from "../../strings";
import {connect} from 'react-redux';
import "./Match.css"
import Bet from '../bet/Bet';
import {getFlagImage} from "../../util/imageUtil";

class Match extends Component {

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
            <TableRow>
                <TableRowColumn width="30">
                    <img height="30" src={getFlagImage(match.home.countryFifaCode)} alt={""}/>
                </TableRowColumn>
                <TableRowColumn>
                    <span className="homeTeam">{match.home.name}</span>
                    <span className="points">{strings.points}: {points}</span>
                </TableRowColumn>
                <TableRowColumn className="matchResultRow">
                    <div className="centered">
                        <span className="date"><b>{formatDate(matchDate)}</b></span>
                        <span className="location">{match.stadium.name} ({match.stadium.city})</span>
                    </div>

                    <Bet matchId={match.id} open={match.open}/>

                    <div className="result">
                        <span className="actual">{match.resultsEntered === false ? '-' : match.homeGoals}</span>
                        <span className="actual">{match.resultsEntered === false ? '-' : match.awayGoals}</span>
                    </div>
                </TableRowColumn>
                <TableRowColumn className="awayTeam">{match.away.name}</TableRowColumn>
                <TableRowColumn width="30">
                    <img height="30" src={getFlagImage(match.away.countryFifaCode)} alt={""}/>
                </TableRowColumn>
            </TableRow>
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
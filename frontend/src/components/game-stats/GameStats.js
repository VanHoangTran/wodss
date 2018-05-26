import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./GameStats.css";
import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";
import {getFlagImage} from "../../util/imageUtil";
import {strings} from "../../strings";

class GameStats extends Component {

    render() {
        let game = this.props.game;
        let stats = game.betStats;
        return (
            <Table selectable={false}>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>{strings.gameResult}</TableHeaderColumn>
                        <TableHeaderColumn>{strings.tipsOfOtherUsers}</TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn className={"table-cell-flag"}>
                            <img src={getFlagImage(game.home.countryFifaCode)} className="flag" alt={""}/>
                            {strings.winner} {game.home.name}
                        </TableRowColumn>
                        <TableRowColumn>{stats.homeTeamWins}%</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn className={"table-cell-flag"}>
                            <img src={getFlagImage(game.away.countryFifaCode)} className="flag" alt={""}/>
                            {strings.winner} {game.away.name}
                        </TableRowColumn>
                        <TableRowColumn>{stats.awayTeamWins}%</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn className={"table-cell-flag"}>
                            <img src={getFlagImage()} className="flag" alt={""}/>
                            {strings.draw}
                        </TableRowColumn>
                        <TableRowColumn>{stats.draw}%</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(GameStats);
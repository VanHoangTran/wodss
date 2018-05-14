import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField, TableRow, TableRowColumn} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {strings} from "../../strings";
import {connect} from 'react-redux';
import {Col} from "react-grid-system";
import ReactTooltip from 'react-tooltip'
import "./Match.css"

class Match extends Component {
    
    constructor(props){
        super(props);
    }
    
    render() {
        let match = this.props.match;
        let matchDate = new Date(match.date);

        // set appropriate country icon for home and away team
        match.home.flagImageUrl = match.home.countryFifaCode != '' ? require('../../images/flags/' + match.home.countryFifaCode + '.svg') : undefined;
        match.away.flagImageUrl = match.away.countryFifaCode != '' ? require('../../images/flags/' + match.away.countryFifaCode + '.svg') : undefined;

        return (
            <TableRow>
                <TableRowColumn width="30"><img height="30" src={match.home.flagImageUrl} /></TableRowColumn>
                <TableRowColumn>{match.home.name}</TableRowColumn>
                <TableRowColumn className="matchResultRow">
                    <span className="actual">1</span>
                    <span className="bet">2</span>
                </TableRowColumn>
                <TableRowColumn class="matchResultRow">
                    <span className="actual">1</span>
                    <span className="bet">2</span>
                </TableRowColumn>
                <TableRowColumn>{match.away.name}</TableRowColumn>
                <TableRowColumn width="30"><img height="30" src={match.away.flagImageUrl} /></TableRowColumn>
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
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    return date + '.' + month + '.' + matchDate.getFullYear() + ' ' + matchDate.getHours() + ':' + minutes;
}

export default connect(s => s)(Match);
import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField, TableRow, TableRowColumn} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {strings} from "../../strings";
import {connect} from 'react-redux';
import {Col} from "react-grid-system";
import ReactTooltip from 'react-tooltip'

const styles = {
    card: {
        marginBottom: dimensions.defaultSpacing,
    },
    cardHeader: {
        backgroundColor: colors.cardHeaderBackground,
        padding: dimensions.defaultSpacing,
        textAlign: 'center'
    },
    cardBody: {
        padding: dimensions.defaultSpacing,
    },
    cardFooter: {
        borderTop: 'solid 1px #E0E0E0',
        padding: dimensions.defaultSpacing,
    },
    textField: {
        borderColor: colors.primaryColor,
        color: colors.primaryColor,
        width: '5rem',
        marginTop: '-1rem',
    },
    flag: {
        height: '3rem',
        marginRight: '1rem',
        verticalAlign: 'top',
        display: 'inline-block',
    },
    icon: {
        marginRight: dimensions.smallSpacing,
    }
};

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
                <TableRowColumn>{match.homeGoals}</TableRowColumn>
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
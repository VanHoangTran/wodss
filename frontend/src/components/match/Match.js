import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
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
            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                <ReactTooltip effect={"solid"}/>
                <Card style={styles.card}>
                    <CardText style={styles.cardHeader}>
                        {match.home.countryFifaCode + ' vs ' + match.away.countryFifaCode}
                    </CardText>
                    <CardText style={styles.cardBody}>
                        <img
                            src={match.home.flagImageUrl}
                            data-tip={match.home.name}
                            style={styles.flag}/>
                        <TextField
                            style={styles.textField}
                            floatingLabelText={strings.goals + ' ' + match.home.countryFifaCode}
                            type="number"
                            min="0"
                            disabled={!match.open}
                            value={match.homeGoals}
                        />
                        <br/>
                        <img
                            src={match.away.flagImageUrl}
                            data-tip={match.away.name}
                            style={styles.flag}/>
                        <TextField
                            style={styles.textField}
                            floatingLabelText={strings.goals + ' ' + match.away.countryFifaCode}
                            type="number"
                            min="0"
                            disabled={!match.open}
                            value={match.awayGoals}
                        />
                    </CardText>
                    <CardText style={styles.cardFooter}>
                        <i className="material-icons" style={styles.icon}>date_range</i>
                        {formatDate(matchDate)}
                    </CardText>
                    <CardText style={styles.cardFooter}>
                        <i className="material-icons" style={styles.icon}>location_on</i>
                        {match.stadium.name}
                    </CardText>
                </Card>
            </Col>
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
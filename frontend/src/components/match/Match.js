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
    render() {
        let {
            match
        } = this.props;

        let matchDate = new Date(match.timestamp);
        return (
            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                <ReactTooltip effect={"solid"}/>
                <Card style={styles.card}>
                    <CardText style={styles.cardHeader}>
                        {match.team1.fifaCode + ' vs ' + match.team2.fifaCode}
                    </CardText>
                    <CardText style={styles.cardBody}>
                        <img
                            src={match.team1.flagImageUrl}
                            data-tip={match.team1.name}
                            style={styles.flag}/>
                        <TextField
                            style={styles.textField}
                            floatingLabelText={strings.goals + ' ' + match.team1.fifaCode}
                            type="number"
                            min="0"
                        />
                        <br/>
                        <img
                            src={match.team2.flagImageUrl}
                            data-tip={match.team2.name}
                            style={styles.flag}/>
                        <TextField
                            style={styles.textField}
                            floatingLabelText={strings.goals + ' ' + match.team2.fifaCode}
                            type="number"
                            min="0"
                        />
                    </CardText>
                    <CardText style={styles.cardFooter}>
                        <i className="material-icons" style={styles.icon}>date_range</i>
                        {formatDate(matchDate)}
                    </CardText>
                    <CardText style={styles.cardFooter}>
                        <i className="material-icons" style={styles.icon}>location_on</i>
                        {match.stadium}
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
    return date + '.' + month + '.' + matchDate.getFullYear()
}

export default connect(s => s)(Match);
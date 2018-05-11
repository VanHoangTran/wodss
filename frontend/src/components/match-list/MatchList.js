import React, {Component} from 'react';
import Match from "../match/Match";
import {Col, Container, Row} from "react-grid-system";
import {Card, CardActions, CardHeader, CardText, FlatButton} from "material-ui";
import {colors, dimensions} from "../../util/constants";

function team(name, fifaCode, code) {
    return {
        name: name,
        fifaCode: fifaCode,
        flagImageUrl: require('../../images/flags/' + code + '.svg'),
    };
}

let match = {
    team1: team('Schweiz', 'SUI', 'ch'),
    team2: team('Deutschland', 'GER', 'de'),
    timestamp: 1523372144130,
    stadium: 'Luzhniki-Stadion',
};

const styles = {
    card: {
        margin: dimensions.defaultSpacing,
    },
    cardHeader: {
        backgroundColor: colors.cardHeaderBackground,
    },
    cardBody: {
        paddingBottom: "0",
    },
};

class MatchList extends Component {
    render() {
        return (
            <Card style={styles.card}>
                <CardHeader
                    title="Without Avatar"
                    actAsExpander={true}
                    showExpandableButton={true}
                    style={styles.cardHeader}
                />
                <CardText expandable={true} style={styles.cardBody}>
                    <Row>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                        <Match match={match}/>
                    </Row>
                </CardText>
            </Card>
        );
    }
}

export default MatchList;
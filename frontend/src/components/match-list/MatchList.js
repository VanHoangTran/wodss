import React, {Component} from 'react';
import Match from "../match/Match";
import {Col, Container, Row} from "react-grid-system";
import {Card, CardActions, CardHeader, CardText, FlatButton, Table, TableRow, TableBody, TableRowColumn} from "material-ui";
import {colors, dimensions, pages} from "../../util/constants";
import {connect} from "react-redux";
import {apiLoadMatchList} from "../../actions/match-list-actions";
import Header from '../header/Header';
import {NavLink} from "react-router-dom"
import { withRouter } from 'react-router'

function team(name, fifaCode, code) {
    return {
        name: name,
        fifaCode: fifaCode,
        flagImageUrl: fifaCode != '' ? require('../../images/flags/' + fifaCode + '.svg') : fifaCode,
    };
}

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

    constructor(props) {
        super(props);
        this.props.buildMatchList();
    }

    render() {
        if(this.props.matchList == "" || this.props.matchList == null)
            return "";

        return (            
            <div>
            {this.props.matchList.map((phase, i) => {     
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            title={phase.name}
                            actAsExpander={true}
                            showExpandableButton={true}
                            style={styles.cardHeader}
                        />

                        <CardText expandable={true} style={styles.cardBody}>
                            <Table>
                                <TableBody displayRowCheckbox={false}>
                                {phase.games.map((game) => {
                                    return <Match match={game}/>
                                })}
                                </TableBody>
                            </Table>
                        </CardText>
                    </Card>
                );
            })}
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        matchList: state.matchList
    }
};

const mapActionsToProps = {
    buildMatchList: apiLoadMatchList
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(MatchList));
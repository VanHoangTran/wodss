import React, {Component} from 'react';
import Match from "../match/Match";
import {Card, CardHeader, CardText, Divider, Table, TableBody} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {connect} from "react-redux";
import {apiLoadMatchList} from "../../actions/match-list-actions";
import {apiLoadAccountBets} from "../../actions/bet-actions";
import {withRouter} from 'react-router';

const styles = {
    card: {
        margin: dimensions.defaultSpacing,
    },
    cardHeader: {
        backgroundColor: colors.cardHeaderBackground,
    },
    cardBody: {
        padding: "0",
    },
};

class MatchList extends Component {

    constructor(props) {
        super(props);
        this.props.buildMatchList();
        this.props.loadAccountBets();
    }

    render() {
        if (!this.props.matchList)
            return "";

        return (
            <div>
                {this.props.matchList.map((phase, i) => {
                    return (
                        <Card key={i} style={styles.card}>
                            <CardHeader
                                title={phase.name}
                                actAsExpander={true}
                                showExpandableButton={true}
                                style={styles.cardHeader}
                            />

                            <CardText expandable={true} style={styles.cardBody}>
                                <Table>
                                    <TableBody displayRowCheckbox={false}>
                                        {phase.games.map((game, i) => {
                                            return <div>
                                                <Match key={i} match={game}/>
                                                <Divider/>
                                            </div>
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
    buildMatchList: apiLoadMatchList,
    loadAccountBets: apiLoadAccountBets
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(MatchList));
import React, {Component} from 'react';
import {Card, CardHeader, CardText, Divider, Table, TableBody} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {connect} from "react-redux";
import {apiLoadMatchList} from "../../actions/match-list-actions";
import {apiLoadAccountBets} from "../../actions/bet-actions"
import {withRouter} from 'react-router'
import AdminMatch from "./AdminGame";
import {apiGetTeams} from "../../actions/admin-actions";

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
        padding: "0",
    },
};

class Admin extends Component {

    constructor(props) {
        super(props);
        this.props.buildMatchList();
        this.props.loadAccountBets();
        this.props.getTeams();
    }

    render() {
        if (this.props.matchList == "" || this.props.matchList == null)
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
                                {phase.games.map((game) => {
                                    return (
                                        <div>
                                            <Divider/>
                                            <AdminMatch game={game} teams={this.props.admin.teams}/>
                                        </div>
                                    );
                                })}
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
        matchList: state.matchList,
        admin: state.admin,
    }
};

const mapActionsToProps = {
    buildMatchList: apiLoadMatchList,
    loadAccountBets: apiLoadAccountBets,
    getTeams: apiGetTeams,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Admin));
import React, {Component} from 'react';
import {Card, CardHeader, CardText, Divider} from "material-ui";
import {colors, dimensions, pages} from "../../util/constants";
import {connect} from "react-redux";
import {apiLoadMatchList} from "../../actions/match-list-actions";
import {apiLoadAccountBets} from "../../actions/bet-actions"
import {withRouter} from 'react-router'
import AdminMatch from "../admin-game/AdminGame";
import {apiGetTeams} from "../../actions/admin-actions";

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

        // check if admin
        if (!props.user.isAdmin) {
            this.props.history.push(pages.root);
        }

        this.props.buildMatchList();
        this.props.loadAccountBets();
        this.props.getTeams();
    }

    render() {
        if (!this.props.matchList)
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
                                {phase.games.map((game, i) => {
                                    return (
                                        <div key={i}>
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
        user: state.user,
    }
};

const mapActionsToProps = {
    buildMatchList: apiLoadMatchList,
    loadAccountBets: apiLoadAccountBets,
    getTeams: apiGetTeams,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Admin));
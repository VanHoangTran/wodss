import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiLoadAllBettingPools, apiDeleteGroup, apiUpdateRelation, JOIN_ACTION, LEAVE_ACTION} from "../../actions/betting-pool-actions";
import {colors, dimensions} from "../../util/constants";
import {Card, CardHeader, CardText, Table, TableBody, RaisedButton, CardActions, FlatButton, TableRow, TableRowColumn, TableHeader, TableHeaderColumn} from "material-ui";
import {strings} from "../../strings";

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
    newButton: {
        margin: 10,
    }
};

class PoolDetail extends Component {

    constructor(props) {
        super(props);
        this.onDeleteGroup = this.onDeleteGroup.bind(this);
    }

    onDeleteGroup(event){
        this.props.deletePool(this.props.pool.name);
    }

    onJoinGroup = (event) => {
        this.props.updateRelation(this.props.pool.name, JOIN_ACTION);
    }

    onLeaveGroup = (event) => {
        this.props.updateRelation(this.props.pool.name, LEAVE_ACTION);
    }

    render() {
        let pool = this.props.pool;

        let isOwner = this.props.user.username == pool.owner.username;
        let isMemebr = pool.members.find(u => u.username === this.props.user.username) != undefined;

        let subtitle = isOwner ? strings.owner : (isMemebr ? strings.member : '');
        return (
            <Card style={styles.card}>
                <CardHeader
                    title={pool.name}
                    actAsExpander={true}
                    showExpandableButton={true}
                    subtitle={subtitle}
                    style={styles.cardHeader}
                />
                
                <CardText expandable={true} style={styles.cardBody}>
                    <CardActions>
                    {isOwner && <FlatButton onClick={this.onDeleteGroup} label={strings.delPool} /> }
                    {!isMemebr && <FlatButton onClick={this.onJoinGroup} label={strings.joinPool} /> }
                    {!isOwner && isMemebr && <FlatButton onClick={this.onLeaveGroup} label={strings.leavePool} /> }
                    </CardActions>

                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Rang</TableHeaderColumn>
                                <TableHeaderColumn>Punkte</TableHeaderColumn>
                                <TableHeaderColumn>Benutzername</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {pool.ranking.map((ranking, i) => {  
                                return (<TableRow>
                                    <TableRowColumn>{ranking.position}</TableRowColumn>
                                    <TableRowColumn>{ranking.points}</TableRowColumn>
                                    <TableRowColumn>{ranking.account.username}</TableRowColumn>
                                </TableRow>);
                            })}                            
                        </TableBody>
                    </Table>
                </CardText>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapActionsToProps = {
    deletePool: apiDeleteGroup,
    updateRelation: apiUpdateRelation
};

export default connect(mapStateToProps, mapActionsToProps)(PoolDetail);
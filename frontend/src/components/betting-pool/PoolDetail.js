import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiDeleteGroup, apiUpdateRelation, JOIN_ACTION, LEAVE_ACTION} from "../../actions/betting-pool-actions";
import {colors, dimensions} from "../../util/constants";
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    RaisedButton,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui";
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

    onDeleteGroup(event) {
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

        let isOwner = this.props.user.username === pool.owner.username;
        let isMember = pool.members.find(u => u.username === this.props.user.username) !== undefined;
        let isSpecial = pool.specialGroup;

        let subtitle = isOwner ? strings.admin : (isMember ? strings.member : '');
        return (
            <Card style={styles.card}>
                <CardHeader
                    title={pool.name}
                    actAsExpander={true}
                    showExpandableButton={true}
                    subtitle={!isSpecial && subtitle}
                    style={styles.cardHeader}
                />

                <CardText expandable={true} style={styles.cardBody}>
                    <CardActions style={isSpecial ? {display: 'none'} : {}}>
                        {isOwner && !isSpecial && <RaisedButton onClick={this.onDeleteGroup} label={strings.delPool}/>}
                        {!isMember && !isSpecial && <RaisedButton onClick={this.onJoinGroup} label={strings.joinPool}/>}
                        {!isOwner && isMember && !isSpecial &&
                        <RaisedButton onClick={this.onLeaveGroup} label={strings.leavePool}/>}
                    </CardActions>

                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn className={"col-ranking"}>{strings.ranking}</TableHeaderColumn>
                                <TableHeaderColumn>{strings.username}</TableHeaderColumn>
                                <TableHeaderColumn className={"col-points"}>{strings.points}</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {pool.ranking.map((ranking, i) => {
                                let style = ranking.account.username === this.props.user.username ? {backgroundColor: '#4eae4414'} : {};
                                return (
                                    <TableRow key={i} style={style}>
                                        <TableRowColumn className={"col-ranking"}>{ranking.position}</TableRowColumn>
                                        <TableRowColumn>{ranking.account.username}</TableRowColumn>
                                        <TableRowColumn className={"col-points"}>{ranking.points}</TableRowColumn>
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
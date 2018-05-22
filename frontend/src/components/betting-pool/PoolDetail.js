import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiDeleteGroup, apiUpdateRelation, JOIN_ACTION, LEAVE_ACTION} from "../../actions/betting-pool-actions";
import {colors, dimensions} from "../../util/constants";
import {
    Card,
    CardHeader,
    CardText,
    Divider,
    RaisedButton,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TextField
} from "material-ui";
import {strings} from "../../strings";

const styles = {
    card: {
        margin: dimensions.defaultSpacing,
    },
    cardHeader: {
        backgroundColor: colors.cardHeaderBackground,
    },
    newButton: {
        margin: 10,
    }
};

class PoolDetail extends Component {

    constructor(props) {
        super(props);
        this.onDeleteGroup = this.onDeleteGroup.bind(this);
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);

        this.state = {
            ranking: this.props.pool.ranking,
            searchValue: "",
        }
    }

    onDeleteGroup(event) {
        this.props.deletePool(this.props.pool.name);
    };

    onJoinGroup = (event) => {
        this.props.updateRelation(this.props.pool.name, JOIN_ACTION);
    };

    onLeaveGroup = (event) => {
        this.props.updateRelation(this.props.pool.name, LEAVE_ACTION);
    };

    handleSearchValueChange(event) {
        let searchValue = event.target.value;

        let ranking = [];
        if (searchValue.trim().length === 0) {
            ranking = this.props.pool.ranking;

        } else {
            this.props.pool.ranking.forEach(function (entry) {
                if (entry.account.username.toLowerCase().includes(searchValue.toLowerCase().trim())) {
                    ranking.push(entry);
                }
            });
        }

        this.setState({
            searchValue: searchValue,
            ranking: ranking,
        });
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

                <CardText className={"card-body"} expandable={true}>
                    <div style={isSpecial ? {display: 'none'} : {}} className={"container-actions"}>
                        <TextField value={this.state.searchValue}
                                   hintText={strings.searchUserHint}
                                   onChange={this.handleSearchValueChange}/>
                        <div className={"spacer"}/>
                        {isOwner && !isSpecial &&
                        <RaisedButton onClick={this.onDeleteGroup} label={strings.delPool} className={"btn"}/>}
                        {!isMember && !isSpecial &&
                        <RaisedButton onClick={this.onJoinGroup} label={strings.joinPool} className={"btn"}/>}
                        {!isOwner && isMember && !isSpecial &&
                        <RaisedButton onClick={this.onLeaveGroup} label={strings.leavePool} className={"btn"}/>}
                    </div>
                    <Divider/>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} className={"table-header"}>
                            <TableRow>
                                <TableHeaderColumn className={"col-ranking"}>{strings.ranking}</TableHeaderColumn>
                                <TableHeaderColumn>{strings.username}</TableHeaderColumn>
                                <TableHeaderColumn className={"col-points"}>{strings.points}</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.ranking.map((ranking, i) => {
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
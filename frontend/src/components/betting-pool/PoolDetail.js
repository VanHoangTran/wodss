import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiDeleteGroup, apiUpdateRelation, JOIN_ACTION, LEAVE_ACTION} from "../../actions/betting-pool-actions";
import {colors, dimensions} from "../../util/constants";
import {
    Card,
    CardHeader,
    CardText,
    Divider,
    FlatButton,
    IconButton,
    Paper,
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
        backgroundColor: colors.cardHeaderBackground,
    },
    cardHeader: {
        backgroundColor: colors.cardHeaderBackground,
    },
};

const visibleRankingEntriesPerPage = 10;

class PoolDetail extends Component {

    constructor(props) {
        super(props);
        this.onDeleteGroup = this.onDeleteGroup.bind(this);
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.handlePaging = this.handlePaging.bind(this);
        this.handlePagingButtonClick = this.handlePagingButtonClick.bind(this);
        this.handlePagingButtonPrevClick = this.handlePagingButtonPrevClick.bind(this);
        this.handlePagingButtonNextClick = this.handlePagingButtonNextClick.bind(this);

        this.state = {
            ranking: this.props.pool.ranking,
            searchValue: "",
            selectedIndex: 0,
            visibleRanking: [],
            numberOfPages: 0,
        };
    }

    componentWillMount() {
        this.handlePaging();
    }

    componentWillReceiveProps(props) {
        if (this.props.pool) {
            this.setState({
                ranking: props.pool.ranking,
            }, this.handlePaging);
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
            selectedIndex: 0,
            searchValue: searchValue,
            ranking: ranking,
        }, this.handlePaging);
    }

    handlePaging() {
        let visiblePoolsFirstIndex = this.state.selectedIndex * visibleRankingEntriesPerPage;
        let loopLimit = visiblePoolsFirstIndex + visibleRankingEntriesPerPage;
        let totalNumberOfRankingEntries = this.state.ranking.length;
        if (loopLimit > totalNumberOfRankingEntries) {
            loopLimit = totalNumberOfRankingEntries;
        }

        let visibleRanking = [];
        for (let i = visiblePoolsFirstIndex; i < loopLimit; i++) {
            visibleRanking.push(this.state.ranking[i]);
        }

        this.setState({
            visibleRanking: visibleRanking,
            numberOfPages: Math.ceil(totalNumberOfRankingEntries / visibleRankingEntriesPerPage),
        });
    };

    handlePagingButtonClick(event) {
        let selectedIndex = parseInt(event.target.innerText, 10) - 1;
        this.setState({
            selectedIndex: selectedIndex,
        }, this.handlePaging);
    }

    handlePagingButtonPrevClick() {
        if (this.state.selectedIndex > 0) {
            this.setState({
                selectedIndex: this.state.selectedIndex - 1,
            }, this.handlePaging);
        }
    }

    handlePagingButtonNextClick() {
        if (this.state.selectedIndex < this.state.numberOfPages - 1) {
            this.setState({
                selectedIndex: this.state.selectedIndex + 1,
            }, this.handlePaging);
        }
    }

    render() {
        let pool = this.props.pool;

        let isOwner = this.props.user.username === pool.owner.username;
        let isMember = pool.members.find(u => u.username === this.props.user.username) !== undefined;
        let isSpecial = pool.specialGroup;

        let subtitle = isOwner ? strings.admin : (isMember ? strings.member : '');

        let pagingButtons = [];
        for (let i = 0; i < this.state.numberOfPages; i++) {
            pagingButtons.push(
                <FlatButton key={i}
                            label={i + 1}
                            onClick={this.handlePagingButtonClick}
                            style={this.state.selectedIndex === i ? {
                                backgroundColor: colors.primaryColor,
                                color: colors.light,
                            } : {}}
                            className={"btn-paging"}
                />
            )
        }

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
                    <div className={"container-actions"}>
                        <TextField value={this.state.searchValue}
                                   hintText={strings.searchUserHint}
                                   onChange={this.handleSearchValueChange}/>
                        <div className={"spacer"}/>

                        <div style={isSpecial ? {display: 'none'} : {}}>
                            {isOwner && !isSpecial &&
                            <RaisedButton onClick={this.onDeleteGroup} label={strings.delPool} className={"btn"}/>}
                            {!isMember && !isSpecial &&
                            <RaisedButton onClick={this.onJoinGroup} label={strings.joinPool} className={"btn"}/>}
                            {!isOwner && isMember && !isSpecial &&
                            <RaisedButton onClick={this.onLeaveGroup} label={strings.leavePool} className={"btn"}/>}
                        </div>
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
                            {this.state.visibleRanking.map((ranking, i) => {
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

                    {this.state.numberOfPages > 1 &&
                    <div>
                        <Divider/>
                        <Paper zDepth={1}
                               style={{width: (this.state.numberOfPages + 2) * 3 + "rem"}}
                               className={"btn-grp-paging detail"}>
                            <IconButton
                                onClick={this.handlePagingButtonPrevClick}
                                disabled={this.state.selectedIndex === 0}
                                iconClassName="material-icons">chevron_left</IconButton>
                            {pagingButtons}
                            <IconButton
                                onClick={this.handlePagingButtonNextClick}
                                disabled={this.state.selectedIndex === this.state.numberOfPages - 1}
                                iconClassName="material-icons">chevron_right</IconButton>
                        </Paper>
                    </div>
                    }
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
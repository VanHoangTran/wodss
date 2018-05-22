import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiCreateGroup, apiLoadAllBettingPools} from "../../actions/betting-pool-actions";
import {colors} from "../../util/constants";
import {FlatButton, IconButton, Paper, RaisedButton, TextField} from "material-ui";
import {strings} from "../../strings";
import "./BettingPool.css"
import PoolDetail from './PoolDetail';

const visiblePoolsPerPage = 3;

class BettingPool extends Component {

    constructor(props) {
        super(props);

        this.handlePagingButtonClick = this.handlePagingButtonClick.bind(this);
        this.handlePagingButtonPrevClick = this.handlePagingButtonPrevClick.bind(this);
        this.handlePagingButtonNextClick = this.handlePagingButtonNextClick.bind(this);

        // load all pools from API
        this.props.loadPools();

        this.state = {
            newPoolName: '',
            selectedIndex: 0,
            visiblePools: [],
            numberOfPages: 0,
        };
    }

    onNewPoolNameChange = (event) => {
        this.setState({newPoolName: event.target.value});
    };

    onCreatePool = (event) => {
        this.props.createPool(this.state.newPoolName);
    };

    componentWillReceiveProps(props) {
        this.setState({newPoolName: ''});
        this.handlePoolsPaging(props);

        if (props.poolStore.action === "reload") {
            this.props.loadPools();
        } else if (props.poolStore.action === "unableToCreate") {
            alert(strings.groupAlreadyExists);
        } else if (props.poolStore.action === "unableToJoinOrLeave") {
            alert(strings.unableToJoinOrLeave);
        }
    }

    handlePoolsPaging(props) {
        if (!props) {
            props = this.props;
        }
        let visiblePoolsFirstIndex = this.state.selectedIndex * visiblePoolsPerPage;
        let loopLimit = visiblePoolsFirstIndex + visiblePoolsPerPage;
        let totalNumberOfPools = props.poolStore.pools.length;
        if (loopLimit > totalNumberOfPools) {
            loopLimit = totalNumberOfPools;
        }

        let visiblePools = [];
        for (let i = visiblePoolsFirstIndex; i < loopLimit; i++) {
            visiblePools.push(props.poolStore.pools[i]);
        }

        this.setState({
            visiblePools: visiblePools,
            numberOfPages: Math.ceil(totalNumberOfPools / visiblePoolsPerPage),
        });
    };

    handlePagingButtonClick(event) {
        let selectedIndex = parseInt(event.target.innerText, 10) - 1;
        this.setState({
            selectedIndex: selectedIndex,
        }, this.handlePoolsPaging);
    }

    handlePagingButtonPrevClick() {
        if (this.state.selectedIndex > 0) {
            this.setState({
                selectedIndex: this.state.selectedIndex - 1,
            }, this.handlePoolsPaging);
        }
    }

    handlePagingButtonNextClick() {
        if (this.state.selectedIndex < this.state.numberOfPages - 1) {
            this.setState({
                selectedIndex: this.state.selectedIndex + 1,
            }, this.handlePoolsPaging);
        }
    }

    render() {
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
            <div>
                <div className="buttonContainer">
                    <TextField value={this.state.newPoolName}
                               onChange={this.onNewPoolNameChange}
                               hintText={strings.newGroupHint}/>
                    <RaisedButton label={strings.newBettingPool}
                                  onClick={this.onCreatePool}
                                  className={"btn btn-create-pool"}/>
                </div>

                {this.state.visiblePools.map((pool, i) => {
                    return <PoolDetail key={i} pool={pool}/>
                })}

                {this.state.numberOfPages > 1 &&
                <Paper zDepth={1}
                       style={{width: (this.state.numberOfPages + 2) * 3 + "rem"}}
                       className={"btn-grp-paging"}>
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
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        poolStore: state.poolStore
    }
};

const mapActionsToProps = {
    loadPools: apiLoadAllBettingPools,
    createPool: apiCreateGroup
};

export default connect(mapStateToProps, mapActionsToProps)(BettingPool);
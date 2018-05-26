import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dialog, FlatButton, TextField} from "material-ui";
import {apiDeleteBet, apiPutBet} from '../../actions/bet-actions'
import {apiLoadMatchList} from '../../actions/match-list-actions'
import {strings} from "../../strings";
import "./Bet.css";

class Bet extends Component {

    constructor(props) {
        super(props);
        this.handleHomeGoalsChange = this.handleHomeGoalsChange.bind(this);
        this.handleAwayGoalsChange = this.handleAwayGoalsChange.bind(this);

        this.state = {
            background: {backgroundColor: 'transparent'},
            dialog: undefined,
        };

        // check if we got a bet for this match!
        let bet = this.props.betStore.bets.find(b => b.gameId === this.props.matchId);
        if (bet) {
            this.state = {
                background: {backgroundColor: '#ffa900'},
                homeGoals: bet.homeGoals,
                awayGoals: bet.awayGoals,
                bet: bet
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.betStore.lastAdded.gameId === this.props.matchId) {
            if (nextProps.betStore.lastAdded.apiStatus === 200) {
                this.setState({background: {backgroundColor: '#ffa900'}});
            } else {
                this.setState({
                    background: {backgroundColor: 'transparent'},
                    homeGoals: "",
                    awayGoals: "",
                });
            }
        }

        if (nextProps.betStore.lastDeleted.gameId === this.props.matchId) {
            this.setState({background: {backgroundColor: 'transparent'}});
            if (nextProps.betStore.lastDeleted.success === false) {
                this.setState({
                    dialog: {
                        title: strings.errorOccurred,
                        content: strings.failedToDeleteBet,
                    },
                });
            } else if (nextProps.betStore.lastDeleted.success === true) {
                this.setState({
                    dialog: {
                        title: strings.betDeleted,
                        content: "",
                    },
                });
            }
        }
    }

    handleHomeGoalsChange = (event) => {
        let value = Bet.formatGoalsValue(event.target.value);
        // keep old value if new value not valid
        if (value !== undefined) {
            this.setState({
                homeGoals: value,
            }, this.onStateChanged);
        }
    };

    handleAwayGoalsChange = (event) => {
        let value = Bet.formatGoalsValue(event.target.value);
        // keep old value if new value not valid
        if (value !== undefined) {
            this.setState({
                awayGoals: value,
            }, this.onStateChanged);
        }
    };

    onStateChanged = () => {
        let homeGoals = this.state.homeGoals;
        let awayGoals = this.state.awayGoals;

        // at least one number empty -> make background transparent
        if (homeGoals === "" || awayGoals === "") {
            this.setState({background: {backgroundColor: 'transparent'}});
        }

        // both empty -> API DELETE BET
        if (awayGoals === "" && homeGoals === "") {
            this.props.deleteBet(this.props.matchId);
            return;
        }

        // both are numbers -> API PUT BET
        if (homeGoals !== "" && !isNaN(homeGoals) && awayGoals !== "" && !isNaN(awayGoals)) {
            this.props.putBet(this.props.matchId, homeGoals, awayGoals);
        }
    };

    handleCloseDialog = () => {
        this.setState({
            dialog: undefined,
        });
    };

    static formatGoalsValue(value) {
        value = value.trim();

        // return empty value
        if (value.length === 0) {
            return "";
        }

        // return undefined if value not valid
        let intValue = parseInt(value, 10);
        if (("" + intValue) !== value && ("0" + intValue) !== value) {
            return undefined;
        } else if (intValue < 0 || intValue > 20) {
            return undefined;
        }

        // return valid value
        return intValue;
    }

    render() {
        return (
            <div className={"container"}>
                <div className={"home"}>
                    <TextField value={this.state.homeGoals}
                               onChange={this.handleHomeGoalsChange}
                               disabled={!this.props.open}
                               style={this.state.background}
                               className={"textfield"}
                               name={"text-field-home"}/>
                </div>
                <div className={"away"}>
                    <TextField value={this.state.awayGoals}
                               onChange={this.handleAwayGoalsChange}
                               disabled={!this.props.open}
                               style={this.state.background}
                               className={"textfield"}
                               name={"text-field-away"}/>
                </div>

                {this.state.dialog &&
                <Dialog
                    title={this.state.dialog.title}
                    actions={[
                        <FlatButton
                            label={strings.ok}
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleCloseDialog}
                        />
                    ]}
                    modal={false}
                    open={!!this.state.dialog}
                    onRequestClose={this.handleCloseDialog}>
                    {this.state.dialog.content}
                </Dialog>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        betStore: state.betStore
    }
};

const mapActionsToProps = {
    putBet: apiPutBet,
    deleteBet: apiDeleteBet,
    buildMatchList: apiLoadMatchList
};

export default connect(mapStateToProps, mapActionsToProps)(Bet);
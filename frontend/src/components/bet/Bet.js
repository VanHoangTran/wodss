import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TextField} from "material-ui";
import ReactDOM from 'react-dom';
import {apiPutBet} from '../../actions/bet-actions'

class Bet extends Component {

    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);

        this.state = {
            background: {backgroundColor: 'transparent'}
        };

        // check if we got a bet for this match!
        let bet = this.props.betStore.bets.find(b => b.gameId === this.props.matchId);
        if(bet){
            this.state = {
                background: {backgroundColor: '#ffa900'},
                homeGoals: bet.homeGoals,
                awayGoals: bet.awayGoals,
                homeNeedsSave: false,
                awayNeedsSave: false
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.betStore.lastAdded.gameId === this.props.matchId) {
            if(nextProps.betStore.lastAdded.apiStatus === 200) {
                this.setState({ background: {backgroundColor: '#ffa900'} });
            } else {
                this.state = {
                    background: {backgroundColor: 'transparent'},
                    homeGoals: "",
                    awayGoals: "",
                    homeNeedsSave: false,
                    awayNeedsSave: false
                };
            }
        }
    }

    onValueChange = (event) => {
        if(event.target.name === "betHome"){
            if(isNaN(event.target.value)) {
                this.setState({ 
                    homeGoals: "",
                    homeNeedsSave: false
                }, this.onStateChanged);
            } else  {
                this.setState({ 
                    homeGoals: event.target.value,
                    homeNeedsSave: true
                }, this.onStateChanged);
            }
        } else if (event.target.name === "betAway") {
            if(isNaN(event.target.value)) {
                this.setState({ 
                    awayGoals: "",
                    awayNeedsSave: false
                }, this.onStateChanged);
            } else  {
                this.setState({ 
                    awayGoals: event.target.value,
                    awayNeedsSave: true
                }, this.onStateChanged);
            }
        } 
    }

    onStateChanged = () => {
        // both bet fields have been changed
        if(!this.state.awayNeedsSave || !this.state.homeNeedsSave){
            this.setState({background: {backgroundColor: 'transparent'}});
            return;
        }

        // case 1: both empty -> API DELETE BET
        if(this.state.awayGoals === "" && this.state.homeGoals === "") {
            this.setState({
                homeNeedsSave: false,
                awayNeedsSave: false
            });
            return;
        }

        // case 2: one is a number, the other not -> do nothing
        if((this.state.awayGoals === "" && !isNaN(this.state.homeGoals)) 
            || (this.state.homeGoals === "" && !isNaN(this.state.awayGoals))) {
            this.setState({
                homeNeedsSave: false,
                awayNeedsSave: false
            });
            return;
        }

        // case 3: both are numbers -> API PUT BET
        if(!isNaN(this.state.homeGoals) && !isNaN(this.state.awayGoals)) {
            this.setState({
                homeNeedsSave: false,
                awayNeedsSave: false
            });
            this.props.putBet(this.props.matchId, this.state.homeGoals, this.state.awayGoals);
            return;
        }
    }

    render() {
        return (
            <div className="bets">
                <div className="homeBet"><TextField disabled={!this.props.open} value={this.state.homeGoals} style={this.state.background} onChange={this.onValueChange} ref="betHome" name="betHome" fullWidth={true}/></div>
                <div className="awayBet"><TextField disabled={!this.props.open} value={this.state.awayGoals} style={this.state.background} onChange={this.onValueChange} ref="betAway" name="betAway" fullWidth={true}/></div>
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
    putBet: apiPutBet
};

export default connect(mapStateToProps, mapActionsToProps)(Bet);
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
                awayGoals: bet.awayGoals
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.betStore.lastAdded.gameId === this.props.matchId) {
            if(nextProps.betStore.lastAdded.apiStatus === 200) {
                this.setState({ background: {backgroundColor: '#ffa900'} });
            } else {
                this.refs.betHome.input.value = "";
                this.refs.betAway.input.value = "";
            }
        }
    }

    onValueChange(event){
        let betHome = this.refs.betHome.input.value;
        let betAway = this.refs.betAway.input.value;
        
        if(isNaN(betHome) || isNaN(betAway) || betHome > 20 || betAway > 20) {
            this.refs.betHome.input.value = "";
            this.refs.betAway.input.value = "";
        }

        if(betHome != "" && betAway != "") {
            this.props.putBet(this.props.matchId, betHome, betAway);
        }
    }

    render() {
        return (
            <div className="bets">
                <div className="homeBet"><TextField value={this.state.homeGoals} style={this.state.background} onChange={this.onValueChange} ref="betHome" name="betHome" fullWidth={true}/></div>
                <div className="awayBet"><TextField value={this.state.awayGoals} style={this.state.background} onChange={this.onValueChange} ref="betAway" name="betAway" fullWidth={true}/></div>
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
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TextField} from "material-ui";
import ReactDOM from 'react-dom';
import {apiPutBet} from '../../actions/match-list-actions'

class Bet extends Component {

    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);

        this.state = {
            background: {backgroundColor: 'transparent'}
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.bets.gameId === this.props.matchId) {
            let betHome = this.refs.betHome;
            let betAway = this.refs.betAway;
            this.setState({ background: {backgroundColor: '#ffa900'} });
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
                <div className="homeBet"><TextField style={this.state.background} onChange={this.onValueChange} ref="betHome" name="betHome" fullWidth={true}/></div>
                <div className="awayBet"><TextField style={this.state.background} onChange={this.onValueChange} ref="betAway" name="betAway" fullWidth={true}/></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        bets: state.bets
    }
};

const mapActionsToProps = {
    putBet: apiPutBet
};

export default connect(mapStateToProps, mapActionsToProps)(Bet);
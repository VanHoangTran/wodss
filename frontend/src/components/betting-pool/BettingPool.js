import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiLoadAllBettingPools, apiDeleteGroup, apiCreateGroup} from "../../actions/betting-pool-actions";
import {colors, dimensions} from "../../util/constants";
import {Card, CardHeader, CardText, Table, TableBody, TextField, RaisedButton, CardActions, FlatButton} from "material-ui";
import {strings} from "../../strings";
import "./BettingPool.css"
import PoolDetail from './PoolDetail';

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

class BettingPool extends Component {

    constructor(props) {
        super(props);

        // load all pools from API
        this.props.loadPools();

        this.state = { newPoolName: '' }
    }
    
    onNewPoolNameChange = (event) => {
        this.setState({newPoolName: event.target.value});
    }

    onCreatePool = (event) => {
        this.props.createPool(this.state.newPoolName);
    }

    render() {
        return (            
            <div>
                <div className="buttonContainer">
                    <RaisedButton onClick={this.onCreatePool} className="newButton" label={strings.newBettingPool} style={styles.newButton} />
                    <TextField value={this.state.newPoolName} onChange={this.onNewPoolNameChange} ref="newPoolName" hintText={strings.newGroupHint} name="newPoolName" />
                </div>

                {this.props.poolStore.pools.map((pool, i) => {  
                    return <PoolDetail pool={pool} />
                })}
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
import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiLoadAllBettingPools, apiDeleteGroup} from "../../actions/betting-pool-actions";
import {colors, dimensions} from "../../util/constants";
import {Card, CardHeader, CardText, Table, TableBody, RaisedButton, CardActions, FlatButton} from "material-ui";
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
    }

    render() {
        return (            
            <div>
                <div className="buttonContainer">
                    <RaisedButton className="newButton" label={strings.newBettingPool} style={styles.newButton} />
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
    loadPools: apiLoadAllBettingPools
};

export default connect(mapStateToProps, mapActionsToProps)(BettingPool);
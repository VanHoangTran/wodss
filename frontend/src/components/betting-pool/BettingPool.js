import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiLoadAllBettingPools} from "../../actions/betting-pool-actions";
import {colors, dimensions} from "../../util/constants";
import {Card, CardHeader, CardText, Table, TableBody, RaisedButton} from "material-ui";
import {strings} from "../../strings";
import "./BettingPool.css"

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
                    let isOwner = this.props.user.username == pool.owner.username;
                    let isMemebr = pool.members.find(u => u.username === this.props.user.username) != undefined;

                    let subtitle = isOwner ? strings.owner : (isMemebr ? strings.member : '');

                    return (
                        <Card style={styles.card}>
                            <CardHeader
                                title={pool.name}
                                actAsExpander={true}
                                showExpandableButton={true}
                                subtitle={subtitle}
                                style={styles.cardHeader}
                            />

                            <CardText expandable={true} style={styles.cardBody}>
                                <Table>
                                    <TableBody displayRowCheckbox={false}>
                                        
                                    </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        poolStore: state.poolStore,
        user: state.user
    }
};

const mapActionsToProps = {
    loadPools: apiLoadAllBettingPools
};

export default connect(mapStateToProps, mapActionsToProps)(BettingPool);
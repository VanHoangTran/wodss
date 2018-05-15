import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiLoadAllBettingPools, apiDeleteGroup} from "../../actions/betting-pool-actions";
import {colors, dimensions} from "../../util/constants";
import {Card, CardHeader, CardText, Table, TableBody, RaisedButton, CardActions, FlatButton} from "material-ui";
import {strings} from "../../strings";

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

class PoolDetail extends Component {

    constructor(props) {
        super(props);
        this.onDeleteGroup = this.onDeleteGroup.bind(this);
    }

    onDeleteGroup(event){
        this.props.deletePool(this.props.pool.name);
    }

    render() {
        let pool = this.props.pool;

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
                    <CardActions>
                    {isOwner && <FlatButton data-pool-name={pool.name} onClick={this.onDeleteGroup} label={strings.delPool} /> }
                        
                    </CardActions>
                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            
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
    deletePool: apiDeleteGroup
};

export default connect(mapStateToProps, mapActionsToProps)(PoolDetail);
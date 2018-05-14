import React, {Component} from 'react'
import {FlatButton, Tab, Tabs} from 'material-ui';
import {colors, dimensions, pages} from "../../util/constants";
import {connect} from "react-redux";
import {getAvatarUrl} from "../../util/avatarUtil";
import {strings} from "../../strings";
import {withRouter} from 'react-router';

const styles = {
    toolbar: {
        height: dimensions.toolbar,
        padding: 0,
        backgroundColor: colors.primaryColor,
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.0625rem 0.5rem, rgba(0, 0, 0, 0.12) 0px 0.0625rem 0.25rem',
        color: colors.light,
    },
    logoContainer: {
        width: '5rem',
        display: 'inline-block',
    },
    tabs: {
        width: '20rem',
        display: 'inline-block',
    },
    tabIndicator: {
        background: colors.light,
    },
    tab: {
        height: dimensions.toolbar,
    },
    avatarButton: {
        height: '100%',
        float: 'right',
    },
    avatar: {
        height: '2rem',
        margin: '1rem',
        borderRadius: '1.5rem',
    }
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleNavItemClick = this.handleNavItemClick.bind(this);
    }

    handleNavItemClick(tab) {
        let url = tab.props.url;
        if (url) {
            this.props.history.push(url);
        }
    }

    render() {
        const loggedIn = this.props.user.username && this.props.user.token;
        const content = <div className="header">
            <div style={styles.toolbar}>
                <div style={styles.logoContainer}>
                    LOGO
                </div>
                <Tabs style={styles.tabs} inkBarStyle={styles.tabIndicator}>
                    <Tab label={strings.bettingGame}
                         url={pages.matchList}
                         onActive={this.handleNavItemClick}
                         style={styles.tab}/>
                    <Tab label={strings.bettingPools}
                         url={pages.bettingPools}
                         onActive={this.handleNavItemClick}
                         style={styles.tab}/>
                    <Tab label={strings.admin}
                         url={pages.admin}
                         onActive={this.handleNavItemClick}
                         style={styles.tab}/>
                </Tabs>
                <FlatButton rippleColor={colors.light} hoverColor="transparent" style={styles.avatarButton}>
                    <img style={styles.avatar} alt="" src={getAvatarUrl(this.props.user.username)}/>
                </FlatButton>
            </div>
        </div>;

        return (<div>{loggedIn ? content : ""}</div>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default withRouter(connect(mapStateToProps, {})(Header));

import React, {Component} from 'react'
import {FlatButton, Menu, MenuItem, Popover, Tab, Tabs} from 'material-ui';
import {colors, dimensions, pages} from "../../util/constants";
import {connect} from "react-redux";
import {getAvatarUrl} from "../../util/imageUtil";
import {strings} from "../../strings";
import {withRouter} from 'react-router';
import './Header.css';

const styles = {
    toolbar: {
        height: dimensions.toolbar,
        padding: 0,
        backgroundColor: colors.primaryColor,
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0.0625rem 0.5rem, rgba(0, 0, 0, 0.12) 0px 0.0625rem 0.25rem',
        color: colors.light,
    },
    logoContainer: {
        width: '10rem',
        display: 'inline-block',
        textIndent: '1rem'
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
        margin: '0.9rem',
        borderRadius: '50%',
        border: '0.1rem #2E7D32 solid',
    }
};

class Header extends Component {

    constructor(props) {
        super(props);
        this.openUrl = this.openUrl.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);

        this.state = {
            menuOpen: false,
            value: pages.matchList,
        };
    }

    componentDidMount() {
        document.title = strings.appTitle;
    }

    handleAvatarClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            menuOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            menuOpen: false,
        });
    };

    handleMenuItemClick(event, menuItem, index) {
        this.openUrl(menuItem.props.url);
    }

    openUrl(url) {
        let activeTab = url;
        if (url === pages.logout) {
            // reset to default url if logout triggered
            activeTab = pages.matchList;
        }
        // set active tab and close menu
        this.setState({
            menuOpen: false,
            value: activeTab,
        });

        // open url
        if (url) {
            this.props.history.push(url);
        }
    }

    render() {
        const loggedIn = this.props.user.username && this.props.user.token;
        const content = <div className="header">
            <div style={styles.toolbar}>
                <div id="navTitle" style={styles.logoContainer}>
                    {strings.navTitle}
                </div>
                <Tabs value={this.state.value}
                      onChange={this.openUrl}
                      inkBarStyle={styles.tabIndicator}
                      style={styles.tabs}>
                    <Tab label={strings.bettingGame}
                         value={pages.matchList}
                         style={styles.tab}/>
                    <Tab label={strings.bettingPools}
                         value={pages.bettingPools}
                         style={styles.tab}/>
                    {this.props.user.isAdmin ? (
                        <Tab label={strings.admin}
                             value={pages.admin}
                             style={styles.tab}/>
                    ) : ("")}
                </Tabs>
                <FlatButton onClick={this.handleAvatarClick}
                            rippleColor={colors.light}
                            hoverColor="transparent"
                            style={styles.avatarButton}>
                    <img style={styles.avatar} alt="" src={getAvatarUrl(this.props.user.username)}/>
                </FlatButton>

                <Popover
                    open={this.state.menuOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}>
                    <Menu onItemClick={this.handleMenuItemClick}>
                        <MenuItem primaryText={strings.profile} url={pages.profile}/>
                        <MenuItem primaryText={strings.logout} url={pages.logout}/>
                    </Menu>
                </Popover>
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

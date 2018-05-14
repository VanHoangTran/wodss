import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Tab, Tabs, FlatButton} from 'material-ui';
import {colors, dimensions} from "../../util/constants";
import MatchList from "../match-list/MatchList";
import Registration from "../registration/Registration";
import {Route, Switch} from 'react-router-dom';
import {jwt} from "../../index";
import {apiAuthenticate} from "../../actions/user-actions";
import {connect} from "react-redux";

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

        console.log(this.props.user.username);

        this.state = {
            username: this.props.user.username,
        };
    }

    render() {
        const loggedIn = this.props.user.username && this.props.user.token;
        const content = <div className="header">
            <div style={styles.toolbar}>
                <div style={styles.logoContainer}>
                    LOGO{this.state.username}
                </div>
                <Tabs style={styles.tabs} inkBarStyle={styles.tabIndicator}>
                    <Tab label={"Tippspiel"} style={styles.tab}/>
                    <Tab label="Tippteam" style={styles.tab}/>
                    <Tab
                        label="Admin"
                        data-route="/Startseite"
                        style={styles.tab}
                    />
                </Tabs>
                <FlatButton rippleColor={colors.light} hoverColor="transparent" style={styles.avatarButton}>
                    <img id="avatar" style={styles.avatar} alt=""
                         src="https://api.adorable.io/avatars/100/HoangTran.png"/>
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


const mapActionsToProps = {
    //authenticate: apiAuthenticate
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
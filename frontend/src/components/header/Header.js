import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import {Tab, Tabs} from 'material-ui/Tabs';
import {colors, dimensions} from "../../util/constants";
import MatchList from "../match-list/MatchList";
import SignUp from "../sign-up/SignUp";
import {Route, Switch} from 'react-router-dom';

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

const Header = () => {
    return (

        <div className="header">
            <Switch>
                <Route exact path="/" component={MatchList}/>
                <Route exact path="/signUp" component={SignUp}/>
            </Switch>
            <NavLink exact to="/">Startseite</NavLink>
            <NavLink exact to="/logout">Logout</NavLink>
            <div style={styles.toolbar}>
                <div style={styles.logoContainer}>
                    LOGO
                    <NavLink exact to="/signUp">Test</NavLink>
                </div>
                <Tabs style={styles.tabs} inkBarStyle={styles.tabIndicator}>
                    <Tab label="Tippspiel" style={styles.tab}/>
                    <Tab label="Tippteam" style={styles.tab}/>
                    <Tab
                        label="Admin"
                        data-route="/Startseite"
                        style={styles.tab}
                    />
                    <NavLink exact to="/logout">Test</NavLink>
                </Tabs>
                <FlatButton rippleColor={colors.light} hoverColor="transparent" style={styles.avatarButton}>
                    <img id="avatar" style={styles.avatar} alt=""
                         src="https://api.adorable.io/avatars/100/HoangTran.png"/>
                </FlatButton>
            </div>
        </div>
    )
};


export default Header
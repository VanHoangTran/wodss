import React from 'react'
import {NavLink} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import {Tab, Tabs} from 'material-ui/Tabs';
import {colors, dimensions} from "../../util/constants";

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
    }
};

const Header = () => (
    <div className="header">
        <NavLink exact to="/">Startseite</NavLink>
        <NavLink exact to="/logout">Logout</NavLink>
        <div style={styles.toolbar}>
            <div style={styles.logoContainer}>
                LOGO
            </div>
            <Tabs style={styles.tabs} inkBarStyle={styles.tabIndicator}>
                <Tab label="Tippspiel" style={styles.tab}/>
                <Tab label="Tippteam" style={styles.tab}/>
                <Tab
                    label="Admin"
                    data-route="/Startseite"
                    style={styles.tab}
                />
            </Tabs>
            <FlatButton style={styles.} rippleColor={colors.light} hoverColor="transparent">
                asdfasdf asd
            </FlatButton>

        </div>
    </div>
);

export default Header
import React from 'react'
import {NavLink} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Tab, Tabs} from 'material-ui/Tabs';
import {dimensions} from "../../styles/dimensions";

const styles = {
    toolbar: {
        height: dimensions.toolbar,
        padding: 0,
    },
    tabs: {
        margin: 0,
    },
    tab: {
        paddingLeft: dimensions.defaultSpacing,
        paddingRight: dimensions.defaultSpacing,
    }
};

function handleActive(tab) {
    alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

const Header = () => (
    <div className="header">
        <NavLink exact to="/">Startseite</NavLink>
        <NavLink exact to="/logout">Logout</NavLink>

        <AppBar
            style={styles.toolbar}
            iconElementLeft={
                <div>
                    <Tabs style={styles.tabs}>
                        <Tab label="Item One" style={styles.tab}>
                        </Tab>
                        <Tab label="Item Two" style={styles.tab}>
                        </Tab>
                        <Tab
                            label="onActive"
                            data-route="/home"
                            onActive={handleActive}
                            style={styles.tab}
                        >
                        </Tab>
                    </Tabs>
                </div>
            }
            iconElementRight={<FlatButton label="Save"/>}
        />
    </div>

);

export default Header
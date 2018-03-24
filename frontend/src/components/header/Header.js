import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <div className="header">
        <NavLink to="/">Startseite</NavLink>
        <NavLink to="/logout">Logout</NavLink>
    </div>
)

export default Header
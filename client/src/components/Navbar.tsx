import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../constants'

const Navbar = () => {
    return (
        <div>
            <Link to={Routes.home}>Home</Link><br />
            <Link to={Routes.contacts}>Contacts</Link><br />
            <Link to={Routes.login}>Login</Link><br />
            <Link to={Routes.register}>Register</Link>
        </div>
    )
}

export default Navbar
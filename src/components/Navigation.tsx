/*
This component is the navigation bar.
*/
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Authorization } from "../models/types";
import { logOut } from '../actions';

interface Props {
    isAuthenticated: boolean | null
    token: string | null
    // user: User | null
    logOutConnect: () => void
}

const Navigation = ({ isAuthenticated, token, logOutConnect }: Props) => {
    const links = isAuthenticated ? (
        <>
            <li>
                <NavLink to="/home">
                    home
                </NavLink>
            </li>
            <li>
                <NavLink to="/marketplace">
                    marketplace
                </NavLink>
            </li>
            <li>
                <NavLink to="/chat">
                    chats
                </NavLink>
            </li>
        </>
    ) : (
            <>
                <li>
                    <NavLink to="/">
                        landing
                </NavLink>
                </li>
                <li>
                    <NavLink to="/about">
                        about
                </NavLink>
                </li>
            </>
        )
    const profileLinks = isAuthenticated ? (
        <>
            <li>
                <NavLink to="/account">
                    account
                </NavLink>
            </li>
            <li>
                <NavLink onClick={logOutConnect} to="/">
                    log out
                </NavLink>
            </li>
        </>
    ) : null



    return (
        <>
            <p>{isAuthenticated ? `Logged in user: Bob` : `Logged out`}</p>
            <div>
                <ul>
                    {links}
                </ul>
                <ul>
                    {profileLinks}
                </ul>
            </div>
        </>
    )

}

const mapStateToProps = (state: Authorization) => ({
    isAuthenticated: state.isAuthenticated,
    token: state.token,
    // user: state.user
})

const mapDispatchToProps = {
    logOutConnect: logOut
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)

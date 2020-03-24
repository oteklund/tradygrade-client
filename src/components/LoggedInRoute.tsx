import * as React from 'react'
import { Route } from 'react-router-dom'
import { connect } from "react-redux"
import Navigation from './Navigation'
import history from '../history'
import { Authorization } from '../models/types'

interface Props {
    exact?: boolean
    isAuthenticated: boolean | null
    path: string
    component: React.ComponentType<any>
}

const LoggedInRoute = ({
    component: Component,
    isAuthenticated,
    ...otherProps //why is this unused?
}: Props) => {
    if (isAuthenticated === false) {
        history.push("/landing")
        console.log("attempted to access a page that requires authorization, please log in to proceed.")
    }

    return (
        <>
            <Route
                render={otherProps => (
                    <>
                        <Navigation />
                        <Component {...otherProps} />
                    </>
                )}
            />
            <footer>
                <span>Logged in footer</span>
            </footer>
        </>
    )
}

const mapStateToProps = (state: Authorization) => ({
    isAuthenticated: state.isAuthenticated
})

export default connect(
    mapStateToProps
)(LoggedInRoute)

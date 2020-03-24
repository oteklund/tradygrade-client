import * as React from 'react'
import { Route } from 'react-router-dom'
import { connect } from "react-redux"
import Navigation from './Navigation'
import history from '../history'
import { StoreState } from '../models/types'

interface Props {
    exact?: boolean
    isAuthenticated: boolean | null
    path: string
    component: React.ComponentType<any>
}

const LoggedInRoute = ({
    component: Component,
    isAuthenticated,
    ...otherProps
}: Props) => {
    if (isAuthenticated === false) {
        history.push("/")
        console.log("attempted to access a page that requires authorization, please log in to proceed.")
    }

    return (
        <>
            <Route {...otherProps}
                render={otherProps => (
                    <>
                        <Navigation />
                        <Component {...otherProps} />
                    </>
                )}
            />
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps
)(LoggedInRoute)

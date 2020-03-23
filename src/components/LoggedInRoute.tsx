import * as React from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation'

interface Props {
    exact?: boolean
    path: string
    component: React.ComponentType<any>
}

const LoggedInRoute = ({
    component: Component,
    ...otherProps //why is this unused?
}: Props) => (
        <>
            <header>
                <Navigation />
            </header>
            <Route
                render={otherProps => (
                    <>
                        <Component {...otherProps} />
                    </>
                )}
            />
            <footer>
                <span>Logged in footer</span>
            </footer>
        </>
    )

export default LoggedInRoute

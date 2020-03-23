import * as React from "react"
import { Route } from "react-router-dom"

interface Props {
    exact?: boolean
    path: string
    component: React.ComponentType<any>
}

const LoggedOutRoute = ({
    component: Component,
    ...otherProps //why is this unused?
}: Props) => (
    <>
        <header>
            <span>Logged out header</span>
        </header>
        <Route
            render={otherProps => (
                <>
                    <Component {...otherProps} />
                </>
            )}
        />
    </>
)

export default LoggedOutRoute
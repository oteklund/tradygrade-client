/*
This component allows the user to log in.
*/
import React from 'react'
import { logIn } from "../../actions"
import { connect } from 'react-redux'

interface Props {
    logInConnect: () => void
}

const LogIn = ({logInConnect}: Props) => {
    return (
        <>
           <button onClick={logInConnect}>log in</button>
        </>
    )
}

const mapDispatchToProps = {
    logInConnect: logIn
}

export default connect(
    null,
    mapDispatchToProps,
) (LogIn)

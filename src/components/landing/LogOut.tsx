import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../actions'

interface Props {
    logOutConnect: () => void    
}

const LogOut = ({logOutConnect}: Props) => {
    return (
        <>
            <p>Logout component</p>
            <button onClick={logOutConnect}>log out</button>
        </>
    )
}

const mapDispatchToProps = {
    logOutConnect: logOut
}

export default connect(
    null,
    mapDispatchToProps
)(LogOut)

import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../actions/userActions'
import { User, StoreState } from "../../models/types"

interface Props {
    user: User
    logOutConnect: (user: User) => void    
}

const LogOut = ({logOutConnect, user}: any) => {
    return (
        <>
            <p>Logout component</p>
            <button onClick={() => logOutConnect(user)}>log out</button>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    user: state.user
})

const mapDispatchToProps = {
    logOutConnect: logOut
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogOut)

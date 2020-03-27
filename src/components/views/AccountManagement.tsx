/*
This component is the view where users can manage account details such as username, display image etc. Users can log out or terminate accounts here. Also displays items that the user currently has for sale. 
*/
import React, { useState } from 'react'
import { StoreState, User } from '../../models/types';
import { connect } from 'react-redux';

interface Props {
    user: User
}

const AccountManagement = ({ user }: any) => {
    
    const [userData, setUserData] = useState("")

    const getUserData = async () => {
        return (
            await fetch("http://localhost:4000/api/users/22", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((res: any) => res.json())
            .then((data: any) => setUserData(data.name))
        )
    }

    return (
        <div>
            <button onClick={getUserData}>get data</button>
            <span>{userData}</span>
        </div>
    )
}

const mapStateToProps = (state: StoreState) => ({
    user: state.user
  });

export default connect(mapStateToProps)(AccountManagement)

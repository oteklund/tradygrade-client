/*
This component is the view where users can manage account details such as username, display image etc. Users can log out or terminate accounts here. Also displays items that the user currently has for sale. 
*/
import React, { useState, useEffect } from 'react'
import { StoreState, User } from '../../models/types';
import { connect } from 'react-redux';
import "./AccountManagement.scss"

interface Props {
    user: User
}

const AccountManagement = ({ user }: any) => {
    
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        image_url: user.image_url
    })

    const getUserData = async () => {
        return (
            await fetch(`http://localhost:4000/api/users/${user.id}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((res: any) => res.json())
            .then((data: any) => setUserData(data))
        )
    }

    const openEditUserData = () => {
        //logic
    }

    // useEffect(() => {
    //     getUserData()
    //     //eslint-disable-next-line
    // }, [])

    return (
        <div className="account-management-container">
            <span>{user.name}</span>
            <br/>
            <span>{user.email}</span>
            <br/>
            <img src="image_url" alt="user"/>
        </div>
    )
}

const mapStateToProps = (state: StoreState) => ({
    user: state.user
  });

export default connect(mapStateToProps)(AccountManagement)

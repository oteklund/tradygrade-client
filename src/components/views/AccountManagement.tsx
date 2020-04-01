/*
This component is the view where users can manage account details such as username, display image etc. Users can log out or terminate accounts here. Also displays items that the user currently has for sale. 
*/
import React, { useState, useEffect } from "react";
import { StoreState, User } from "../../models/types";
import { connect } from "react-redux";
import icon from "../../pictures/tradyheadorange.png";
import "./AccountManagement.scss";

interface Props {
  user: User;
}

const AccountManagement = ({ user }: any) => {
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    image_url: user.image_url
  });

  const getUserData = async () => {
    return await fetch(`http://localhost:4000/api/users/${user.id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user.token
      }
    })
      .then((res: any) => res.json())
      .then((data: any) => setUserData(data));
  };

  const openEditUserData = () => {
    //logic
  };

  // useEffect(() => {
  //     getUserData()
  //     //eslint-disable-next-line
  // }, [])

  return (
    <div className="account-management-container">
      <div className="account-management-user-picture">
        <img src={userData.image_url || icon} alt={userData.name} />
      </div>
      <div className="account-management-user-info">
        <div id="div1">username:</div><div id="div2"><h3>{userData.name}</h3></div>
        <br />
        <div id="div1">email:</div><div id="div2"><p>{userData.email}</p></div>
        <br />
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user
});

export default connect(mapStateToProps)(AccountManagement);

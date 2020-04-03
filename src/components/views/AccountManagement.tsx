/*
This component is the view where users can manage account details such as username, display image etc. Users can log out or terminate accounts here. Also displays items that the user currently has for sale. 
*/
import React, { useState, useEffect } from "react";
import moment from "moment";
import { StoreState, User, Item } from "../../models/types";
import { History, LocationState } from "history";
import history from "../../history";
import { connect } from "react-redux";
import icon from "../../pictures/tradyheadorange.png";
import "./AccountManagement.scss";

interface Props {
  user: User;
  items: Item[];
  history: History<LocationState>;
}

const AccountManagement = ({ user, items }: any) => {
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    image_url: user.image_url
  });
  const [myItems, setMyItems] = useState<Array<any>>([]);

  useEffect(() => {
    getMyStuff();
  }, []);

  const getMyStuff = () => {
    items.map((item: Item) =>
      item.seller.id === user.id
        ? setMyItems(myItems => [...myItems, item])
        : null
    );
  };

  const goBack = (e: any): void => {
    history.goBack();
  };

  return (
    <div className="my-account">
      <div className="account-management-container">
        <div className="account-management-user-picture">
          <img src={userData.image_url || icon} alt={userData.name} />
        </div>
        <div className="account-management-user-info">
          <div id="div1">username:</div>
          <div id="div2">
            <h3>{userData.name}</h3>
          </div>
          <br />
          <div id="div1">email:</div>
          <div id="div2">
            <p>{userData.email}</p>
          </div>
          <br />
        </div>
      </div>
      <div className="item-management-container">
          <button className="go-back-button" onClick={goBack}>
            Go back
          </button>
        <h1>My stuff</h1>
        <div className="my-item-list">
          {myItems.map(item => (
            <div
              className="my-item"
              key={item.item.id}
              onClick={() => history.push(`/marketplace/${item.item.id}`)}
            >
              <p>
                {item.item.name} / {item.item.price}€
              </p>
              <img
                className="my-item-picture"
                src={item.item.pictureURL}
                height="100px"
              />
              <p>Listed By: {item.seller.name}</p>
              <p className="dash-date">
                {moment(item.item.listedAt).format("DD-MM-YYYY")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
  items: state.items
});

export default connect(mapStateToProps)(AccountManagement);

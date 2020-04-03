/*
This component displays the profile of the user
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
  location: any;
  users: User[];
  items: Item[];
  history: History<LocationState>;
  match: any;
}

const UserProfile = ({ users, items, location, history, match }: Props) => {
  const [myItems, setMyItems] = useState<Array<any>>([]);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    let currentUser = users.find(user => user.name === match.params.name);
    setUser(currentUser);
    getMyStuff();
  }, []);

  const getMyStuff = () => {
    items.map((item: Item) =>
      item.seller.name === match.params.name
        ? setMyItems(myItems => [...myItems, item])
        : null
    );
  };

  const goBack = (e: any): void => {
    history.goBack();
  };
  if (user) {
    return (
      <div className="my-account">
        <div className="account-management-container">
          <div className="account-management-user-picture">
            <img src={user.image_url || icon} alt={user.name} />
          </div>
          <div className="account-management-user-info">
            <div id="div1">username:</div>
            <div id="div2">
              <h3>{user.name}</h3>
            </div>
            <br />
            <div id="div1">email:</div>
            <div id="div2">
              <p>{user.email}</p>
            </div>
            <br />
          </div>
        </div>
        <div className="item-management-container">
          <button className="go-back-button" onClick={goBack}>Go back</button>
          <h1>{user.name}'s stuff</h1>
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
  } else {
    return <p>Loading details, please wait...</p>;
  }
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
  users: state.users,
  items: state.items
});

export default connect(mapStateToProps)(UserProfile);

/*
This component is for viewing and buying an existing item. The owner of the item may also edit item details. For posting a new item see component NewSalesItem.
*/

import { updateItem, deleteItem } from "../../actions/";
import { TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
import "./SalesItem.scss";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { StoreState, Item, User } from "../../models/types";
import { connect } from "react-redux";
import moment from "moment";
import history from "../../history";
import { start } from "repl";
import { usersReducer } from "../../reducers/users";
import { newChat, getChatID } from "../../services/chat";
import { getUser } from "../../services/users";
import Swal from "sweetalert2";
import axios from "axios";

interface Props {
  match: any;
  items: Item[];
  updateItem: (item: any) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  user: User | any;
}

const SalesItem = ({ items, match, user, updateItem, deleteItem }: Props) => {
  const [item, setItem] = useState<Item | undefined>();
  const [editing, setEditing] = useState<boolean>(false);

  // Item details
  const [itemId, setItemId] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [price, setPrice] = useState<any>();
  const [listed, setListed] = useState<any>();
  const [expiration, setExpiration] = useState<any>();
  const [condition, setCondition] = useState<string | undefined>();
  const [pictureUrl, setPictureUrl] = useState<string | undefined>();

  useEffect(() => {
    let matchingItem = items.find(
      (item: Item) => item.item.id == String(match.params.itemid)
    );
    setItem(matchingItem);
    setItemId(matchingItem?.item.id);
    setName(matchingItem?.item.name);
    setDescription(matchingItem?.item.description);
    setCategory(matchingItem?.item.category);
    setPrice(matchingItem?.item.price);
    setListed(matchingItem?.item.listedAt);
    setExpiration(matchingItem?.item.expires);
    setCondition(matchingItem?.item.condition);
    setPictureUrl(matchingItem?.item.pictureURL);
    //eslint-disable-next-line
  }, [match.params.id]);

  const handleBuy = async (e: SyntheticEvent) => {
    if (item?.seller.id) {
      let response: User | null = await getUser(item?.seller.id);
      if (response) {
        let sellerEmail = response.email;
        console.log(sellerEmail);
        Swal.fire({
          title: "Are you sure you really want to purchase this product?",
          text:
            "Seller will be informed via email with your contact details included",
          icon: "info",
          showCancelButton: true
        }).then(result => {
          if (result.value) {
            (window as any).Email.send({
              Host: process.env.REACT_APP_TRADY_HOST,
              Username: process.env.REACT_APP_TRADY_EMAIL,
              Password: process.env.REACT_APP_TRADY_PASSWORD,
              To: `${sellerEmail}`,
              From: "tradygrade@gmail.com",
              Subject: `${user.name} wants to buy ${item?.item.name}!`,
              Body: `Hello, ${item?.seller.name}! <br> <br>
              ${user.name} has told us he/she wants to buy your ${item?.item.name}. <br>
              His/her email is ${user.email}, please contact him as soon as possible! <br> <br>
              Best Regards, <br>
              TradyGrade Team`
            });
            Swal.fire(
              "Email sent!",
              "Seller will get back to you as soon as possible!",
              "success"
            );
          } else {
            Swal.fire("Cancelled", "No email was sent!", "error");
          }
        });
      }
    }
  };

  const handleChat = async (e: SyntheticEvent) => {
    if (item && user.id) {
      try {
        let chatExists = await getChatID(user.id, item.seller.id);
        if (!chatExists) {
          let response = await newChat({
            user1: user.id,
            user2: item.seller.id
          });
          history.push(`/chat/${response.id}/${item.seller.name}`);
        } else {
          history.push(`/chat/${chatExists}/${item.seller.name}`);
        }
      } catch (error) {
        alert(
          "Something went wrong! Please try to start the chat by clicking the Chat-icon from the navigation!"
        );
      }
    }
  };

  const handleProfileClick = (e: SyntheticEvent): void => {
    if (item) {
      let userUrlParam = item.seller.name.replace(/\s/, "");
      history.push({
        pathname: `/users/${userUrlParam}`,
        state: { name: item.seller.name }
      });
    }
  };

  const editItem = () => {
    editing ? setEditing(false) : setEditing(true);
  };

  const deleteThisItem = (id: string) => {
    deleteItem(id);
    history.push(`/marketplace/`);
  };

  const goBack = (e: any): void => {
    history.goBack();
  };

  const handleCategoryChange = (e: any): void => {
    setCategory(e.target.value);
  };

  const handleConditionChange = (e: any): void => {
    setCondition(e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    updateItem({
      itemId,
      name,
      description,
      sold: false,
      category,
      sellerId: user.id,
      price: parseFloat(price),
      listedAt: new Date(listed),
      expires: new Date(expiration),
      condition,
      pictureURL: pictureUrl
    });
    history.push(`/marketplace/`);
  };

  if (item) {
    return (
      <div className="item-item-container">
        <div className="item-info-edit-container">
          <div className="item-content">
            <div>
              <div className="item-text-content">
                <img className="item-picture" src={item.item.pictureURL} />
                <br/>
                <div className="item-price-and-title">
                <h3 className="item-title">{item.item.name}</h3>
                <h3 className="item-price">{`${item.item.price} €`}</h3>
                </div>
                {item.seller.name !== user.name ? (
                  <div>
                    <div
                      className="seller"
                      onClick={e => handleProfileClick(e)}
                      title="Go to user profile"
                    >
                      {item.seller.name}
                    </div>
                  </div>
                ) : null}
                <div>{item.item.description}</div>
                <p>Condition: {item.item.condition}</p>
                <p>Listed: {moment(item.item.listedAt).format("DD-MM-YYYY")}</p>
                <p>
                  Expiring: {moment(item.item.expires).format("DD-MM-YYYY")}
                </p> 
                  
              </div>
              {item.seller.name !== user.name ? (
                <div className="sales-item-buttons-for-buyer">
                  <button className="item-button" onClick={handleBuy}>
                    Buy Item
                  </button>
                  <br />
                  <button className="item-button" onClick={handleChat}>
                    Chat With Seller
                  </button>
                  <br />
                  <button className="item-button" onClick={goBack}>
                    Go Back
                  </button>
                </div>
              ) : (
                <div className="sales-item-buttons-for-seller">
                  <button className="item-button" onClick={editItem}>
                    Edit
                  </button>
                  <br />
                  <button
                    className="item-button"
                    onClick={() => deleteThisItem(item.item.id)}
                  >
                    Delete
                  </button>
                  <br />
                  <button className="item-button" onClick={goBack}>
                    Go Back
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="edit-item">
            {editing ? (
              <div className="edit-item-block">
                <div className="edit-item">
                  <form
                    className="edit-item-form"
                    onSubmit={e => handleSubmit(e)}
                  >
                    <h2>Edit {item.item.name}</h2>
                    <div className="input-group-edit">
                      <TextField
                        value={name}
                        id="product-name"
                        label="Product Name"
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="input-group-edit">
                      <TextField
                        value={description}
                        id="product-description"
                        label="Description"
                        onChange={e => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="input-group-edit">
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        value={category}
                        labelId="category-label"
                        onChange={handleCategoryChange}
                      >
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Vehicles & Accessories">
                          Vehicles & Accessories
                        </MenuItem>
                        <MenuItem value="Fashion">Fashion</MenuItem>
                        <MenuItem value="Books, Movies & Music">
                          Books, Movies & Music
                        </MenuItem>
                        <MenuItem value="Collectibles">Collectibles</MenuItem>
                        <MenuItem value="Home & Garden">Home & Garden</MenuItem>
                        <MenuItem value="Health & Beauty">
                          Health & Beauty
                        </MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </div>
                    <div className="input-group-edit">
                      <TextField
                        value={price}
                        id="product-price"
                        label="Price (€)"
                        onChange={e => setPrice(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="input-group-edit">
                      <InputLabel>Expiration date</InputLabel>
                      <TextField
                        value={expiration}
                        type="date"
                        onChange={e =>
                          setExpiration(
                            moment(e.target.value).format("YYYY-MM-DD")
                          )
                        }
                      />
                    </div>
                    <div className="input-group-edit">
                      <InputLabel id="item-condition">Condition</InputLabel>
                      <Select
                        labelId="item-condition"
                        value={condition}
                        id="condition"
                        onChange={handleConditionChange}
                      >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Like new">Like new</MenuItem>
                        <MenuItem value="Very good">Very good</MenuItem>
                        <MenuItem value="Good">Good</MenuItem>
                        <MenuItem value="Acceptable">Acceptable</MenuItem>
                        <MenuItem value="Poor">Poor</MenuItem>
                      </Select>
                    </div>
                    <div className="input-group-edit">
                      <TextField
                        value={pictureUrl}
                        id="product-picture"
                        label="Picture URL"
                        onChange={e => setPictureUrl(e.target.value)}
                      />
                    </div>
                    <button className="item-button" type="submit">
                      Submit
                    </button>
                    <button
                      className="item-button"
                      onClick={e => {
                        e.preventDefault();
                        history.push("/marketplace");
                      }}
                    >
                      Go Back to Market Place
                    </button>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading, please wait...</p>;
  }
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items,
  user: state.user
});

export default connect(mapStateToProps, { updateItem, deleteItem })(SalesItem);

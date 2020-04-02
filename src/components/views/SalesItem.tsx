/*
This component is for viewing and buying an existing item. The owner of the item may also edit item details. For posting a new item see component NewSalesItem.
*/

import "./SalesItem.scss";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { StoreState, Item, User, Item2 } from "../../models/types";
import { updateItem } from "../../actions/";
import history from "../../history";
import { start } from "repl";
import { usersReducer } from "../../reducers/users";
import { TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
// import { RouteProps } from 'react-router';

interface Props {
  match: any;
  items: Item[];
  user: any;
  updateItem: (item: any) => Promise<void>;
}

const SalesItem = ({ items, match, user, updateItem }: Props) => {
  const [item, setItem] = useState<Item | undefined>();
  const [editing, setEditing] = useState<boolean>(false);

  // Item details
  const [itemId, setItemId] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [price, setPrice] = useState<any>();
  const [listed, setListed] =useState<any>();
  const [expiration, setExpiration] = useState<any>();
  const [condition, setCondition] = useState<string | undefined>();
  const [pictureUrl, setPictureUrl] = useState<string | undefined>();

  useEffect(() => {
    let matchingItem = items.find(
      (item: Item) => item.item.id == String(match.params.itemid)
    );
    setItem(matchingItem);
    setItemId(matchingItem?.item.id)
    setName(matchingItem?.item.name);
    setDescription(matchingItem?.item.description);
    setCategory(matchingItem?.item.category);
    setPrice(matchingItem?.item.price);
    setListed(matchingItem?.item.listedAt)
    setExpiration(matchingItem?.item.expires);
    setCondition(matchingItem?.item.condition);
    setPictureUrl(matchingItem?.item.pictureURL);
    //eslint-disable-next-line
  }, [match.params.id]);

  const handleProfileClick = (e: any): void => {
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
    history.push(`/marketplace/${itemId}`);
  };

  if (item) {
    return (
      <div className="item-item-container">
        <div className="item-info-edit-container">
          <div className="item-content">
            <img className="item-picture" src={item.item.pictureURL} />
            <h3>{item.item.name}</h3>
            <p>Seller</p>
            <div>
              {item.seller.name}
              <button onClick={e => handleProfileClick(e)}>View Profile</button>
            </div>
            <p>Description</p>
            <div>{item.item.description}</div>
            <p>Condition</p>
            <div>{item.item.condition}</div>
            <p>Listed at</p>
            <div>{moment(item.item.listedAt).format("DD-MM-YYYY")}</div>
            <p>Price</p>
            <div>
              <b>{`${item.item.price} €`}</b>
            </div>
            {item.seller.name !== user.name ? (
              <div className="sales-item-buttons-for-buyer">
                <button>Buy Item</button>
                <button>Chat With Seller</button>
                <br />
                <button onClick={goBack}>Go Back</button>
              </div>
            ) : (
              <div className="sales-item-buttons-for-seller">
                <button onClick={editItem}>Edit</button>
                <button>Delete</button>
                <br />
                <button onClick={goBack}>Go Back</button>
              </div>
            )}
          </div>
          <div className="edit-item">
            {editing ? (
              <div className="edit-item-block">
                <div className="new-item">
                  <form
                    className="new-item-form"
                    onSubmit={e => handleSubmit(e)}
                  >
                    <h2>Edit {item.item.name}</h2>
                    <div className="input-group-new">
                      <TextField
                        value={name}
                        id="product-name"
                        label="Product Name"
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="input-group-new">
                      <TextField
                        value={description}
                        id="product-description"
                        label="Description"
                        onChange={e => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="input-group-new">
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
                    <div className="input-group-new">
                      <TextField
                        value={price}
                        id="product-price"
                        label="Price (€)"
                        onChange={e => setPrice(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="input-group-new">
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
                    <div className="input-group-new">
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
                    <div className="input-group-new">
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
                      Go Back
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

export default connect(mapStateToProps, { updateItem })(SalesItem);

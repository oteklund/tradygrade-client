/*
This component displays paginated results of a search. 
*/
import React, { useEffect, useState } from 'react';
import { User, StoreState, IItem } from '../../models/types';
import { connect } from 'react-redux';

interface Props {
  location: any;
  items: IItem[];
}

const SearchResults = (props: Props) => {
  //   const [matchingItems, setMatchingItems] = useState<IItem[]>([]);

  //   useEffect(() => {
  //     fetchMatchingItems();
  //   });

  //   const fetchMatchingItems = () => {
  //       let matchingItems = props.items.map(item => (

  //       ))
  //   };
  return (
    <div>
      <div>
        <h3>Matching users</h3>
        {props.location.state.map((user: User) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
      <div>
        <h3>Matching products</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items
});

export default connect(mapStateToProps)(SearchResults);

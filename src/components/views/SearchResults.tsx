/*
This component displays paginated results of a search. 
*/
import React from 'react';
import { User } from '../../models/types';

interface Props {
  location: any;
}

const SearchResults = (props: Props) => {
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

export default SearchResults;

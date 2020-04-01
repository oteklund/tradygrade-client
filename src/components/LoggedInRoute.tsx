import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import { StoreState, User } from '../models/types';
import Search from './dashboard/Search';
import SearchResults from './views/SearchResults';

interface Props {
  exact?: boolean;
  user: User;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedInRoute = ({ component: Component, user, ...otherProps }: any) => {

  return (
    <>
      <Route
        {...otherProps}
        render={otherProps => (
          // check for auth status and redirect accordingly
          user.isAuthenticated ?
          <>
            <Navigation />
            <Search {...otherProps} />
            <Component {...otherProps} />
          </>
          : <Redirect to="/" />
        )}
      />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user
});

export default connect(mapStateToProps)(LoggedInRoute);

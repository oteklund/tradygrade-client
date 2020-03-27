import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import history from '../history';
import { StoreState, User } from '../models/types';

interface Props {
  exact?: boolean;
  user: User;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedInRoute = ({
  component: Component,
  user,
  ...otherProps
}: any) => {
  if (!user.isAuthenticated) {
    history.push('/');
    console.log(
      'attempted to access a page that requires authorization, please log in to proceed.'
    );
  }

  return (
    <>
      <Route
        {...otherProps}
        render={otherProps => (
          <>
            <Navigation />
            <Component {...otherProps} />
          </>
        )}
      />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user
});

export default connect(mapStateToProps)(LoggedInRoute);

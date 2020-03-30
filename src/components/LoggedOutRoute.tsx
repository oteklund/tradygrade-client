import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import history from '../history';
import { User, StoreState } from '../models/types';

interface Props {
  exact?: boolean;
  user: User
  path: string;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
  user,
  ...otherProps //why is this unused?
}: any) => {
  if (user.isAuthenticated) {
    history.push('/home');
    console.log(
      'Attempted to access a route that is available only if you are logged out, redirecting to dashboard.'
    );
  }

  return (
    <>
      <Route
        render={otherProps => (
          <>
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

export default connect(mapStateToProps)(LoggedOutRoute);

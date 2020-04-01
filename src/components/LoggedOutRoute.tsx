import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
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
  ...otherProps
}: any) => {

  return (
    user.isAuthenticated ?
    <Redirect to="/home" />
    :
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

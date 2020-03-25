import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import history from '../history';
import { Authorization } from '../models/types';
import Navigation from './Navigation';

interface Props {
  exact?: boolean;
  isAuthenticated: boolean | null;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps //why is this unused?
}: Props) => {
  if (isAuthenticated === true) {
    history.push('/home');
    console.log(
      'Attempted to access a route that is available only if you are logged out, please log out to proceed.'
    );
  }

  return (
    <>
      <Route
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

const mapStateToProps = (state: Authorization) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(LoggedOutRoute);

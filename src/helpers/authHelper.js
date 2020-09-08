import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser, isExpired } from './Utils';

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const setComponent = (props) => {
    const currentUser = getCurrentUser();
    if (
      currentUser &&
      currentUser.token &&
      !isExpired(currentUser.tokenTime, 6)
    ) {
      return <Component {...props} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      );
    }
  };

  return <Route {...rest} render={setComponent} />;
};


export { ProtectedRoute };

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { routes } from "../assets/routes";
import { get_token } from "./api";

const PrivateRoute = props => {
  const {component: Component} = props
  const renderRoute = props => {
    if (get_token()) {
      return <Component {...props} />;
    } else {
      return <Redirect to={routes.SIGN_IN} />;
    }
  }

  return (
      <Route path={props.route} render={renderRoute}/>
  );
};

PrivateRoute.propTypes = {
  route: PropTypes.string,
  component: PropTypes.any,
};

export default PrivateRoute;
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { routes } from "../assets/routes";
import { get_token, get_user_info } from "./api";

const PrivateRoute = props => {
  const {component: Component} = props
  const renderRoute = props => {
    if (get_token() && get_user_info().exp > new Date().getTime()) {
      return <Component {...props} />;
    } else {
      return <Redirect to={routes.SIGN_IN}/>;
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
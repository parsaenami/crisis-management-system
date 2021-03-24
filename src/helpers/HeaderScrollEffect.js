import { Slide, useScrollTrigger } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

export const HeaderScrollEffect = props => {
  const {children, window} = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

HeaderScrollEffect.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
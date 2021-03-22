import { Slide, useScrollTrigger } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

export const HeaderScrollEffect = props => {
  const {children, window} = props;
  const trigger = useScrollTrigger({target: window ? window() : undefined});

  return (
      <Slide appear={false} direction="down" in={!trigger}>
        {React.cloneElement(children, {
          elevation: trigger ? 4 : 0,
        })}
      </Slide>
  );
}

HeaderScrollEffect.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from "@material-ui/core";

const Loader = props => {
  return (
      <Backdrop open className="backdrop">
        <CircularProgress style={{color: props.color}} className="loading" size={props.size}/>
      </Backdrop>
  );
};

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Loader.defaultProps = {
  size: 70,
}

export default Loader;
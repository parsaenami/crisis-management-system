import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from "./CustomButton";
import { CircularProgress } from "@material-ui/core";

const Fab = props => {
  return (
      <div className={"fabContainer"}>
        {props.buttons.map((btn, i) => (
            <CustomButton
                key={i}
                variant={"contained"}
                onClick={btn.onClickFn}
                size={"large"}>
              {btn.loading ? <CircularProgress size={26}/> :btn.title}
            </CustomButton>
        ))}
      </div>
  );
};

Fab.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    loading: PropTypes.bool,
    title: PropTypes.string,
    onClickFn: PropTypes.func,
  }))
};

export default Fab;
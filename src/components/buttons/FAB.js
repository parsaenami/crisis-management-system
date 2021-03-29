import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from "./CustomButton";

const Fab = props => {
  return (
      <div className={"fabContainer"}>
        {props.buttons.map((btn, i) => (
            <CustomButton
                key={i}
                variant={"contained"}
                onClick={btn.onClickFn}
                size={"large"}>
              {btn.title}
            </CustomButton>
        ))}
      </div>
  );
};

Fab.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    onClickFn: PropTypes.func,
  }))
};

export default Fab;
import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    width: '100%',
    height: '100%',
    overflow: "auto",
  },
}));

const CardSlider = props => {
  const classes = useStyles();

  return (
      <div className={classes.cardContainer}>
        {props.children}
      </div>
  );
};

CardSlider.propTypes = {};

export default CardSlider;
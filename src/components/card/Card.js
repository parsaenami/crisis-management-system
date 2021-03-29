import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles, SvgIcon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 100,
    minWidth: 100,
    transition: "ease .3s",
    cursor: "pointer",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: theme.spacing(.5),
    backgroundColor: theme.palette.info.light,
    color: theme.palette.primary.main,
    padding: theme.spacing(1.5),
    margin: theme.spacing(1, .5),
    '&:first-child': {
      marginRight: theme.spacing(0),
    },
    '&:last-child': {
      marginLeft: theme.spacing(0),
    },
    '&.selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.info.light,
    },
    '&:hover': {
      boxShadow: "0 0 3px 1px",
    },
  },
  body: {
    height: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: "100%",
    fontSize: theme.spacing(4),
    '& + div': {
      marginTop: theme.spacing(1),
    },
  },
}));

const Card = props => {
  const classes = useStyles();

  return (
      <div
          key={props.k}
          className={classnames(classes.container, {'selected': props.selected})}
          onClick={props.onClick}
      >
        {props.icon && <SvgIcon component={props.icon} className={classes.icon} viewBox="0 0 512 512"/>}
        <div className={classes.body}>
          {props.children}
        </div>
      </div>
  );
};

Card.propTypes = {
  icon: PropTypes.elementType,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  k: PropTypes.any,
};

export default Card;
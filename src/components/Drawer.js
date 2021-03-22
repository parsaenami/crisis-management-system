import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, IconButton, List, ListItem, ListItemText, SwipeableDrawer } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
  },
  close: {
    display: "flex",
    justifyContent: "flex-start",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: '100%',
    '& span': {
      textAlign: "center",
    },
  },
}));

const listItems = ['صفحه‌ی اصلی', 'ثبت نیاز', 'ورود | ثبت‌نام', 'درباره‌ی ما'];

const Drawer = props => {
  const classes = useStyles();

  const list = (
      <div className={classes.list} role="presentation" onClick={props.toggleFn(false)}>
        <List>
          {listItems.map((text, index) => (
              <>
                <ListItem button key={text}>
                  <ListItemText primary={text}/>
                </ListItem>
                {index !== listItems.length - 1 && <Divider/>}
              </>
          ))}
        </List>
      </div>
  )

  return (
      <SwipeableDrawer anchor="right" open={props.open} onClose={props.toggleFn(false)} onOpen={props.toggleFn(true)}>
        <div className={classes.close}>
          <IconButton edge="end" className={classes.icon} aria-label="close" onClick={props.toggleFn(false)}>
            <CloseIcon/>
          </IconButton>
        </div>
        {list}
      </SwipeableDrawer>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool,
  toggleFn: PropTypes.func,
};

export default Drawer;
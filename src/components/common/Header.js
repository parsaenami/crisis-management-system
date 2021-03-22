import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button, Divider,
  IconButton,
  List,
  ListItem,
  ListItemText, SwipeableDrawer,
  Toolbar
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { HeaderScrollEffect } from "../helpers/HeaderScrollEffect";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "../Drawer";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: "auto",
    color: theme.palette.text.secondary,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
}));

const Header = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
      <HeaderScrollEffect {...props}>
        <AppBar position={"sticky"}>
          <Toolbar>
            <Button className={classes.btn} color="inherit">ورود | ثبت‌نام</Button>
            {props.title}
            <IconButton edge="end" className={classes.icon} aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon/>
            </IconButton>
            <Drawer open={open} toggleFn={toggleDrawer}/>
          </Toolbar>
        </AppBar>
      </HeaderScrollEffect>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
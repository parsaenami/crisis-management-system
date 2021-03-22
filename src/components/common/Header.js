import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { HeaderScrollEffect } from "../helpers/HeaderScrollEffect";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "./Drawer";
import { NavLink } from "react-router-dom";
import { routes } from "../../assets/routes";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: "auto",
    color: theme.palette.text.secondary,
  },
  icon: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('md')]: {
      display: "none",
    }
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
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
        <AppBar position={"fixed"} className={classes.header}>
          <Toolbar>
            <NavLink to={routes.SIGN_IN} className={classes.btn}>
              <Button color="inherit">ورود | ثبت‌نام</Button>
            </NavLink>
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
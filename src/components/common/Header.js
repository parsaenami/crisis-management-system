import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, Container, IconButton, Toolbar } from "@material-ui/core";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { HeaderScrollEffect } from "../../helpers/HeaderScrollEffect";
import { makeStyles } from "@material-ui/core/styles";
import NavDrawer from "./NavDrawer";
import { NavLink } from "react-router-dom";
import { routes } from "../../assets/routes";
import classnames from "classnames";
import Logo from '../../assets/icons/helping-hand2.svg';

const useStyles = makeStyles((theme) => ({
  btn: {
    color: theme.palette.text.secondary,
    '&#home': {
      [theme.breakpoints.up('md')]: {
        display: "none",
      },
    },
    '& img': {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  navContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    justifySelf: "flex-start",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  },
  icon: {
    color: theme.palette.text.secondary,
    marginLeft: "auto",
    [theme.breakpoints.up('md')]: {
      display: "none",
    },
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
    margin: theme.spacing(0, -2),
    right: "unset",
    borderRadius: "0 0 8px 8px",
  },
  container: {
    padding: 0,
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
          <Container maxWidth="lg" className={classes.container}>
            <Toolbar>
              {
                props.location.pathname === routes.HOME
                    ?
                    <NavLink to={routes.SIGN_IN} className={classes.btn} id={'home'}>
                      <Button color="inherit">ورود | ثبت‌نام</Button>
                    </NavLink>
                    :
                    <NavLink to={routes.HOME} className={classes.btn}>
                      <IconButton edge="start"><img src={Logo} alt="logo"/></IconButton>
                    </NavLink>
              }
              {/*{props.title}*/}
              {
                <div className={classes.navContainer}>
                  <NavLink exact to={routes.HOME} className={classes.btn}>
                    <Button color="inherit">صفحه‌ی اصلی</Button>
                  </NavLink>
                  <NavLink to={routes.ADD_NEED} className={classes.btn}>
                    <Button color="inherit">ثبت نیاز</Button>
                  </NavLink>
                  <NavLink to={routes.ABOUT} className={classes.btn}>
                    <Button color="inherit">درباره‌ی ما</Button>
                  </NavLink>
                  <NavLink to={routes.PROFILE} className={classes.btn}>
                    <Button color="inherit">پروفایل</Button>
                  </NavLink>
                  <NavLink to={routes.SIGN_IN} className={classes.btn}>
                    <Button color="inherit">ورود | ثبت‌نام</Button>
                  </NavLink>
                </div>
              }
              <IconButton edge="end" className={classes.icon} aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuRoundedIcon/>
              </IconButton>
              <NavDrawer open={open} toggleFn={toggleDrawer}/>
            </Toolbar>
          </Container>
        </AppBar>
      </HeaderScrollEffect>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
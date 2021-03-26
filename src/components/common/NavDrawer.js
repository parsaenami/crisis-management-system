import React from 'react';
import PropTypes from 'prop-types';
import { Divider, IconButton, List, ListItem, ListItemText, Drawer } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { routes } from "../../assets/routes";
import { NavLink } from "react-router-dom";
import { Swipe } from "react-swipe-component";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
  },
  nav: {
    color: theme.palette.text.secondary,
  },
  close: {
    display: "flex",
    justifyContent: "flex-end",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: theme.spacing(30),
    height: '100%',
    '& *': {
      textAlign: "center",
      justifyContent: "center",
    },
  },
  swipeArea: {
    width: theme.spacing(2),
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
  },
}));

const listItems = [
  {
    text: 'صفحه‌ی اصلی',
    url: routes.HOME,
  },
  {
    text: 'ورود | ثبت‌نام',
    url: routes.SIGN_IN,
  },
  {
    text: 'پروفایل',
    url: routes.PROFILE,
  },
  {
    text: 'ثبت نیاز',
    url: routes.ADD_NEED,
  },
  {
    text: 'درباره‌ی ما',
    url: routes.ABOUT,
  },
];

const NavDrawer = props => {
  const classes = useStyles();

  const list = (
      <div className={classes.list} role="presentation" onClick={props.toggleFn(false)}>
        <List>
          {listItems.map((navItem, index) => (
              <div key={navItem.text}>
                <ListItem button>
                  <NavLink exact to={navItem.url} className={classes.nav}>
                    <ListItemText primary={navItem.text}/>
                  </NavLink>
                </ListItem>
                {index !== listItems.length - 1 && <Divider/>}
              </div>
          ))}
        </List>
      </div>
  )

  return (
      <nav>
        <Swipe
            nodeName="div"
            onSwipedLeft={props.toggleFn(true)}
            detectTouch
        >
          <div className={classes.swipeArea}/>
        </Swipe>

        <Drawer anchor="left" open={props.open} onClose={props.toggleFn(false)}>
          <div className={classes.close}>
            <IconButton edge="end" className={classes.icon} aria-label="close" onClick={props.toggleFn(false)}>
              <CloseIcon/>
            </IconButton>
          </div>
          {list}
        </Drawer>
      </nav>
  );
};

NavDrawer.propTypes = {
  open: PropTypes.bool,
  toggleFn: PropTypes.func,
};

export default NavDrawer;
import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { routes } from "../../assets/routes";
import { NavLink } from "react-router-dom";
import { Swipe } from "react-swipe-component";
import Footer from "./Footer";
import { Context, UserContext } from "../../Context";
import { get_token } from "../../helpers/api";
import AccessDenied from "./AccessDenied";

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

const NavDrawer = props => {
  const classes = useStyles();
  const {isAdmin} = useContext(UserContext);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const history = useHistory();

  const listItems = [
    {
      text: 'صفحه‌ی اصلی',
      url: routes.HOME,
    },
    {
      text: get_token() ? 'پروفایل' : 'ورود | ثبت‌نام',
      url: get_token() ? routes.PROFILE : routes.SIGN_IN,
    },
    {
      text: 'ثبت نیاز',
      url: routes.ADD_NEED,
    },
    {
      text: 'درباره‌ی ما',
      url: routes.ABOUT,
    },
    {
      text: 'پنل ادمین',
      url: routes.ADMIN,
    },
  ];

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    if (get_token()) {
      history.push(routes.ADD_NEED)
    } else {
      setDialogOpen(true);
    }
  };

  const list = (
    <div className={classes.list} role="presentation" onClick={props.toggleFn(false)}>
      <List>
        {listItems.map((navItem, index) => (
          <div key={navItem.text}>
            <ListItem button>
              {navItem.text === 'ثبت نیاز'
                ? (get_token()
                  ? <NavLink to={routes.ADD_NEED} className={classes.nav}>
                    <Button color="inherit">ثبت نیاز</Button>
                  </NavLink>
                  : <div onClick={handleDialogOpen} className={classes.nav}>
                    <Button color="inherit">ثبت نیاز</Button>
                  </div>)
                : navItem.text === 'پنل ادمین'
                  ? (isAdmin
                    ? <NavLink exact to={navItem.url} className={classes.nav}>
                      <ListItemText primary={navItem.text}/>
                    </NavLink>
                    : null)
                  : <NavLink exact to={navItem.url} className={classes.nav}>
                    <ListItemText primary={navItem.text}/>
                  </NavLink>}
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
      <Swipe
        nodeName="div"
        onSwipedRight={props.toggleFn(false)}
        detectTouch
      >
        <Drawer anchor="left" open={props.open} onClose={props.toggleFn(false)}>
          <div className={classes.close}>
            <IconButton edge="end" className={classes.icon} aria-label="close" onClick={props.toggleFn(false)}>
              <CloseIcon/>
            </IconButton>
          </div>
          {list}
          <Footer/>
        </Drawer>
        <AccessDenied open={dialogOpen} handleClose={handleDialogClose} action={() => history.push(routes.ADD_NEED)}/>
      </Swipe>
    </nav>
  );
};

NavDrawer.propTypes = {
  open: PropTypes.bool,
  toggleFn: PropTypes.func,
};

export default NavDrawer;
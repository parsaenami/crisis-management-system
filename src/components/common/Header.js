import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button, Divider,
  // Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { HeaderScrollEffect } from "../helpers/HeaderScrollEffect";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: "auto",
    color: theme.palette.text.secondary,
  },
  icon: {
    color: theme.palette.text.secondary,
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

const Header = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const list = (
      <div className={classes.list} role="presentation">
        <List>
          {listItems.map((text, index) => (
              <>
                <ListItem button key={text}>
                  {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                  <ListItemText primary={text} />
                </ListItem>
                {index !== listItems.length - 1 && <Divider/>}
              </>
          ))}
        </List>
      </div>
  )

  return (
      <HeaderScrollEffect {...props}>
        <AppBar position={"sticky"}>
          <Toolbar>
            <Button className={classes.btn} color="inherit">ورود | ثبت‌نام</Button>
            {props.title}
            <IconButton edge="end" className={classes.icon} aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon/>
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              {list}
            </Drawer>
          </Toolbar>
        </AppBar>
      </HeaderScrollEffect>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger, useTheme
} from "@material-ui/core";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { HeaderScrollEffect } from "../../helpers/HeaderScrollEffect";
import { makeStyles } from "@material-ui/core/styles";
import NavDrawer from "./NavDrawer";
import { NavLink } from "react-router-dom";
import { routes } from "../../assets/routes";
import Logo from '../../assets/icons/simorgh.svg';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { Context, UserContext } from "../../Context";
import { api, config, get_token, get_user_info, rest } from "../../helpers/api";
import AccessDenied from "./AccessDenied";

const useStyles = makeStyles((theme) => ({
  btn: {
    color: theme.palette.text.secondary,
    '&#home': {
      marginLeft: theme.spacing(-1),
      [theme.breakpoints.up('md')]: {
        display: "none",
      },
    },
    '& img': {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    '& > button > span': {
      direction: "ltr",
    },
  },
  admin: {
    border: "1px solid",
    borderRadius: theme.spacing(.5),
  },
  navContainer: {
    display: "flex",
    flexDirection: "row",
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
  const {window} = props;
  const classes = useStyles();
  const {context} = useContext(Context);
  const {isAdmin, setIsAdmin} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const history = useHistory();
  const theme = useTheme()
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80,
    target: window ? window() : undefined,
  });


  useEffect(() => {
    if (get_token()) {
      api.get(`${rest.profile}/${get_user_info().id}`, config("json"))
        .then((res) => {
          setIsAdmin(res.data.isAdmin)
        })
    }
  }, [props.location.pathname])

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

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

  return (
    <HeaderScrollEffect {...props}>
      <AppBar position={"fixed"} className={classes.header}>
        <Container maxWidth="lg" className={classes.container}>
          <Toolbar>
            {
              <div className={classes.navContainer}>
                <NavLink exact to={routes.HOME} className={classes.btn}>
                  <Button color="inherit">صفحه‌ی اصلی</Button>
                </NavLink>
                {get_token()
                  ? <NavLink to={routes.ADD_NEED} className={classes.btn}>
                    <Button color="inherit">ثبت نیاز</Button>
                  </NavLink>
                  : <div onClick={handleDialogOpen} className={classes.btn}>
                    <Button color="inherit">ثبت نیاز</Button>
                  </div>}
                <NavLink to={routes.ABOUT} className={classes.btn}>
                  <Button color="inherit">درباره‌ی ما</Button>
                </NavLink>
                {get_token()
                  ? <NavLink to={routes.PROFILE} className={classes.btn}>
                    <Button color="inherit">پروفایل</Button>
                  </NavLink>
                  : <NavLink to={routes.SIGN_IN} className={classes.btn}>
                    <Button color="inherit">ورود | ثبت‌نام</Button>
                  </NavLink>}
                {isAdmin && <NavLink to={routes.ADMIN} className={classnames(classes.btn, classes.admin)}>
                  <Button color="inherit">پنل ادمین</Button>
                </NavLink>}
              </div>
            }
            <IconButton edge="end" className={classes.icon} aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuRoundedIcon/>
            </IconButton>
            {isMobileDisplay && trigger &&
            <Typography color={"textSecondary"} className="ml-auto">{context}</Typography>}
            {
              props.location.pathname === routes.HOME
                ?
                get_token()
                  ? <NavLink to={routes.PROFILE} className={classes.btn} id='home'>
                    <Button color="inherit" startIcon={<PersonRoundedIcon/>}>پروفایل</Button>
                  </NavLink>
                  : <NavLink to={routes.SIGN_IN} className={classes.btn} id='home'>
                    <Button color="inherit">ورود | ثبت‌نام</Button>
                  </NavLink>
                :
                <NavLink to={routes.HOME} className={classes.btn}>
                  <IconButton edge="start"><img src={Logo} alt="logo"/></IconButton>
                </NavLink>
            }
            <NavDrawer open={open} toggleFn={toggleDrawer}/>
          </Toolbar>
          <AccessDenied open={dialogOpen} handleClose={handleDialogClose}
                        action={() => history.push(routes.ADD_NEED)}/>
        </Container>
      </AppBar>
    </HeaderScrollEffect>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
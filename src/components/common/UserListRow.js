import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, CircularProgress,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { AccountBoxRounded, DeleteRounded, StarsRounded, ExpandLess, ExpandMore } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    borderBottom: "1px solid #00000024 !important",
  },
  info: {
    minWidth: theme.spacing(12.5),
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
}));

const UserListRow = props => {
  const classes = useStyles()

  const deleteFn = e => {
    e.stopPropagation();
    props.handleDelete(props.userId)
  }

  return (
    <>
      <ListItem button onClick={props.handleClick}>
        <ListItemIcon>
          <AccountBoxRounded/>
          {props.items["وضعیت کاربری"] === 'ادمین' && <StarsRounded/>}
        </ListItemIcon>
        <ListItemText primary={props.title}/>
        <IconButton className={classes.deleteIcon} onClick={deleteFn}>
          {props.loading[0] ? <CircularProgress size={24}/> : <DeleteRounded/>}
        </IconButton>
        <IconButton edge={"start"}>
          {props.open ? <ExpandLess/> : <ExpandMore/>}
        </IconButton>
      </ListItem>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.keys(props.items).map((item, i) => (
            <ListItem key={i} className={classes.nested}>
              <ListItemIcon className={classes.info}>{item}</ListItemIcon>
              <ListItemText primary={props.items[item] ?? '-'}/>
              {item === "وضعیت کاربری" && <Button variant={"outlined"} color={"primary"} onClick={() => props.handleAdmin(props.userId)}>
                {props.loading[1]
                  ? <CircularProgress size={24}/>
                  : (props.items["وضعیت کاربری"] === 'ادمین'
                    ? "تغییر به کاربر عادی"
                    : "ارتقا به ادمین")}
              </Button>}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

UserListRow.propTypes = {
  userId: PropTypes.number,
  open: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAdmin: PropTypes.func,
  title: PropTypes.string,
  items: PropTypes.object,
};

export default UserListRow;
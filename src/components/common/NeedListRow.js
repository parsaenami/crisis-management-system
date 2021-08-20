import React from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField
} from "@material-ui/core";
import { CheckRounded, DeleteRounded, EditRounded, ExpandLess, ExpandMore } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    borderBottom: "1px solid #00000024 !important",
  },
  info: {
    minWidth: theme.spacing(5),
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
  editIcon: {
    color: theme.palette.primary.main,
  },
  input: {
    flex: 1,
  }
}));

const NeedListRow = props => {
  const classes = useStyles()

  const toggleEdit = needId => () => {
    props.handleChange({target: {value: props.items[needId]}})
    props.toggleEditMode(needId)
  }

  return (
      <>
        <ListItem button onClick={props.handleClick}>
          <ListItemText primary={props.category}/>
          {props.open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Object.keys(props.items).map((needId, i) => (
                <ListItem key={i} className={classes.nested}>
                  <ListItemIcon className={classes.info}>{i + 1}</ListItemIcon>
                  {props.editMode === needId ? <TextField
                      variant="outlined"
                      size="small"
                      value={props.editValue}
                      className={classes.input}
                      onChange={props.handleChange}
                  /> : <ListItemText primary={props.items[needId] ?? '-'}/>}
                  {props.loading === needId && <CircularProgress size={24}/>}
                  {props.editMode === needId
                      ? <IconButton className={classes.editIcon} onClick={() => props.handleEdit(needId)}>
                        <CheckRounded/>
                      </IconButton>
                      : <IconButton className={classes.editIcon} onClick={toggleEdit(needId)}>
                        <EditRounded/>
                      </IconButton>}
                  <IconButton className={classes.deleteIcon} edge="end"
                              onClick={() => props.handleDelete(needId)}>
                    <DeleteRounded/>
                  </IconButton>
                </ListItem>
            ))}
          </List>
        </Collapse>
      </>
  );
};

NeedListRow.propTypes = {
  needId: PropTypes.number,
  open: PropTypes.bool,
  editMode: PropTypes.number,
  loading: PropTypes.number,
  handleClick: PropTypes.func,
  handleDelete: PropTypes.func,
  toggleEditMode: PropTypes.func,
  handleEdit: PropTypes.func,
  category: PropTypes.string,
  items: PropTypes.object,
};

export default NeedListRow;
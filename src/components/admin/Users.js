import React, { useEffect, useState } from 'react';
import { api, config, rest } from "../../helpers/api";
import { useAlert } from "../../hooks/useAlert";
import FloatingAlert from "../common/FloatingAlert";
import Loader from "../common/Loader";
import { List, ListSubheader, makeStyles, } from "@material-ui/core";
import UserListRow from "../common/UserListRow";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 0 8px 1px #00000052",

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Users = () => {
  const classes = useStyles()
  const {open, message, type, duration, closeAlert, showAlert} = useAlert();

  const [userOpen, setUserOpen] = React.useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState([])
  const [adminLoading, setAdminLoading] = useState([])

  useEffect(() => {
    api.get(rest.admin.users, config("json"))
        .then((response) => {
          setData(response.data)
          setUserOpen(new Array(response.data.length).fill(false))
          setDeleteLoading(new Array(response.data.length).fill(false))
          setAdminLoading(new Array(response.data.length).fill(false))
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
        .finally(() => setLoading(false))
  }, [])

  const handleClick = i => () => {
    setUserOpen([
      ...userOpen.slice(0, i).fill(false),
      !userOpen[i],
      ...userOpen.slice(i + 1).fill(false),
    ]);
  };

  const handleDelete = (i, id) => () => {
    setDeleteLoading([
      ...deleteLoading.slice(0, i),
      true,
      ...deleteLoading.slice(i + 1),
    ])
    api.delete(`${rest.admin.user}/${id}`, config("json"))
        .then((response) => {
          showAlert(response.data.msg, "success", 3000);
          setData([
            ...data.slice(0, i),
            ...data.slice(i + 1),
          ])
          setUserOpen([
            ...userOpen.slice(0, i),
            ...userOpen.slice(i + 1),
          ]);
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
        .finally(() => setDeleteLoading([
          ...deleteLoading.slice(0, i),
          false,
          ...deleteLoading.slice(i + 1),
        ]))
  }

  const handleAdmin = (i, id) => () => {
    setAdminLoading([
      ...adminLoading.slice(0, i),
      true,
      ...adminLoading.slice(i + 1),
    ])
    api.patch(`${rest.admin.user}/${id}`, {}, config("json"))
        .then((response) => {
          setData(response.data.result)
          showAlert(response.data.msg, "success", 3000)
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000)
        })
        .finally(() => setAdminLoading([
          ...adminLoading.slice(0, i),
          false,
          ...adminLoading.slice(i + 1),
        ]))
  }

  return (
      loading ? <Loader/> : <div className={classes.container}>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                لیست کاربران
              </ListSubheader>
            }
            className={classes.root}
        >
          {data.map((user, i) => <UserListRow
              key={i}
              open={userOpen[i]}
              userId={user.id}
              title={user.fullname}
              items={user.data}
              handleClick={handleClick(i)}
              handleDelete={id => handleDelete(i, id)()}
              handleAdmin={id => handleAdmin(i, id)()}
              loading={[deleteLoading[i], adminLoading[i]]}
          />)}
        </List>

        <FloatingAlert text={message} open={open} handleClose={closeAlert} duration={duration} type={type}/>
      </div>
  );
};

Users.propTypes = {};

export default Users;
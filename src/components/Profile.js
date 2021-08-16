import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import { CustomButton } from "./buttons/CustomButton";
import DataTable from "./table/DataTable";
import { useAlert } from "../hooks/useAlert";
import FloatingAlert from "./common/FloatingAlert";
import { messages } from "../assets/messages";
import { Context, UserContext } from "../Context";
import Helmet from 'react-helmet';
import Loader from "./common/Loader";
import { api, config, get_user_info, rest } from "../helpers/api";
import { routes } from "../assets/routes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: '100%',
    paddingBottom: theme.spacing(9),
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  infoTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    '& + p': {
      fontSize: theme.spacing(1.75)
    }
  },
  infoContainer: {
    border: "1px solid #e7e7e7",
    backgroundColor: theme.palette.background.box,
    borderRadius: theme.spacing(.5),
    padding: theme.spacing(1),
    margin: theme.spacing(.5),
    flex: "1 1 40%",
    minWidth: theme.spacing(31.25),
    '& > *': {
      direction: 'rtl',
    },
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(.5),
    padding: theme.spacing(.5),
    marginBottom: theme.spacing(2),
  },
  card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btn: {
    margin: theme.spacing(.5),
  },
  admin: {
    display: "flex",
    alignItems: "center",
    border: "1px solid",
    borderRadius: theme.spacing(.5),
    padding: theme.spacing(.5),
    marginRight: theme.spacing(1.5),
  },
}));

const translate = {
  firstname: 'نام',
  lastname: 'نام‌خانوادگی',
  phoneNumber: 'شماره‌ی تماس',
  nationalId: 'کد ملی',
  email: 'ایمیل',
  address: 'آدرس',
}

const info = {
  firstname: '',
  lastname: '',
  email: '',
  address: '',
  phoneNumber: '',
  nationalId: '',
}

const Profile = () => {
  const classes = useStyles();
  const {setContext} = useContext(Context)
  const {setIsAdmin} = useContext(UserContext);
  const history = useHistory();
  const [editMode, setEditMode] = useState(info);
  const [profile, setProfile] = useState(info);
  const [requests, setRequests] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [location, setLocation] = useState(false);
  const {open, message, type, duration, closeAlert, showAlert} = useAlert()
  const [pageLoading, setPageLoading] = useState(true)
  const [loading, setLoading] = useState({...info, allowLocation: '', logout: '', table: true,})

  useEffect(() => {
    api.get(`${rest.profile}/${get_user_info().id}`, config("json"))
        .then((res) => {
          setAdmin(res.data.isAdmin)
          setIsAdmin(res.data.isAdmin)
          setLocation(res.data.allowLocation)
          delete res.data.isAdmin
          delete res.data.allowLocation
          setProfile(res.data)

          api.get(`${rest.request}/${get_user_info().id}`, config("json"))
              .then((res) => {
                if (res.status === 200) {
                  setRequests(res.data)
                } else if (res.status === 201) {
                  showAlert(res.data.error, "warning", 3000);
                }
              })
              .catch((err) => {
                showAlert(err.response.data.error, "error", 3000);
              })
              .finally(() => setLoading({...loading, table: false}))
        })
        .catch((err) => {
          if (err.response) {
            showAlert(err.response.data.error, "error", 3000);
          }
        })
        .finally(() => setPageLoading(false))
  }, [])

  useEffect(() => {
    setContext('پروفایل')
  }, [setContext])

  const editField = value => {
    const currentEditState = editMode[value]
    setEditMode({
      ...editMode,
      [value]: !editMode[value],
    })
    if (currentEditState) {
      confirmChanges(value)
    }
  }

  const handleEditProfile = e => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const confirmChanges = value => {
    setLoading({...loading, [value]: true})
    api.patch(`${rest.profile}/${get_user_info().id}`, {[value]: profile[value]}, config("json"))
        .then(() => {
          showAlert(messages.INFO_CHANGES_SAVED, 'success');
          setLoading({...loading, [value]: false})
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
  }

  const updateLocationAccess = () => {
    setLoading({...loading, allowLocation: true})
    api.patch(`${rest.profile}/${get_user_info().id}`, {allowLocation: !location}, config("json"))
        .then(() => {
          setLocation(!location)
          showAlert(messages.INFO_CHANGES_SAVED, 'success', 3000);
          setLoading({...loading, allowLocation: false})
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
  }

  const signOut = () => {
    setLoading({...loading, logout: true})
    api.patch(`${rest.signOut}/${get_user_info().id}`, {allowLocation: !location}, config("json"))
        .then((res) => {
          localStorage.removeItem('token')
          showAlert(res.data.msg, 'success', 3000);
          setLoading({...loading, logout: false})
          history.push(routes.HOME)
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
  }

  return pageLoading ? <Loader/> : (
      <div className={classes.container}>
        <Helmet><title>پروفایل</title></Helmet>
        <div className={classes.title}>
          <Typography variant={"h3"}>پروفایل</Typography>
          {admin && <div className={classes.admin}>
            <StarsRoundedIcon/>
            <Typography>ادمین</Typography>
          </div>}
          <div className="btn btn-danger mr-auto" onClick={signOut}>
            {loading.logout ? <CircularProgress color={"secondary"} size={20}/> : 'خروج'}
          </div>
        </div>
        <hr/>
        <div className={classes.cardContainer}>
          <div className={classes.card}>
            {Object.keys(profile).map((value, index) => (
                <div key={index} className={classes.infoContainer}>
                  <div className={classes.infoTitle}>
                    <Typography>{translate[value]}</Typography>
                    <IconButton edge="end" className={classes.icon} aria-label="menu" onClick={() => editField(value)}>
                      {loading[value] ? <CircularProgress size={24}/> : !editMode[value] ? <EditRoundedIcon/> :
                          <CheckRoundedIcon/>}
                    </IconButton>
                  </div>
                  {!editMode[value]
                      ? <Typography color={"textSecondary"}>{profile[value] || '-'}</Typography>
                      : <TextField
                          variant="standard"
                          name={value}
                          value={profile[value]}
                          onChange={handleEditProfile}
                      />}
                </div>
            ))}
            <FormControlLabel
                control={
                  <Checkbox
                      edge={"end"}
                      checked={location}
                      onChange={updateLocationAccess}
                      name="location"
                      color="primary"
                  />
                }
                label={<div className="d-flex align-items-center">
                  <span>استفاده از لوکیشن برای امدادرسانی</span>
                  {loading.allowLocation && <CircularProgress size={20} className="mr-2"/>}
                </div>}
            />
          </div>
        </div>

        <DataTable title={'وضعیت درخواست‌ها'} rows={requests} loading={loading.table}/>

        <FloatingAlert text={message} open={open} handleClose={closeAlert} duration={duration} type={type}/>
      </div>
  );
};

Profile.propTypes = {};

export default Profile;
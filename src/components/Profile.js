import React, { useState } from 'react';
import { IconButton, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { CustomButton } from "./common/CustomButton";
import DataTable from "./common/DataTable";

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
}));

const translate = {
  firstName: 'نام',
  lastName: 'نام‌خانوادگی',
  phoneNumber: 'شماره‌ی تماس',
  nationalId: 'کد ملی',
  email: 'ایمیل',
  address: 'آدرس',
}

const info = {
  firstName: 'پارسا',
  lastName: 'انعامی',
  phoneNumber: '09109122944',
  nationalId: '0021268622',
  email: '-',
  address: 'ایران - تهران - خیابان جمهوری - خیابان باستان جنوبی - خیابان حاج ملاعلی - پلاک ۴۹ - واحد ۵',
}

const Profile = () => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    nationalId: false,
    email: false,
    address: false,
  });
  const [profile, setProfile] = useState(info);
  const [showConfirmBtn, setShowConfirmBtn] = useState(false);

  const editField = value => {
    setEditMode({
      ...editMode,
      [value]: !editMode[value],
    })
    setShowConfirmBtn(true);
  }

  const handleEditProfile = e => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const confirmChanges = () => {
    alert('تغییرات با موفقیت اعمال شد.');
    setShowConfirmBtn(false);
  }

  return (
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant={"h3"}>پروفایل</Typography>
        </div>
        <hr/>
        <div className={classes.cardContainer}>
          <div className={classes.card}>
            {Object.keys(profile).map((value, index) => (
                <div key={index} className={classes.infoContainer}>
                  <div className={classes.infoTitle}>
                    <Typography>{translate[value]}</Typography>
                    <IconButton edge="end" className={classes.icon} aria-label="menu" onClick={() => editField(value)}>
                      {!editMode[value] ? <EditRoundedIcon/> : <CheckRoundedIcon/>}
                    </IconButton>
                  </div>
                  {!editMode[value]
                      ? <Typography color={"textSecondary"}>{profile[value]}</Typography>
                      : <TextField
                          variant="standard"
                          name={value}
                          value={profile[value]}
                          onChange={handleEditProfile}
                      />}
                </div>
            ))}
          </div>
          {showConfirmBtn && <CustomButton
              className={classes.btn}
              variant="contained"
              onClick={confirmChanges}
          >ثبت تغییرات</CustomButton>}
        </div>

        <DataTable title={'وضعیت درخواست‌ها'}/>

      </div>
  );
};

Profile.propTypes = {};

export default Profile;
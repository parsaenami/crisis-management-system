import React, { useEffect, useState } from 'react';
import Loader from "../common/Loader";
import {
  Button,
  CircularProgress,
  List,
  ListSubheader,
  makeStyles,
  MenuItem,
  MuiThemeProvider,
  TextField
} from "@material-ui/core";
import FloatingAlert from "../common/FloatingAlert";
import { useAlert } from "../../hooks/useAlert";
import { api, config, rest } from "../../helpers/api";
import NeedListRow from "../common/NeedListRow";
import Theme from "../../helpers/Theme";
import RTL from "../../helpers/RTL";
import Popup from "../common/Popup";
import { messages } from "../../assets/messages";

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
  subheader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formInput: {
    marginTop: theme.spacing(2)
  },
}));

const Needs = () => {
  const classes = useStyles()
  const {open, message, type, duration, closeAlert, showAlert} = useAlert()

  const [categoryOpen, setCategoryOpen] = React.useState([])
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [needLoading, setNeedLoading] = useState(null)
  const [addLoading, setAddLoading] = useState(null)
  const [needEdit, setNeedEdit] = useState(null)
  const [needEditValue, setNeedEditValue] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState(null)
  const [newTitle, setNewTitle] = useState(null)
  const [error, setError] = useState({title: null, category: null})

  useEffect(() => {
    api.get(rest.getNeeds, config("json"))
        .then((response) => {
          setData(response.data.needsCategory)
          setCategoryOpen(new Array(Object.keys(response.data.needsCategory).length).fill(false))
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
        .finally(() => setLoading(false))
  }, [])

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogConfirm = () => {
    if (error.title || error.category) {
      showAlert(messages.ERR_EMPTY_NEED, "error", 3000);
      return
    }

    setAddLoading(true)
    api.post(rest.admin.need, {title: newTitle, category_id: newCategory}, config("json"))
        .then((response) => {
          showAlert(response.data.msg, "success", 3000);
          setData(response.data.needsCategory)
          handleDialogClose()
          setNewCategory(null)
          setNewTitle(null)
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
        .finally(() => {
          setAddLoading(false)
        })
  };

  const checkError = () => {
    setError({
      title: newTitle === "" ? messages.ERR_EMPTY : null,
      category: (newCategory === "" || newCategory === null) ? messages.ERR_EMPTY : null,
    })
  };

  useEffect(checkError, [newCategory, newTitle])

  const handleClick = i => () => {
    setCategoryOpen([
      ...categoryOpen.slice(0, i).fill(false),
      !categoryOpen[i],
      ...categoryOpen.slice(i + 1).fill(false),
    ]);
  };

  const handleDelete = (categoryId, needId) => () => {
    setNeedLoading(needId)
    api.delete(`${rest.admin.need}/${needId}`, config("json"))
        .then((response) => {
          showAlert(response.data.msg, "success", 3000);
          let temp = data
          delete temp[categoryId].items[needId]
          setData(temp)
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
        .finally(() => setNeedLoading(null))
  }

  const handleEdit = (needId) => () => {
    // console.log(needId)
    setNeedLoading(needId)
    api.patch(`${rest.admin.need}/${needId}`, {title: needEditValue}, config("json"))
        .then((response) => {
          showAlert(response.data.msg, "success", 3000);
          setData(response.data.needsCategory)
          setNeedEdit(null)
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
        .finally(() => setNeedLoading(null))
  }

  const handleChange = e => {
    console.log(e.target.value)
    setNeedEditValue(e.target.value)
  }

  const toggleEditMode = needId => {
    setNeedEdit(needId)
  }

  const addForm = (
      <RTL>
        <MuiThemeProvider theme={Theme}>
          <div className={classes.form}>
            <TextField
                select
                variant={"filled"}
                className={classes.formInput}
                label={"دسته‌بندی"}
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
                helperText={error.category}
                error={!!error.category}
            >
              {Object.values(data).map((cat, i) => (
                  <MenuItem key={i} value={cat.id}>{cat.faName}</MenuItem>
              ))}
            </TextField>
            <TextField
                className={classes.formInput}
                variant={"filled"}
                type="text"
                id={'need'}
                name={'need'}
                label={'عنوان نیاز'}
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                error={!!error.title}
                helperText={error.title}
            />
          </div>
        </MuiThemeProvider>
      </RTL>
  )

  return (
      loading ? <Loader/> : <div className={classes.container}>
        <RTL>
          <MuiThemeProvider theme={Theme}>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader" className={classes.subheader}>
                    <span>لیست نیازها</span>
                    <Button variant="contained" color="primary" size={"small"} onClick={handleDialogOpen}>افزودن نیاز
                      جدید</Button>
                  </ListSubheader>
                }
                className={classes.root}
            >
              {Object.values(data).map((category, i) => <NeedListRow
                  key={i}
                  open={categoryOpen[i]}
                  categoryId={category.id}
                  category={category.faName}
                  items={category.items}
                  handleClick={handleClick(i)}
                  loading={needLoading}
                  handleDelete={j => handleDelete(category.id, j)()}
                  editMode={needEdit}
                  toggleEditMode={i => toggleEditMode(i)}
                  handleEdit={(id, value) => handleEdit(id, value)()}
                  editValue={needEditValue}
                  handleChange={handleChange}

              />)}
            </List>
          </MuiThemeProvider>
        </RTL>

        <Popup
            open={dialogOpen}
            onClose={handleDialogClose}
            onDeny={handleDialogClose}
            onConfirm={handleDialogConfirm}
            title={'اضافه کردن نیاز جدید'}
            text={'لطفاً دسته‌بندی و عنوان نیاز را وارد کنید.'}
            context={addForm}
            denyBtn={'انصراف'}
            confirmBtn={addLoading ? <CircularProgress color={"secondary"} size={24}/> : 'ثبت'}
        />

        <FloatingAlert text={message} open={open} handleClose={closeAlert} duration={duration} type={type}/>
      </div>
  );
};

Needs.propTypes = {};

export default Needs;
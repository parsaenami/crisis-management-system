import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MuiThemeProvider,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from "classnames";
import Helmet from 'react-helmet';
import RTL from "../helpers/RTL";
import Theme from "../helpers/Theme";
import { disasterCategories, needCategories } from "../assets/categories";
import Card from "./card/Card";
import CardSlider from "./card/CardSlider";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import type { NeedType } from "../types/needType";
import { emptyNeed } from "../types/needType";
import FireIcon from "../assets/icons/iconComponents/FireIcon";
import Fab from "./buttons/FAB";
import EarthquakeIcon from "../assets/icons/iconComponents/EarthquakeIcon";
import FloodIcon from "../assets/icons/iconComponents/FloodIcon";
import TwisterIcon from "../assets/icons/iconComponents/TwisterIcon";
import LandslideIcon from "../assets/icons/iconComponents/LandslideIcon";
import AvalancheIcon from "../assets/icons/iconComponents/AvalancheIcon";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { CustomButton } from "./buttons/CustomButton";
import Receipt from "./common/Receipt";
import { routes } from "../assets/routes";
import FloatingAlert from "./common/FloatingAlert";
import { useAlert } from "../hooks/useAlert";
import { messages } from "../assets/messages";
import Loader from "./common/Loader";
import { Context } from "../Context";

const emptyOpenList = {
  menu: false,
  food: false,
  medical: false,
  life: false,
  cloth: false,
  health: false,
  warming: false
};

const useStyles = makeStyles((theme) => ({
  container: {
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
  accordion: {
    width: "100%",
    backgroundColor: theme.palette.secondary.light,
    '& .details': {
      display: "flex",
      flexDirection: "column",
      '& > *:not(.deleteBtn)': {
        position: "relative",
        '&:before': {
          content: '""',
          position: "absolute",
          top: 0,
          right: theme.spacing(-2),
          borderStyle: "solid",
          borderColor: theme.palette.primary.main,
          borderWidth: theme.spacing(1.5, .5),
        },
      },
    },
    '& > .header': {
      '& > div:first-child': {
        display: "flex",
        justifyContent: "space-between",
      },
      '& > div:last-child': {
        marginLeft: -12,
        marginRight: 0,
      },
      '&.error': {
        backgroundColor: theme.palette.error.light,
        '& > *': {
          color: theme.palette.error.main,
        },
      },
    },
  },
  list: {
    borderRadius: theme.spacing(.7, .7, .5, .5),
    border: "1px solid",
    position: "relative",
    '&.error': {
      borderColor: theme.palette.error.main,
    },
    '& > .header': {
      backgroundColor: theme.palette.secondary.dark,
      borderRadius: theme.spacing(.5, .5, 0, 0),
      borderBottom: "2px solid",
      // backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      '&.error': {
        color: theme.palette.error.main,
      },
    },
  },
  listItem: {
    borderBottom: "1px solid #D0D0D0",
    '&  *': {
      fontSize: theme.spacing(1.75),
    },
  },
  needPart: {
    display: "flex",
    flexDirection: "column",
    '&:not(:first-child)': {
      marginTop: theme.spacing(3),
    },
    '& > p': {
      marginBottom: theme.spacing(2),
    },
    '& > span': {
      alignSelf: "center",
      width: "60%",
      fontSize: theme.spacing(1.5),
    },
    '&.deleteBtn': {
      alignSelf: "flex-end",
    },
    '&.suggest': {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.box,
      borderRadius: theme.spacing(.5),
    },
  },
  headerAmount: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    '& > div': {
      display: "flex",
      alignItems: "center",
      marginRight: "auto",
    },
    '& .amountBtn': {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      width: theme.spacing(3),
      height: theme.spacing(3),
      borderRadius: theme.spacing(.5),
      margin: theme.spacing(0, .5),
      fontSize: theme.spacing(4),
      userSelect: "none",
      cursor: "pointer",
      '&:last-child': {
        marginLeft: 0,
      },
    },
    '& .needAmount': {
      width: theme.spacing(10),
      height: theme.spacing(3),
      textAlignLast: "center",
      '& input': {
        direction: "ltr",
        padding: theme.spacing(.25, 0),
        '&[type=number]': {
          MozAppearance: "textfield",
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button,': {
          WebkitAppearance: "none",
          margin: 0,
        },
      },
    },
  },
  hideBorders: {
    position: "absolute",
    top: -2,
    right: -1,
    left: -1,
    height: theme.spacing(6.25),
    // backgroundColor: "#f59e39",
    borderRadius: theme.spacing(.5, .5, 0, 0),
    backgroundColor: theme.palette.secondary.dark,
  },
  selectedNeed: {
    backgroundColor: theme.palette.secondary.dark,
    borderBottom: "2px solid",
    borderRadius: theme.spacing(.5, .5, 0, 0),
    padding: theme.spacing(0, 2),
    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    '& > .label': {
      fontSize: theme.spacing(1.25),
      position: "absolute",
    },
  },
  suggestionCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    height: "100%",
  },
  media: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    '&.receiptOnly': {
      justifyContent: "center",
      '& $receipt': {
        flex: "unset",
      },
    },
  },
  form: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      flex: "0 0 65%"
    },
  },
  receipt: {
    flex: "0 0 28%",
    position: "sticky",
    top: theme.spacing(10),
    alignSelf: "flex-start",
    [theme.breakpoints.down('sm')]: {
      // display: "none",
    },
  },
  desktopBtn: {
    display: "flex",
    '& > *': {
      flex: 1,
      margin: theme.spacing(2, 1),
      '&:first-child': {
        marginRight: theme.spacing(0),
      },
      '&:last-child': {
        marginLeft: theme.spacing(0),
      },
    },
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  },
}));

const disasterIcons = {
  earthquake: EarthquakeIcon,
  flood: FloodIcon,
  fire: FireIcon,
  twister: TwisterIcon,
  landslide: LandslideIcon,
  avalanche: AvalancheIcon,
}

const AddNeed = () => {
  const classes = useStyles()
  const {setContext} = useContext(Context)
  const theme = useTheme()
  const history = useHistory()
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = React.useState('panel0')
  const [openList, setOpenList] = useState(emptyOpenList)
  const [need: NeedType[], setNeed] = useState([emptyNeed])
  const [needError: NeedType[], setNeedError] = useState([emptyNeed])
  const [disaster, setDisaster] = useState(false)
  const [disasterError, setDisasterError] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const {open, message, type, duration, closeAlert, showAlert} = useAlert()

  useEffect(() => {
    setContext(showReceipt ? 'تأیید اطلاعات' : 'ثبت نیاز')
  }, [setContext, showReceipt])

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  const handleOpenList = (e, name) => {
    setOpenList({
      ...openList,
      [name]: !openList[name],
    })
  };

  const handleExpand = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDisaster = dis => () => {
    setDisaster(disaster === dis ? false : dis)
    setDisasterError(false)
  };

  const handleShowReceipt = () => {
    if (checkError()) {
      showAlert(messages.ERR_EMPTY_NEED, "error")
      return
    }
    setShowReceipt(!showReceipt)
  }

  const addRequest = () => {
    setNeed([...need, emptyNeed])
    setNeedError([...needError, emptyNeed])
    setExpanded('panel' + need.length)
  }

  const deleteRequest = index => () => {
    setNeed([
      ...need.slice(0, index),
      ...need.slice(index + 1),
    ])
    setNeedError([
      ...needError.slice(0, index),
      ...needError.slice(index + 1),
    ])
    setExpanded(expanded && expanded.slice(5) !== "0" ? 'panel' + (parseInt(expanded.slice(5)) - 1) : false)
  }

  const selectNeed = (index, i, j) => () => {
    setNeed([
      ...need.slice(0, index),
      {...need[index], category: i, title: j},
      ...need.slice(index + 1),
    ])
    setNeedError([
      ...needError.slice(0, index),
      emptyNeed,
      ...needError.slice(index + 1),
    ])
    setOpenList(emptyOpenList)
  }

  const setNeedInfo = index => e => {
    setNeed([
      ...need.slice(0, index),
      {...need[index], [e.target.name]: e.target.value},
      ...need.slice(index + 1),
    ])
    setNeedError([
      ...needError.slice(0, index),
      emptyNeed,
      ...needError.slice(index + 1),
    ])
  }

  const setNeedAmountBtn = (index, val) => () => {
    const tempAmount = parseInt(need[index].amount) ? parseInt(need[index].amount) : 0

    setNeed([
      ...need.slice(0, index),
      {...need[index], amount: (tempAmount + val >= 0 ? tempAmount + val : 0).toString()},
      ...need.slice(index + 1),
    ])
    setNeedError([
      ...needError.slice(0, index),
      emptyNeed,
      ...needError.slice(index + 1),
    ])
  }

  const handleSliderChange = index => (event, newValue) => {
    setNeed([
      ...need.slice(0, index),
      {...need[index], urgent: newValue},
      ...need.slice(index + 1),
    ])
  }

  const checkError = () => {
    let errorState = []
    let hasError = false

    for (const n of need) {
      hasError = hasError || n.amount === "" || parseInt(n.amount) <= 0 || n.title === ""
      errorState.push({
        ...(emptyNeed),
        amount: n.amount === "" || parseInt(n.amount) <= 0,
        title: n.title === "",
      })
    }
    hasError = hasError || !disaster
    if (!disaster) {
      setDisasterError(true)
    }

    setNeedError(errorState)
    return hasError
  }

  const submitNeed = () => {
    showAlert(messages.INFO_NEED_ADDED, "success", 3000, () => () => history.push(routes.DONE))
    // history.push(routes.DONE)
  }

  const needItemForm = index => {
    const marks = [
      {
        value: 1,
        label: 'خیلی کم',
      },
      {
        value: 2,
        label: 'کم',
      },
      {
        value: 3,
        label: 'متوسط',
      },
      {
        value: 4,
        label: 'زیاد',
      },
      {
        value: 5,
        label: 'خیلی زیاد',
      },
    ];

    return (
        <Accordion className={classes.accordion} expanded={expanded === `panel${index}`}
                   onChange={handleExpand(`panel${index}`)} key={index}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              className={classnames('header', {"error": needError[index].amount || needError[index].title})}
          >
            <span>
              {need[index].title !== ""
                  ? `درخواست برای ${needCategories[need[index].category.toString()].items[need[index].title]}`
                  : need.length > 1
                      ? `جزئیات درخواست ${index + 1}`
                      : `جزئیات درخواست`}
            </span>
            {(needError[index].amount || needError[index].title) && <ErrorRoundedIcon/>}
          </AccordionSummary>
          <AccordionDetails className={"details"}>
            {index !== 0 && <div className={classnames(classes.needPart, "suggest")}>
              <Typography>شاید به این موارد هم نیاز داشته باشید:</Typography>
              <CardSlider>
                {[[0, 12], [5, 2], [0, 3], [3, 8], [2, 12]].map((x, k) => (
                    <Card
                        k={k}
                        onClick={selectNeed(index, ...x)}
                        selected={x[0] === need[index].category && x[1] === need[index].title}
                    >
                      <div className={classes.suggestionCard}>
                        <Chip
                            label={needCategories[x[0].toString()].faName}
                            color={x[0] === need[index].category && x[1] === need[index].title ? "secondary" : "primary"}
                            size={"small"}
                            style={{fontSize: 10}}
                        />
                        <div className={"text-center"}>{needCategories[x[0].toString()].items[x[1]]}</div>
                      </div>
                    </Card>
                ))}
              </CardSlider>
            </div>}
            <RTL>
              <MuiThemeProvider theme={Theme}>
                <div className={classes.needPart}>
                  <div className={classes.headerAmount}>
                    <Typography>چه نیازی دارید؟</Typography>
                    <div>
                      <div className="amountBtn" onClick={setNeedAmountBtn(index, 1)}>+</div>
                      <TextField
                          placeholder={'تعداد'}
                          type={"number"}
                          variant={"outlined"}
                          size={"small"}
                          inputProps={{
                            "min": 0
                          }}
                          name={'amount'}
                          className={"needAmount"}
                          value={need[index].amount || ''}
                          onChange={setNeedInfo(index)}
                          error={!!needError[index].amount}
                      />
                      <div className="amountBtn" onClick={setNeedAmountBtn(index, -1)}>-</div>
                    </div>
                  </div>
                  {need[index].category === '' || need[index].title === '' ? (
                      <List
                          disablePadding
                          className={classnames(classes.list, {"error": needError[index].amount || needError[index].title})}
                          subheader={
                            <ListSubheader
                                className={classnames('header', {"error": needError[index].amount || needError[index].title})}
                                component="div"
                                id="nested-list-subheader"
                                onClick={e => handleOpenList(e, 'menu')}
                            >
                              <span>دسته‌بندی نیازمندی‌ها</span>
                              <div>
                                {/*<IconButton color={"inherit"} className={"d-none"}>*/}
                                {/*  <SearchRoundedIcon onClick={e => {*/}
                                {/*    e.stopPropagation();*/}
                                {/*    console.log(e)*/}
                                {/*  }}/>*/}
                                {/*</IconButton>*/}
                                <IconButton edge={"end"} color={"inherit"}>
                                  {openList.menu ? <ExpandLess/> : <ExpandMore/>}
                                </IconButton>
                              </div>
                            </ListSubheader>
                          }
                      >
                        <div className={classes.hideBorders}/>
                        <Collapse in={openList.menu} timeout="auto" unmountOnExit>
                          {Object.values(needCategories).map((need, i) => (
                              <div key={need.enName}>
                                <ListItem button onClick={e => handleOpenList(e, need.enName)}>
                                  <ListItemText primary={need.faName}/>
                                  {openList[need.enName] ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                                <Collapse in={openList[need.enName]} timeout="auto" unmountOnExit>
                                  <List component="div" disablePadding>
                                    {need.items.map((item, j) => (
                                        <ListItem className={classes.listItem} key={j} button
                                                  onClick={selectNeed(index, i, j)}>
                                          <ListItemIcon style={{minWidth: Theme.spacing(4)}}>
                                            <span>{j + 1}</span>
                                          </ListItemIcon>
                                          <ListItemText primary={item}/>
                                        </ListItem>
                                    ))}
                                  </List>
                                </Collapse>
                              </div>
                          ))}
                        </Collapse>
                      </List>
                  ) : (
                      <div className={classes.selectedNeed}>
                        <Chip color={"primary"} label={needCategories[need[index].category.toString()].faName}/>
                        <span>{needCategories[need[index].category.toString()].items[need[index].title]}</span>
                        <IconButton edge={"end"} color={"inherit"} onClick={selectNeed(index, '', '')}>
                          <EditRoundedIcon/>
                        </IconButton>
                      </div>
                  )}
                </div>
                <div className={classes.needPart}>
                  <Typography>نیازتان چقدر ضروری است؟</Typography>
                  <Slider
                      min={1}
                      max={5}
                      step={1}
                      marks={marks}
                      defaultValue={1}
                      name={'urgent'}
                      value={need[index].urgent}
                      onChange={handleSliderChange(index)}
                  />
                </div>
                <div className={classes.needPart}>
                  <Typography>آیا توضیح خاصی لازم است؟ (اختیاری)</Typography>
                  <TextField
                      multiline
                      variant={"filled"}
                      label={"توضیحات"}
                      name={'desc'}
                      value={need[index].desc}
                      onChange={setNeedInfo(index)}
                  />
                </div>
              </MuiThemeProvider>
            </RTL>
            {need.length > 1 && <div className={classnames(classes.needPart, "deleteBtn")}>
              <Button variant={"outlined"} color={"primary"} size={"small"} onClick={deleteRequest(index)}>
                حذف درخواست
              </Button>
            </div>}
          </AccordionDetails>
        </Accordion>
    )
  }

  return loading ? <Loader/> : (
      <div className={classes.container}>
        <Helmet><title>{showReceipt ? 'تأیید اطلاعات' : 'ثبت نیاز'}</title></Helmet>
        <div className={classes.title}>
          <Typography variant={"h3"}>{showReceipt ? 'تأیید اطلاعات' : 'ثبت نیاز'}</Typography>
        </div>
        <hr/>

        <div className={classnames(classes.media, {"receiptOnly": showReceipt})}>
          {!showReceipt && <div className={classes.form}>
            <Typography color={disasterError ? "error" : "inherit"}>نوع حادثه را مشخص کنید</Typography>
            <CardSlider>
              {Object.keys(disasterCategories).map((d, i) => (
                  <Card
                      k={i}
                      icon={disasterIcons[d]}
                      selected={disaster === d}
                      onClick={handleDisaster(d)}
                      error={disasterError}
                  >
                    <div>{disasterCategories[d]}</div>
                  </Card>
              ))}
            </CardSlider>

            <Typography style={{marginTop: Theme.spacing(2)}} gutterBottom>درخواست‌های خود را با وارد کردن اطلاعات
              خواسته‌شده ثبت کنید</Typography>

            {need.map((n, i) => needItemForm(i))}

          </div>}
          {(showReceipt || !isMobileDisplay) && <div className={classes.receipt}>
            <Receipt receipts={need} type={disaster} current={expanded ? parseInt(expanded.slice(5)) : 0}/>
            <div className={classes.desktopBtn}>
              <CustomButton variant={"contained"} onClick={showReceipt ? handleShowReceipt : addRequest}>
                {showReceipt ? 'ویرایش' : 'درخواست جدید'}
              </CustomButton>
              <CustomButton variant={"contained"} onClick={showReceipt ? submitNeed : handleShowReceipt}>
                {showReceipt ? 'تأیید و ثبت' : 'مرحله‌ی بعد'}
              </CustomButton>
            </div>
          </div>}
        </div>

        {isMobileDisplay && <Fab buttons={[
          {
            title: showReceipt ? 'ویرایش' : 'درخواست جدید',
            onClickFn: showReceipt ? handleShowReceipt : addRequest,
          },
          {
            title: showReceipt ? 'تأیید و ثبت' : 'مرحله‌ی بعد',
            onClickFn: showReceipt ? submitNeed : handleShowReceipt,
          },
        ]}/>}

        <FloatingAlert text={message} open={open} handleClose={closeAlert} duration={duration} type={type}/>
      </div>
  );
};

AddNeed.propTypes = {};

export default AddNeed;
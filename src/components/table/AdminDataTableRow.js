import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import PropTypes from "prop-types";
import {
  CircularProgress,
  ClickAwayListener, FormControl, MenuItem,
  Select,
  Tooltip,
  useMediaQuery,
  useTheme,
  withStyles
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

const useRowStyles = makeStyles((theme) => ({
  root: {
    borderBottom: 'unset',
  },
  desc: {
    whiteSpace: "nowrap",
    maxWidth: theme.spacing(5),
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  tooltip: {
    // maxWidth: theme.spacing(25),
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
  select: {
    width: theme.spacing(20),

    '& > div': {
      padding: theme.spacing(1, 4, 1, 2)
    },
  },
  row: {
    backgroundColor: props => props === 2
      ? theme.palette.error.light
      : (props === 6
        ? theme.palette.info.light
        : 'inherit')
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[1],
    fontSize: theme.spacing(1.75),
    lineHeight: theme.spacing(0.2),
  },
}))(Tooltip);

const AdminDataTableRow = props => {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const theme = useTheme()
  const classes = useRowStyles(row.status?.id);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'))

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.row}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.amount || '-'}</TableCell>
        <TableCell align="right">{row.urgent || '-'}</TableCell>
        <TableCell align="right">{row.askDate || '-'}</TableCell>
        <TableCell align="right">{row.changeDate || '-'}</TableCell>
        <TableCell align="right">{row.helpDate || '-'}</TableCell>
        <TableCell align="right">{row.status?.text || '-'}</TableCell>
        <TableCell align="right">{row.type || '-'}</TableCell>
        {row.desc ? <ClickAwayListener onClickAway={handleTooltipClose}>
          <CustomTooltip
            // PopperProps={{disablePortal: false}}
            disableFocusListener={isMobileDisplay}
            disableHoverListener={isMobileDisplay}
            // disableTouchListener
            open={openTooltip}
            onClose={handleTooltipClose}
            title={row.desc}
            placement="right"
            className={classes.tooltip}
            classes={{tooltip: classes.tooltip}}
          >
            <TableCell className={classes.desc} onClick={handleTooltipOpen} align="center">
              <HelpOutlineRoundedIcon/>
            </TableCell>
          </CustomTooltip>
        </ClickAwayListener> : <TableCell align="center">-</TableCell>}
        <TableCell align="right">
          <div className={classes.actions}>
            {props.loading ? <CircularProgress/> :
              <Select
                variant={"outlined"}
                className={classes.select}
                disabled={row.status?.id === 6}
                color={"primary"}
                value={row.status?.id}
                onChange={e => props.statusFn(e.target.value)}
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <MenuItem value={0}>در انتظار تأیید</MenuItem>
                <MenuItem value={1}>تأیید شده</MenuItem>
                <MenuItem value={2}>رد شده</MenuItem>
                <MenuItem value={3}>در حال ارسال</MenuItem>
                <MenuItem value={4}>در حال آماده‌سازی</MenuItem>
                <MenuItem value={5}>ارسال شده</MenuItem>
                <MenuItem value={6}>دریافت شده</MenuItem>
              </Select>}
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.root} style={{paddingBottom: 0, paddingTop: 0}} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                اطلاعات ارسال
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align={"right"}>درخواست‌دهنده</TableCell>
                    <TableCell align={"right"}>آدرس</TableCell>
                    <TableCell align={"right"}>موقعیت مکانی</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={classes.root}>
                    <TableCell align="right">{row.user_info.fullname}</TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {row.user_info.address}
                    </TableCell>
                    <TableCell align="right">[{row.user_info.location.lat}, {row.user_info.location.long}]</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

AdminDataTableRow.propTypes = {
  k: PropTypes.any,
  row: PropTypes.object.isRequired,
  statusFn: PropTypes.func,
  deleteFn: PropTypes.func,
  loading: PropTypes.bool,
};

export default AdminDataTableRow;
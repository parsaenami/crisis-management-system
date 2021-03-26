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
import { ClickAwayListener, Tooltip } from "@material-ui/core";

const useRowStyles = makeStyles(theme => ({
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
    '& + div': {
      '& > div': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.light,
        fontSize: theme.spacing(2),
        lineHeight: theme.spacing(0.2),
      },
    },
  },
}));

const DataTableRow = props => {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          </TableCell>
          <TableCell align="right" component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.amount}</TableCell>
          <TableCell align="right">{row.urgent}</TableCell>
          <TableCell align="right">{row.askDate}</TableCell>
          <TableCell align="right">{row.helpDate}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.type}</TableCell>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                PopperProps={{disablePortal: true}}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                open={openTooltip}
                onClose={handleTooltipClose}
                title={row.desc}
                placement="right"
                className={classes.tooltip}
            >
              <TableCell className={classes.desc} onClick={handleTooltipOpen} align="right">
                <HelpOutlineRoundedIcon/>
              </TableCell>
            </Tooltip>
          </ClickAwayListener>
        </TableRow>
        <TableRow>
          <TableCell className={classes.root} style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  اطلاعات ارسال
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align={"right"}>آدرس</TableCell>
                      <TableCell align={"right"}>موقعیت مکانی</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classes.root}>
                      <TableCell align="right" component="th" scope="row">
                        {row.info.address}
                      </TableCell>
                      <TableCell align="right">[{row.info.location.lat}, {row.info.location.long}]</TableCell>
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

DataTableRow.propTypes = {
  row: PropTypes.shape({
    info: PropTypes.shape({
      address: PropTypes.string.isRequired,
      location: PropTypes.shape({
        lat: PropTypes.string,
        long: PropTypes.string,
      }),
    }).isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    urgent: PropTypes.number.isRequired,
    askDate: PropTypes.string.isRequired,
    helpDate: PropTypes.string.isRequired,
    type: PropTypes.string,
    status: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default DataTableRow;
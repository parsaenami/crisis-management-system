import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DataTableRow from "./DataTableRow";
import DataTableHead from "./DataTableHead";
import Loader from "../common/Loader";
import { CircularProgress } from "@material-ui/core";


const columns = [
  {id: 'name', numeric: false, disablePadding: false, label: 'عنوان نیاز'},
  {id: 'amount', numeric: true, disablePadding: false, label: 'تعداد'},
  {id: 'urgent', numeric: true, disablePadding: false, label: 'ضروری'},
  {id: 'askDate', numeric: false, disablePadding: false, label: 'تاریخ درخواست'},
  {id: 'changeDate', numeric: false, disablePadding: false, label: 'آخرین بروزرسانی'},
  {id: 'helpDate', numeric: false, disablePadding: false, label: 'تاریخ امدادرسانی'},
  {id: 'status', numeric: false, disablePadding: false, label: 'وضعیت'},
  {id: 'type', numeric: false, disablePadding: false, label: 'نوع حادثه'},
  {id: 'desc', numeric: false, disablePadding: false, label: 'توضیحات'},
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    direction: "rtl",
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.secondary.light,
  },
  table: {
    minWidth: 750,
  },
  footer: {
    '& > div': {
      display: "flex",
      padding: theme.spacing(0, 2),
      '& > *': {
        flex: "unset",
        '&:nth-child(3)': {
          margin: theme.spacing(0, 1, 0, 2),
        },
        '&:last-child': {
          marginRight: "auto",
          marginLeft: 0,
        },
      },
    },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const DataTable = props => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(order === 'desc' && orderBy === property ? '' : property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

  return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              {props.title}
            </Typography>
          </Toolbar>
          <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={'medium'}
                aria-label="enhanced table"
            >
              <DataTableHead
                  columns={columns}
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={props.rows.length}
              />
              <TableBody>
                {props.loading ? <CircularProgress size={26}/> : stableSort(props.rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => <DataTableRow k={row.name} row={row}/>)}
                {props.showEmptyRows && emptyRows > 0 && (
                    <TableRow style={{height: 53 * emptyRows}}>
                      <TableCell colSpan={6}/>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={props.rows.length}
              rowsPerPage={rowsPerPage}
              labelDisplayedRows={({from, to, count}) => `[${from} تا ${to}] از ${count}`}
              labelRowsPerPage={'تعداد:'}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              className={classes.footer}
          />
        </Paper>
      </div>
  );
};

DataTable.propTypes = {
  title: PropTypes.string,
  showEmptyRows: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    urgent: PropTypes.string.isRequired,
    askDate: PropTypes.string.isRequired,
    changeDate: PropTypes.string,
    helpDate: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    info: PropTypes.shape({
      address: PropTypes.string.isRequired,
      location: PropTypes.shape({
        lat: PropTypes.string,
        long: PropTypes.string,
      }),
    }).isRequired,
  })).isRequired,
}

export default DataTable;
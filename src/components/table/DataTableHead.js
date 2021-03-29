import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";

const DataTableHead = props => {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
      <TableHead>
        <TableRow>
          <TableCell/>
          {props.columns.map((column) => (
              <TableCell
                  key={column.id}
                  align={"right"}
                  // align={column.numeric ? 'right' : 'left'}
                  padding={column.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === column.id ? order : false}
              >
                <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={createSortHandler(column.id)}
                    style={{direction: "ltr"}}
                >
                  {orderBy === column.id ? (
                      <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                  <span>{column.label}</span>
                </TableSortLabel>
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
  );
};

DataTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    numeric: PropTypes.bool,
    disablePadding: PropTypes.bool,
    label: PropTypes.string,
  }))
};

export default DataTableHead;
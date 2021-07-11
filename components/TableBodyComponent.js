import { Checkbox, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";

function TableBodyComponent(props) {
  const { page, rowsPerPage, bodyData, selected, setSelected, order, orderBy } =
    props;
  const isSelected = (name) => {
    return selected.indexOf(name) !== -1;
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortTable = (array, comparator) => {
      const rowHeader = array.map((el, i) => [el, i])
      rowHeader.sort((a, b) => {
          const order = comparator(a[0], b[0])
          
          if (order !== 0) return order;
          return a[1] - b[1];
      })
      console.log(rowHeader)
      return rowHeader.map((el) => el[0])
  }


  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    //if selected row is not in the selected array, add row to the said array
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      //remove the 1st selected element when unchecked
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      //if everything is selected, check all boxes
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, bodyData.length - page * rowsPerPage);

  return (
    <TableBody>
      {sortTable(bodyData, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.name);
          const labelId = `table-checkbox-${index}`;

          return (
            <TableRow
              selected={isItemSelected}
              tabIndex={-1}
              aria-checked={isItemSelected}
              role="checkbox"
              onClick={(e) => handleClick(e, row.name)}
              key={row.name}
              hover
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </TableCell>
              <TableCell
                align="right"
                component="th"
                id={labelId}
                scope="row"
                padding="none"
              >
                {row.name}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.website}</TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right">{row.street}</TableCell>
              <TableCell align="right">{row.suite}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.zipcode}</TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 50 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default TableBodyComponent;

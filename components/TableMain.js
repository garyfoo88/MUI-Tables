import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import TableHeader from "./TableHeader";
import axios from "axios";
import TableBodyComponent from "./TableBodyComponent";

//custom styles as classes
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    //Example of adding pseudo class
    // '&:hover': {
    //     backgoundColor: 'red'
    // }
  },

  table: {
    minWidth: 750,
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function TableMain() {
  //invoke custom style classes hook
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [headerData, setHeaderData] = useState([]);
  const [bodyData, setBodyData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then(({ data }) => {
      for (const property in data[0]) {
        if (property !== "address" && property !== "id") {
          setHeaderData((headerData) => [...headerData, property]);
        }
      }

      for (const location in data[0].address) {
        if (location !== "geo") {
          setHeaderData((headerData) => [...headerData, location]);
        }
      }

      for (const userData of data) {
        setBodyData((bodyData) => [
          ...bodyData,
          {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            website: userData.website,
            company: userData.company.name,
            street: userData.address.street,
            suite: userData.address.suite,
            city: userData.address.city,
            zipcode: userData.address.zipcode,
          },
        ]);
      }
    });
  }, []);

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = bodyData.map((item) => item.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            aria-label="table"
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            className={classes.table}
          >
            <TableHeader
              classes={classes}
              selected={selected.length}
              order={order}
              orderBy={orderBy}
              headerData={headerData}
              onSelectAllClick={onSelectAllClick}
              onRequestSort={onRequestSort}
              rowCount={bodyData.length}
            />
          </Table>
          <TableBodyComponent
            page={page}
            rowsPerPage={rowsPerPage}
            bodyData={bodyData}
            selected={selected}
          />
        </TableContainer>
      </Paper>
    </div>
  );
}

export default TableMain;

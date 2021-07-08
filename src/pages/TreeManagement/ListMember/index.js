import React from "react";
import moment from "moment";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { InputBase, TextField, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchIcon from "@material-ui/icons/Search";

import UtilManagement from "../utilManagement";
import useManagementTreeStyle from "../useTreeManagementStyles";
import ShowDetail from "./ShowDetail";
import {
  selectFetchingCurrent,
  getDetailPerson,
  selectPerson,
  REFRESH_CURRENT_PERSON,
} from "../../Home/homeSlice";

const columns = [
  { id: "avatar", label: "", minWidth: 10 },
  { id: "firstName", label: "First Name", minWidth: 60 },
  { id: "lastName", label: "Last Name", minWidth: 60 },
  { id: "gender", label: "Gender", minWidth: 20, align: "center" },
  {
    id: "dob",
    label: "Date of birth",
    minWidth: 80,
    align: "center",
  },
  {
    id: "dod",
    label: "Day of dead",
    minWidth: 80,
    align: "center",
  },
  {
    id: "age",
    label: "Age",
    minWidth: 160,
    align: "center",
  },
  {
    id: "father",
    label: "Father",
    minWidth: 80,
    align: "left",
  },
  {
    id: "mother",
    label: "Mother",
    minWidth: 80,
    align: "left",
  },
  {
    id: "spouses",
    label: "Spouses",
    minWidth: 100,
    align: "left",
  },
];

const noneSearch = ["age", "avatar", "gender", "dob", "dod", "father", "mother", "spouses"];

export default function ListMember(props) {
  const { list, valSearch, handleSubmitSearch, handleChangeFormSearch } = props;
  const classes = useManagementTreeStyle();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [form, setForm] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showDetail, setShowDetail] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = React.useState({});
  const isFetchingCurrentPerson = useSelector(selectFetchingCurrent);
  const currentPerson = useSelector(selectPerson);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getName = (object) => {
    const name = _.get(object, "name");
    if (name === "null null" || name === null) {
      return "Unknow name";
    }
    return name;
  };

  const formatSpouse = (value) => {
    if (value.length === 0) return "";
    const rs = _.join(
      _.transform(value, (result, ele) => result.push(getName(ele)), []),
      " "
    );
    return rs;
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleSubmitSearch();
    }
  };

  const handleChangeAddForm = (e, label, isDeath = false) => {
    switch (label) {
    case "firstName": {
      setForm({ ...form, firstName: e.target.value });
      break;
    }
    case "lastName": {
      setForm({ ...form, lastName: e.target.value });
      break;
    }
    case "gender": {
      setForm({ ...form, gender: e.target.value });
      break;
    }
    case "dob": {
      setForm({ ...form, dob: moment(e.target.value).format("YYYY-MM-DD") });
      break;
    }
    case "dod": {
      setForm({ ...form, dod: moment(e.target.value).format("YYYY-MM-DD") });
      break;
    }
    case "isDeath": {
      setForm({
        ...form,
        isDeath: isDeath,
        dod: !isDeath ? null : form.isDeath,
      });
      break;
    }
    case "note": {
      setForm({ ...form, note: e.target.value });
      break;
    }
    case "occupation": {
      setForm({ ...form, occupation: e.target.value });
      break;
    }
    case "phone": {
      setForm({ ...form, phone: e.target.value });
      break;
    }
    case "address": {
      setForm({ ...form, address: e.target.value });
      break;
    }
    default: {
      break;
    }
    }
  };

  const handleSelectDetail = (record) => {
    setForm(record);
    setShowDetail(true);
    dispatch(getDetailPerson(record.id));
  };

  const handleCancel = () => {
    setShowDetail(false);
    dispatch(REFRESH_CURRENT_PERSON());
  };

  return (
    <Paper className={classes.root}>
      {showDetail && (
        <ShowDetail
          showDetail={showDetail}
          currentPerson={currentPerson}
          isFetchingCurrentPerson={isFetchingCurrentPerson}
          form={form}
          error={error}
          handleCancel={handleCancel}
          handleChangeAddForm={handleChangeAddForm}
        />
      )}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.header}
                >
                  {!noneSearch.includes(column.id) ? (
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder={column.label}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                        value={valSearch[column.id]}
                        onChange={(e) => handleChangeFormSearch(e, column.id)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                  ) : (
                    column.id !== "age" && column.label
                  )}
                  {column.id === "age" && (
                    <Grid container alignItems="center">
                      <Grid item xs={5}>
                        Age
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          type="text"
                          label="Age"
                          select
                          SelectProps={{
                            native: true,
                          }}
                          value={valSearch.age}
                          onChange={(e) => handleChangeFormSearch(e, "age")}
                          className={classes.ageInput}
                        >
                          {UtilManagement.rangeAge.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow
                  hover
                  onClick={() => handleSelectDetail(row)}
                  className={classes.rowTabel}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  selected={row.id === currentPerson.id}
                >
                  {columns.map((column) => {
                    const value =
                      column.id === "spouses" ? formatSpouse(row[column.id]) : row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

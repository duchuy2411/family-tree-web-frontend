import React, { useEffect, useState } from "react";
// MUI
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createTree } from "../Slice";

// MUI
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import {
  Grid,
  Paper,
  Typography,
  Hidden,
  Button,
  Tooltip,
  LinearProgress,
} from "@material-ui/core";
// components
import SearchBox from "../../components/Search/Search";
import CustomToggleButton from "./components/ToggleButton/CustomToggleButtons";
import TreeItem from "./components/TreeItem/TreeItem";
import Modal from "./components/Modal";

import useHomePageStyles from "./useHomePageStyles";

import { selectUser } from "../../store/authSlice";

import {
  selectFetching,
  selectTrees,
  importTree,
  getListByKeyword,
  getTreeList,
  getTreesPublic,
} from "./homeSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { firstName, midName, lastName } = useSelector(selectUser);
  const name = `${firstName ? firstName : ""} ${midName ? midName : ""} ${
    lastName ? lastName : ""
  }`;
  const classes = useHomePageStyles();
  // eslint-disable-next-line no-unused-vars
  const [notificationCount, setNotificationCount] = useState(0); // using redux instead
  // eslint-disable-next-line no-unused-vars
  const [sortOrder, setSortOrder] = useState("all");

  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [search, setSearch] = useState("");
  const history = useHistory();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#905842",
      },
      secondary: {
        main: "#F2E1DA",
      },
    },
  });

  // eslint-disable-next-line no-unused-vars
  const handleSortOrder = (event, newOrder) => {
    if (newOrder !== null) {
      setSortOrder(newOrder);
    }
  };

  // trees
  const trees = useSelector(selectTrees);
  const fetching = useSelector(selectFetching);

  useEffect(() => {
    dispatch(getTreeList());
  }, []);

  const familyTreeList = (
    <div>
      {trees.map((tree) => {
        return (
          <TreeItem
            key={tree.id}
            id={tree.id}
            logo={null}
            name={tree.name}
            updatedAt={tree.lastModified}
            author={tree.owner}
            contributors={tree.editors}
          />
        );
      })}
    </div>
  );

  const handleShow = (isShow) => {
    setShow(isShow);
  };

  const handleChangeFormCreate = (e, label) => {
    switch (label) {
    case "name": {
      setForm({ ...form, name: e.target.value });
      break;
    }
    case "description": {
      setForm({ ...form, description: e.target.value });
      break;
    }
    default: {
      break;
    }
    }
  };

  const handleSave = async () => {
    const response = await dispatch(createTree(form));
    if (response.data) {
      alert(response.message);
      history.push(`/custom-tree/${response.data.id}`);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("ImportedFile", file);
    const rs = await dispatch(importTree(formData));
    if (rs.id) {
      history.push(`/custom-tree/${rs.id}`);
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(getListByKeyword(search));
    setMode("mysearchhh");
  };

  const [mode, setMode] = React.useState("myfamily");

  const handleChangeMode = (event, newMode) => {
    if (mode !== newMode) {
      if (newMode !== null) {
        setMode(newMode);
      }
      if (newMode === "myfamily") {
        dispatch(getTreeList());
      } else {
        dispatch(getTreesPublic());
      }
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      {show && (
        <Modal
          show={show}
          form={form}
          handleShow={handleShow}
          handleSave={handleSave}
          handleChangeFormCreate={handleChangeFormCreate}
        />
      )}
      <div className={classes.wrapper}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <Grid container justify="space-between" className={classes.grid9}>
              <Grid item md={9} sm={9} xs container alignItems="center" className={classes.purple}>
                <form className={classes.searchBox} onSubmit={handleSubmitSearch}>
                  <SearchBox
                    ariaLabel="Search for family"
                    search={search}
                    handleChangeSearch={handleChangeSearch}
                  />
                </form>
              </Grid>
            </Grid>
          </Grid>

          {/* Top right panel  */}
          <Hidden smDown>
            <Grid item md={6}>
              <Paper className={classes.welcomePanel} elevation={9}>
                <div className={classes.welcomeText}>
                  <Typography
                    component="p"
                    className={classes.bigText}
                  >{`Hello ${name}`}</Typography>
                  <Typography variant="h6" component="p">
                    {"Let's create a new tree"}
                  </Typography>
                </div>
                <Grid item md={2}></Grid>
                <Grid item md={2} className={classes.btnNewTree}>
                  <Tooltip title="Import file JSON">
                    <div>
                      <label htmlFor="importss" className={classes.customBtnImport}>
                        <span className="fas fa-file-import"></span>
                      </label>
                      <form>
                        <input
                          id="importss"
                          style={{ display: "none" }}
                          type="file"
                          name="ImportedFile"
                          onChange={handleImport}
                        />
                      </form>
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item md={2} className={classes.btnNewTree}>
                  <Button className={classes.customBtnDashed} onClick={() => handleShow(true)}>
                    <span className="fas fa-plus"></span>
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
        {fetching ? (
          <div className={classes.groupProgress}>
            <LinearProgress className={classes.progress} />
            <LinearProgress className={classes.progress} />
            <LinearProgress className={classes.progress} />
          </div>
        ) : (
          <div className={classes.treeList}>
            <CustomToggleButton mode={mode} handleChangeMode={handleChangeMode} />
            {familyTreeList}
          </div>
        )}
      </div>
    </MuiThemeProvider>
  );
}

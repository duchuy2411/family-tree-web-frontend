import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
// MUI
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createTree } from "../Slice";

// MUI
import { Fade, Grid, Paper, Typography, Hidden, Button } from "@material-ui/core";

// components
import SearchBox from "../../components/Search/Search";
import CustomToggleButton from "./components/ToggleButton/CustomToggleButtons";
import TreeItem from "./components/TreeItem/TreeItem";
import Modal from "./components/Modal";

import useHomePageStyles from "./useHomePageStyles";

import { selectUser } from "../../store/authSlice";

import api from "../../utils/api";

import { SET_TREES_ARRAY } from './homeSlice';

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
  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const handleSortOrder = (event, newOrder) => {
    if (newOrder !== null) {
      setSortOrder(newOrder);
    }
  };

  // trees
  const [trees, setTrees] = useState([]);

  const getTrees = useCallback(async () => {
    try {
      const response = await api.getTreeList();
      // eslint-disable-next-line no-unused-vars
      const { data, message, errors } = response.data;
      const trees = data;
      if (trees) {
        setTrees(trees);
        dispatch(SET_TREES_ARRAY(trees));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    getTrees();
  }, [getTrees]);
  // end trees

  const familyTreeList = (
    <div>
      {trees.map((tree, index) => {
        return (
          // <Fade
          //   key={tree.id}
          //   in={true}
          //   style={{
          //     transitionDelay: true ? `${300 + index * 200}ms` : "0ms",
          //   }}
          //   {...(true ? { timeout: 500 } : {})}
          // >
          <div>
            {/* Fade need a ref: solved by wrap element in a div */}
            <TreeItem
              id={tree.id}
              logo={tree.owner.avatarUrl}
              name={tree.name}
              updatedAt={tree.lastModified}
              author={tree.owner}
              contributors={tree.editors}
            />
          </div>
          // </Fade>
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
    }
  };

  const handleSave = async () => {
    const response = await dispatch(createTree(form));
    if (response.data) {
      alert(response.message);
      history.push(`/custom-tree/${response.data.id}`);
    }
  };

  return (
    <>
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
                <SearchBox className={classes.searchBox} ariaLabel="Search for family" />
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
                <Grid item md={5}></Grid>
                <Grid item md={1} className={classes.btnNewTree}>
                  <Button className={classes.customBtnDashed} onClick={() => handleShow(true)}>
                    {" "}
                    +{" "}
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
        <div className={classes.treeList}>
          <CustomToggleButton />
          {familyTreeList}
        </div>
      </div>
    </>
  );
}

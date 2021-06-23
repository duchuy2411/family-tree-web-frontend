import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { ExpandMore } from "@material-ui/icons";

import TreeInformation from "./TreeInformation";
import Contribute from "./Contribute";
import ListMember from "./ListMember";
import utilManagement from "./utilManagement";

import {
  updateTree,
  selectTree,
  // selectTrees,
  fetchTreesAndSetCurrent,
  deleteTree,
  addEditor,
  removeEditor,
} from "../Home/homeSlice";
import { fetchTree } from "../CustomTree/customTreeSlice";
import Adapter from "../../utils/adapter";
import useStyles from "./useTreeManagementStyles";
import swal from "sweetalert";

const TreeManagement = () => {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [value, setValue] = useState();
  const [formTree, setFormTree] = useState({ name: "", description: "", publicMode: false });
  const [valSearch, setValSearch] = useState({ firstName: "", lastName: "", age: "" });
  const [originList, setOriginList] = useState();
  const dispatch = useDispatch();
  // const listTree = useSelector(selectTrees);
  const currentTree = useSelector(selectTree);
  const { id } = useParams();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars

  useEffect(async () => {
    const rs = await dispatch(fetchTree(id));
    if (rs.data) {
      setFormTree({ ...formTree, publicMode: _.get(rs.data, "data.publicMode", false) });
      const listTree = Adapter.parseList(_.get(rs.data, "data.people", []));
      const parse = _.map(listTree, (ele) => createData(ele, classes));
      setList(parse);
      setOriginList(parse);
    }
    if (!currentTree || Object.keys(currentTree).length === 0)
      dispatch(fetchTreesAndSetCurrent(id));
  }, []);

  useEffect(() => {
    if (currentTree && Object.keys(currentTree).length !== 0) {
      setFormTree({
        name: currentTree.name,
        description: currentTree.description,
        publicMode: currentTree.publicMode,
      });
    }
  }, [currentTree]);

  const handleChange = (e, label) => {
    switch (label) {
    case "name": {
      setFormTree({ ...formTree, name: e.target.value });
      break;
    }
    case "description": {
      setFormTree({ ...formTree, description: e.target.value });
      break;
    }
    case "publicMode": {
      setFormTree({ ...formTree, publicMode: !formTree.publicMode });
      break;
    }
    }
  };

  const getAge = (dob, dod = null) => {
    if (dob === null || dob === "") return "";
    if (!dod) {
      return parseInt(moment().format("YYYY"), 10) - parseInt(moment(dob).format("YYYY"), 10);
    }
    return parseInt(moment(dod).format("YYYY"), 10) - parseInt(moment(dob).format("YYYY"), 10);
  };

  function createData(obj, classes = null) {
    return {
      id: obj.id,
      avatar: <img className={classes.smallImg} src={`${_.get(obj, "imageUrl", "")}`} />,
      firstName: _.get(obj, "firstName", ""),
      lastName: _.get(obj, "lastName", ""),
      gender:
        _.get(obj, "gender", "") === "Male" ? (
          <span className={classes.blockMale}></span>
        ) : (
          <span className={classes.blockFemale}></span>
        ),
      age: getAge(_.get(obj, "dob", ""), _.get(obj, "dod", "")),
      dod: _.get(obj, "dod", ""),
      dob: _.get(obj, "dob", ""),
      father: utilManagement.formatName(obj, "father"),
      mother: utilManagement.formatName(obj, "mother"),
      spouses: _.get(obj, "spouses", []),
    };
  }

  const handleUpdate = () => {
    dispatch(updateTree(formTree));
  };

  const handleDelete = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this tree!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const rs = await dispatch(deleteTree(parseInt(id)));
        if (rs) history.push("/");
      }
    });
  };

  const handleSubmit = () => {
    dispatch(updateTree(id, formTree));
    setOpen(false);
  };

  const handleChangeFormSearch = (e, label) => {
    switch (label) {
    case "firstName": {
      setValSearch({ ...valSearch, firstName: e.target.value });
      break;
    }
    case "lastName": {
      setValSearch({ ...valSearch, lastName: e.target.value });
      break;
    }
    case "age": {
      setValSearch({ ...valSearch, age: e.target.value });
      handleSubmitSearch(e.target.value);
      break;
    }
    default: {
      break;
    }
    }
  };

  const handleSubmitSearch = (age = null) => {
    const valAge = age || valSearch.age || 0;
    const newList = _.filter(
      originList,
      (ele) =>
        (valSearch.firstName === "" || _.includes(ele.firstName, valSearch.firstName)) &&
        (valSearch.lastName === "" || _.includes(ele.lastName, valSearch.lastName)) &&
        (valAge === 80 || `${valAge}` === "0"
          ? ele.age >= valAge - 9 || ele.age === ""
          : ele.age <= parseInt(valAge) && ele.age > parseInt(valAge) - 10)
    );
    setList([...newList]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setFormTree({ name: currentTree.name, description: currentTree.description, publicMode: currentTree.publicMode });
    setOpen(true);
  };

  // contribute
  const handleChangeText = (e) => {
    setValue(e.target.value);
  };

  const handleRemoveEditor = async (name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this editor!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const rs = await dispatch(removeEditor(id, { usernames: [name] }));
        if (rs) {
          swal("Your memory has been created!", {
            icon: "success",
          });
        }
      }
    });
  };

  const handleSubmitEditor = async () => {
    await dispatch(addEditor(id, { usernames: [value] }));
    setOpenEditor(false);
    setValue("");
  };

  const handleClickEditor = () => {
    setOpenEditor(true);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  return (
    <div className={classes.rootAccording}>
      <Accordion className={classes.section}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.tab}
        >
          <Typography className={classes.heading}>{"Tree's information"}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {currentTree && (
            <TreeInformation
              formTree={formTree}
              currentTree={currentTree}
              open={open}
              handleClose={handleClose}
              handleShow={handleShow}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleSubmit={handleSubmit}
            />)
          }
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.section}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className={classes.tab}
        >
          <Typography className={classes.heading}>Contribute</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {currentTree &&
            <Contribute
              owner={_.get(currentTree, "owner")}
              editors={_.get(currentTree, "editors")}
              value={value}
              openEditor={openEditor}
              handleChangeText={handleChangeText}
              handleCloseEditor={handleCloseEditor}
              handleClickEditor={handleClickEditor}
              handleSubmitEditor={handleSubmitEditor}
              handleRemoveEditor={handleRemoveEditor}
            />
          }
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.section} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          className={classes.tab}
        >
          <Typography className={classes.heading}>List member</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <ListMember
            list={list}
            valSearch={valSearch}
            handleChangeFormSearch={handleChangeFormSearch}
            handleSubmitSearch={handleSubmitSearch}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TreeManagement;

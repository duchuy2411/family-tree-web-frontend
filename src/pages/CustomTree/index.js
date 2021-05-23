/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import * as go from "gojs";
import _ from "lodash";
import moment from "moment";
import GenogramLayout from "../../layouts/GenogramLayout/GenogramLayout";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchFamilyTreeById } from "./customTreeSlice";
import "./style.css";
// MUI
import { Container, Grid, Paper, Typography } from "@material-ui/core";

import CONSTANTS from "../../utils/const";
import Adapter from "../../utils/adapter";
import UtilDiagram from "./utilDiagram";

// custom components
import SearchBox from "../../components/Search/Search";
import CardMember from "./components/CardMember/CardMember";
import CustomToggleButton from "./components/CustomToggleButton/CustomToggleButton";
import ListMember from "./components/ListMember/ListMember";
import TreeDiagram from "./components/TreeDiagram";
import ModalAlert from "./components/ModalAlert";
import ModalAddTree from "./components/ModalAddTree";
import AlertNotConfirm from "./components/AlertNotConfirm";

import data from "../../data";
import useCustomTreePageStyles from "./useCustomTreePageStyles";

const { SPOUSE, MOTHER, FATHER, CHILDREN } = CONSTANTS;

// sample data
export default function CustomTreePage() {
  const classes = useCustomTreePageStyles();
  const dispatch = useDispatch();
  const { GENDER, RELATIONSHIP } = CONSTANTS;
  const tempDiagram = useRef(null);
  const [nodeDataArray, setNodeDataArray] = useState([]);
  const [linkDataArray, setLinkDataArray] = useState();
  const [model, setModel] = useState({
    key: "",
    name: "",
    dob: "",
    dod: "",
    note: "",
  });
  const [diagram, setDiagram] = useState();
  const [showModal, setShowModal] = useState({
    show: false,
    select: null,
    step: 0,
    mode: "",
    rel: [],
  });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    nodeMarriage: null,
    relationship: "child",
    isNew: false,
    isDeath: false,
    dod: null,
    dob: null,
    note: "",
    occupation: "",
    address: "",
    phone: "",
    nodeRelationship: null,
  });
  const [relationship, setRelationship] = useState(RELATIONSHIP);
  const [gender, setGender] = useState(GENDER);
  const [modelData, setModelData] = useState();
  const [alterLinkDataArray, setAlterLink] = useState([]);
  const [showAlert, setAlert] = useState(false);
  const [nodeSelect, setNodeSelect] = useState();
  const [warning, setWarning] = useState(false);
  const [search, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [showAlternativeNotConfirm, setAlternativeNotConfirm] = useState({
    show: false,
    warningAlternativeNode: false,
    warningUpdateForMarriage: false,
  });
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchFamilyTreeById(id)).then((rs) => {
      const parseTree = Adapter.parse(_.get(rs.data, "data.people", []));
      setNodeDataArray([...parseTree]);
      setAlterLink([...parseTree]);
      setListSearch([...Adapter.getWithoutLinkLabel(parseTree)]);
    });
  }, []);

  function handleModelChange(data) {
    const insertedNodeKeys = data.insertedNodeKeys;
    const modifiedNodeData = data.modifiedNodeData;
    const removedNodeKeys = data.removedNodeKeys;
    const insertedLinkKeys = data.insertedLinkKeys;
    const modifiedLinkData = data.modifiedLinkData;
    const removedLinkKeys = data.removedLinkKeys;
    if (modifiedNodeData) {
    }
    if (removedLinkKeys && removedNodeKeys) {
    } else {
      return;
    }
  }

  function handleDiagramEvent(e) {
    const name = e.name;
    switch (name) {
      case "ChangedSelection": {
        const sel = e.subject.first();
        if (sel) {
          setModel({
            ...model,
            key: sel.data.key,
            gender: sel.data.s === "F" ? "Female" : "Male",
            name: sel.data.n,
            dod: sel.data.dod,
            dob: sel.data.dob,
            note: sel.data.note,
          });
        } else {
        }
        break;
      }
      default:
        break;
    }
  }

  function setupDiagram(newDiagram, array, focusId) {
    newDiagram.model = go.GraphObject.make(go.GraphLinksModel, {
      // declare support for link label nodes
      linkLabelKeysProperty: "labelKeys",
      // this property determines which template is used
      nodeCategoryProperty: "type",
      // if a node data object is copied, copy its data.a Array
      copiesArrays: true,
      // create all of the nodes for people
      nodeDataArray: array,
      linkKeyProperty: "key",
    });

    setupMarriages(newDiagram);
    setupParents(newDiagram);

    var node = newDiagram.findNodeForKey(focusId);
    if (node !== null) {
      newDiagram.select(node);
      setModel({
        ...model,
        key: node.data.key,
        name: node.data.n,
        gender: node.data.s === "F" ? "Female" : "Male",
        dob: node.data.dob,
        dod: node.data.dod,
        note: node.data.note,
      });
      // remove any spouse for the person under focus:
      // node.linksConnected.each(function(l) {
      //   if (!l.isLabeledLink) return;
      //   console.log("link: ", l);
      //   l.opacity = 0;
      //   var spouse = l.getOtherNode(node);
      //   spouse.opacity = 0;
      //   spouse.pickable = false;
      // });
    }
    return newDiagram;
  }

  function findMarriage(diagram, a, b) {
    // A and B are node keys
    var nodeA = diagram.findNodeForKey(a);
    var nodeB = diagram.findNodeForKey(b);
    if (nodeA !== null && nodeB !== null) {
      var it = nodeA.findLinksBetween(nodeB); // in either direction

      while (it.next()) {
        var link = it.value;
        // Link.data.category === "Marriage" means it's a marriage relationship
        if (link.data !== null && link.data.category === "Marriage")
          return link;
      }
    }
    return null;
  }
  // now process the node data to determine marriages
  function setupMarriages(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;
    for (var i = 0; i < nodeDataArray.length; i++) {
      var data = nodeDataArray[i];
      var key = data.key;
      var uxs = data.ux;
      if (uxs !== undefined) {
        if (typeof uxs === "number") uxs = [uxs];
        for (var j = 0; j < uxs.length; j++) {
          var wife = uxs[j];
          if (key === wife) {
            // or warn no reflexive marriages
            continue;
          }
          var link = findMarriage(diagram, key, wife);
          if (link === null) {
            // add a label node for the marriage link
            var mlab = { s: "LinkLabel", type: "LinkLabel" };
            model.addNodeData(mlab);
            // add the marriage link itself, also referring to the label node
            var mdata = {
              from: key,
              to: wife,
              labelKeys: [mlab.key],
              category: "Marriage",
            };
            model.addLinkData(mdata);
          }
        }
      }
      var virs = data.vir;
      if (virs !== undefined) {
        if (typeof virs === "number") virs = [virs];
        for (var j = 0; j < virs.length; j++) {
          var husband = virs[j];
          if (key === husband) {
            // or warn no reflexive marriages
            continue;
          }
          var link = findMarriage(diagram, key, husband);
          if (link === null) {
            // add a label node for the marriage link
            var mlab = { s: "LinkLabel", type: "LinkLabel" };
            model.addNodeData(mlab);
            // add the marriage link itself, also referring to the label node
            var mdata = {
              from: key,
              to: husband,
              labelKeys: [mlab.key],
              category: "Marriage",
            };
            model.addLinkData(mdata);
          }
        }
      }
    }
  }
  // process parent-child relationships once all marriages are known
  function setupParents(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;
    for (var i = 0; i < nodeDataArray.length; i++) {
      var data = nodeDataArray[i];
      var key = data.key;
      var mother = data.m;
      var father = data.f;
      if (mother !== undefined && father !== undefined) {
        var link = findMarriage(diagram, mother, father);
        if (link === null) {
          // or warn no known mother or no known father or no known marriage between them
          if (window.console)
            window.console.log("unknown marriage: " + mother + " & " + father);
          continue;
        }
        var mdata = link.data;
        var mlabkey = mdata.labelKeys[0];
        var cdata = { from: mlabkey, to: key };
        model.addLinkData(cdata);
      }
    }
  }

  function initDiagram() {
    const $ = go.GraphObject.make;
    const myDiagram = $(go.Diagram, {
      initialAutoScale: go.Diagram.UniformToFill,
      "undoManager.isEnabled": true,
      "draggingTool.isEnabled": true,
      // when a node is selected, draw a big yellow circle behind it
      nodeSelectionAdornmentTemplate: $(
        go.Adornment,
        "Auto",
        { layerName: "Grid" }, // the predefined layer that is behind everything else
        $(go.Shape, "Circle", { fill: "#c1cee3", stroke: null }),
        $(go.Placeholder, { margin: 2 })
      ),
      // use a custom layout, defined below
      layout: $(GenogramLayout, {
        direction: 90,
        layerSpacing: 80,
        columnSpacing: 30,
      }),
    });

    myDiagram.nodeTemplateMap.add(
      CONSTANTS.TYPE.MALE, // male
      $(
        go.Node,
        "Auto",
        $(
          go.Panel,
          $(go.Shape, "RoundedRectangle", {
            width: 150,
            height: 170,
            strokeWidth: 2,
            fill: "#7EABD0",
            stroke: "#919191",
          })
        ),
        $(
          go.Panel,
          "Vertical",
          $(
            go.Picture,
            { width: 110, height: 110, margin: 2 },
            new go.Binding("source", "image")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              margin: 5,
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "n")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "dob")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "dod")
          )
        ),
        { contextMenu: contextHandler($, myDiagram) }
      )
    );

    myDiagram.nodeTemplateMap.add(
      CONSTANTS.TYPE.FEMALE, // female
      $(
        go.Node,
        "Auto",
        $(
          go.Panel,
          $(go.Shape, "RoundedRectangle", {
            width: 150,
            height: 170,
            strokeWidth: 2,
            fill: "#FED3DD",
            stroke: "#919191",
          })
        ),
        $(
          go.Panel,
          "Vertical",
          $(
            go.Picture,
            { width: 110, height: 110, margin: 2 },
            new go.Binding("source", "image")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              margin: 5,
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "n")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "dob")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "dod")
          )
        ),
        { contextMenu: contextHandler($, myDiagram) }
      )
    );

    myDiagram.nodeTemplateMap.add(
      CONSTANTS.TYPE.DEAD, // female
      $(
        go.Node,
        "Auto",
        $(
          go.Panel,
          $(go.Shape, "RoundedRectangle", {
            width: 150,
            height: 170,
            strokeWidth: 2,
            fill: "#C0C0C0",
            stroke: "#919191",
          })
        ),
        $(
          go.Panel,
          "Vertical",
          $(
            go.Picture,
            { width: 110, height: 110, margin: 2 },
            new go.Binding("source", "image")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              margin: 5,
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "n")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "dob")
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              stroke: "white",
              font: "14px arial",
              alignment: go.Spot.Center,
            },
            new go.Binding("text", "dod")
          )
        ),
        { contextMenu: contextHandler($, myDiagram) }
      )
    );

    myDiagram.nodeTemplateMap.add(
      "LinkLabel",
      $(go.Node, {
        selectable: false,
        width: 1,
        height: 1,
        fromEndSegmentLength: 40,
      })
    );

    myDiagram.linkTemplate = $(
      // for parent-child relationships
      go.Link,
      {
        routing: go.Link.Orthogonal,
        corner: 2,
        layerName: "Background",
        selectable: false,
        fromSpot: go.Spot.Bottom,
        toSpot: go.Spot.Top,
      },
      $(go.Shape, { stroke: "#424242", strokeWidth: 2 })
    );

    myDiagram.linkTemplateMap.add(
      "Marriage", // for marriage relationships
      $(
        go.Link,
        { selectable: false },
        $(go.Shape, { strokeWidth: 2.5, stroke: "#5d8cc1" /* blue */ })
      )
    );
    setupDiagram(myDiagram, nodeDataArray, 1);
    tempDiagram.current = myDiagram;
    return myDiagram;
  }

  const contextHandler = ($, myDiagram) => {
    return $(
      go.Adornment,
      "Vertical",
      $(
        "ContextMenuButton",
        $(
          go.TextBlock,
          {
            textAlign: "center",
            stroke: "black",
            margin: 5,
            width: 120,
            font: "16px arial",
            alignment: go.Spot.Center,
          },
          "Add node",
          {
            click: function (e, button) {
              handleContextMenuAdd(button, myDiagram);
            },
          }
        )
      ),
      $(
        "ContextMenuButton",
        $(
          go.TextBlock,
          {
            textAlign: "center",
            stroke: "black",
            margin: 5,
            width: 120,
            font: "16px arial",
            alignment: go.Spot.Center,
          },
          "Edit node",
          {
            click: function (e, button) {
              handleContextMenuEdit(button, myDiagram);
            },
          }
        )
      ),
      $(
        "ContextMenuButton",
        $(
          go.TextBlock,
          {
            textAlign: "center",
            stroke: "black",
            margin: 5,
            width: 120,
            font: "16px arial",
            alignment: go.Spot.Center,
          },
          "Remove node",
          {
            click: function (e, button) {
              handleContextMenuDelete(button, myDiagram);
            },
          }
        )
      )
    );
  };

  const handleContextMenuAdd = (button, myDiagram) => {
    var nodedata = button.part.adornedPart.data;
    const newArr = myDiagram.model.nodeDataArray;
    const rel = handleForRelOption(button, myDiagram);
    setShowModal({
      ...showModal,
      show: true,
      step: 1,
      mode: CONSTANTS.MODE_FORM.ADD,
      rel,
    });
    setNodeSelect({ ...nodedata });
  };

  const handleForRelOption = (button, diagram) => {
    const nodedata = button.part.adornedPart.data;
    const arrNode = Adapter.getWithoutLinkLabel(diagram.model.nodeDataArray);
    const rel = [CHILDREN];
    // For spouse
    const spouses = Adapter.getMarriageByArray(arrNode, nodedata.key);

    if (spouses.length >= 1) {
      const getLengthSpouse = Adapter.getMarriageByArray(
        arrNode,
        spouses[0].key
      );
      if (getLengthSpouse.length === 1) rel.push(SPOUSE); // Spouse have only 1 spouse
    } else {
      rel.push(SPOUSE);
    }
    // For father
    const getFather = Adapter.getFather(arrNode, nodedata);
    if (_.get(getFather, "n") === CONSTANTS.UNDEFINED || !getFather)
      rel.push(FATHER);
    const getMother = Adapter.getMother(arrNode, nodedata);
    if (_.get(getMother, "n") === CONSTANTS.UNDEFINED || !getMother)
      rel.push(MOTHER);
    return rel;
  };

  const handleContextMenuEdit = (button, myDiagram) => {
    var nodedata = button.part.adornedPart.data;
    setNodeSelect(nodedata);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    const diagram = tempDiagram.current;
    const getName = form.lastName + form.firstName;
    const getGender =
      form.gender === CONSTANTS.MALE
        ? CONSTANTS.TYPE.MALE
        : CONSTANTS.TYPE.FEMALE;
    switch (showModal.select) {
      case CONSTANTS.SPOUSE: {
        processAddSpouse(nodeSelect, diagram);
        break;
      }
      case CONSTANTS.FATHER:
      case CONSTANTS.MOTHER: {
        processAddParent(nodeSelect, diagram);
        break;
      }
      case CONSTANTS.CHILDREN: {
        processAddChild(nodeSelect, diagram);
        break;
      }
      default: {
        break;
      }
    }
    setShowModal({ ...showModal, show: false, rel: [] });
  };

  const processAddSpouse = (node, diagram) => {
    addNodeSpouse(node, diagram);
  };

  const processAddChild = (node, diagram) => {
    const arrNode = Adapter.getWithoutLinkLabel(diagram.model.nodeDataArray);
    const getSpouse = Adapter.getMarriageByArray(arrNode, node.key);
    let nodeSync = {};
    if (getSpouse.length === 0) {
      // process add spouse
      const gender = node.s === "M" ? "F" : "M";
      const obj = {
        type: gender,
        s: gender,
        n:
          gender === "M"
            ? CONSTANTS.FATHER_OF(node.n)
            : CONSTANTS.MOTHER_OF(node.n),
      };
      _.set(obj, gender === "M" ? "ux" : "vir", [node.key]);
      nodeSync = addNodeSpouse(node, diagram);
    }
    setForm({ ...form, nodeRelationship: nodeSync.key });
    addNodeChild(node, diagram);
  };

  const processAddParent = (node, diagram) => {
    addParent(node, diagram);
  };

  const handleUpdate = () => {
    const indexNode = Adapter.getIndex(alterLinkDataArray, nodeSelect.key);
    const temp = [...alterLinkDataArray];
    const getName = form.lastName + " " + form.firstName;
    const getGender =
      form.gender === CONSTANTS.MALE
        ? CONSTANTS.TYPE.MALE
        : CONSTANTS.TYPE.FEMALE;
    temp[indexNode] = {
      ...temp[indexNode],
      n: getName,
      s: getGender,
      firstName: form.firstName,
      lastName: form.lastName,
      dob: moment(form.dob).format("YYYY-MM-DD"),
      dod: moment(form.dod).format("YYYY-MM-DD"),
      note: form.note,
      occupation: form.occupation,
      address: form.address,
      phone: form.phone,
      type: form.dod ? CONSTANTS.TYPE.DEAD : getGender,
    };
    setAlterLink(temp);
    setupDiagram(diagram, temp, nodeSelect.key);
    setShowModal({ ...showModal, show: false, mode: "", step: 0 });
  };

  const addNodeChild = (node, diagram) => {
    const getForm = Adapter.formatData(form);
    const getSpouse = Adapter.getMarriageByArray(
      diagram.model.nodeDataArray,
      node.key
    );
    _.set(getForm, node.s === "F" ? "m" : "f", node.key);
    _.set(
      getForm,
      node.s === "F" ? "f" : "m",
      form.nodeRelationship || (getSpouse.length > 0 && getSpouse[0].key)
    );

    diagram.model.addNodeData(getForm);
    const getNodeArr = Adapter.getWithoutLinkLabel(diagram.model.nodeDataArray);
    Adapter.createLinkForParentToChilds(
      diagram,
      diagram.model.linkDataArray,
      getNodeArr,
      node,
      getForm
    );
  };

  const addNodeSpouse = (node, diagram) => {
    const getForm = Adapter.formatData(form);
    _.set(getForm, node.s === CONSTANTS.TYPE.F ? "vir" : "ux", [node.key]);
    diagram.model.addNodeData(getForm);
    if (node.s === "F") {
      const model = { vir: [..._.get(node, "vir", []), getForm.key] };
      Adapter.editNode(diagram, model, node.key);
    } else {
      const model = { ux: [..._.get(node, "ux", []), getForm.key] };
      Adapter.editNode(diagram, model, node.key);
    }
    const getNodeArr = Adapter.getWithoutLinkLabel(diagram.model.nodeDataArray);
    Adapter.createLinkForMarriages(
      diagram,
      diagram.model.linkDataArray,
      getNodeArr,
      node.key,
      getForm.key
    );
    return getForm;
  };

  const addParent = (node, diagram) => {
    const getForm = Adapter.formatData(form);
    if (!_.get(node, "f") && !_.get(node, "m")) {
      // chua co cha me
      diagram.model.addNodeData(getForm);
      const spouse = {};
      spouse.name =
        getForm.s === "M"
          ? CONSTANTS.MOTHER_OF(node.n)
          : CONSTANTS.FATHER_OF(node.n);
      spouse.gender = getForm.s === "M" ? "F" : "M";
      const formatSpouse = Adapter.formatData(spouse);
      _.set(formatSpouse, getForm.s === "M" ? "ux" : "vir", [getForm.key]);
      diagram.model.addNodeData(formatSpouse);
      const model = {};
      _.set(model, getForm.s === "M" ? "vir" : "ux", [formatSpouse.key]);
      Adapter.editNode(diagram, model, getForm.key);
      const nodeArr = Adapter.getWithoutLinkLabel(diagram.model.nodeDataArray);
      Adapter.createLinkForMarriages(
        diagram,
        diagram.model.linkDataArray,
        nodeArr,
        getForm.key,
        formatSpouse.key
      );
      Adapter.createLinkForParentToChilds(
        diagram,
        diagram.model.linkDataArray,
        nodeArr,
        getForm,
        node
      );
      return formatSpouse;
    } else {
      // get node delete and update
      const und = _.get(node, getForm.s === "F" ? "m" : "f");
      return Adapter.editNode(diagram, getForm, und);
    }
  };

  const handleContextMenuDelete = (button, diagram) => {
    const node = button.part.adornedPart.data;
    const arrayNode = Adapter.getWithoutLinkLabel([
      ...diagram.model.nodeDataArray,
    ]);
    if (conditionDelete1(arrayNode, node)) {
      deleteForNodeNoSpouseNoChilds(node, arrayNode, diagram);
    }
    if (conditionDelete2(arrayNode, node)) {
      deleteForNodeNoSpouseNoParentsHaveAChild(node, arrayNode, diagram);
    }
    if (conditionDelete3(arrayNode, node)) {
      deleteForNodeHaveSpouse(node, arrayNode, diagram);
    }
    setNodeDataArray([...diagram.model.nodeDataArray]);
  };

  const deleteForNodeNoSpouseNoChilds = (node, arr, diagram) => {
    const getSpouseRemove = Adapter.getMarriageByArray(arr, node);
    if (
      getSpouseRemove.length !== 0 &&
      getSpouseRemove[0].n === CONSTANTS.UNDEFINED
    ) {
      diagram.model.removeNodeData(
        diagram.model.findNodeDataForKey(getSpouseRemove[0].key)
      );
    }
    diagram.remove(diagram.findPartForKey(node.key));
    const getFather = Adapter.getFather(arr, node);
    const getMother = Adapter.getMother(arr, node);
    const getChildsFather = Adapter.getChilds(arr, getFather);
    const getChildsMother = Adapter.getChilds(arr, getMother);
    if (
      getChildsFather
        .map((ele) => Object.values(_.pick(ele, ["key"])))[0]
        .includes(node.key) &&
      getFather.n === CONSTANTS.UNDEFINED
    ) {
      // Remove father node
      arr = UtilDiagram.removeSpouseIfSpouseUndefined(getFather, diagram);
    }
    if (
      getChildsMother
        .map((ele) => Object.values(_.pick(ele, ["key"])))[0]
        .includes(node.key) &&
      getMother.n === CONSTANTS.UNDEFINED
    ) {
      // Remove mother node
      arr = UtilDiagram.removeSpouseIfSpouseUndefined(getMother, diagram);
    }
  };

  const deleteForNodeHaveSpouse = (node, arr, diagram) => {
    const getChilds = Adapter.getChilds(arr, node);
    if (getChilds.length === 0) {
      const getMarriage = Adapter.getMarriageByArray(arr, node.key);
      const indexMarriage = Adapter.getIndex(arr, getMarriage[0].key);
      delete diagram.model.nodeDataArray[indexMarriage].ux;
      delete diagram.model.nodeDataArray[indexMarriage].vir;
      diagram.remove(diagram.findPartForKey(node.key));
    } else {
      const getNode = diagram.findPartForKey(node.key);
      diagram.model.setDataProperty(getNode.data, "n", CONSTANTS.UNDEFINED);
      diagram.model.setDataProperty(getNode.data, "type", CONSTANTS.TYPE.DEAD);
    }
  };

  const deleteForNodeNoSpouseNoParentsHaveAChild = (node, arr, diagram) => {
    const getChilds = Adapter.getChilds(arr, node);
    getChilds.forEach((ele) => {
      const getIndex = Adapter.getIndex(arr, ele.key);
      delete diagram.model.nodeDataArray[getIndex].m;
      delete diagram.model.nodeDataArray[getIndex].f;
    });
    const getSpouseRemove = Adapter.getMarriageByArray(arr, node.key);

    if (
      getSpouseRemove.length !== 0 &&
      getSpouseRemove[0].n === CONSTANTS.UNDEFINED
    ) {
      diagram.remove(diagram.findPartForKey(getSpouseRemove[0].key));
    }
    diagram.remove(diagram.findPartForKey(node.key));
  };

  const conditionDelete1 = (arr, node) => {
    // no spouse, no childs
    const getMarriage = Adapter.getMarriageByArray(arr, node.key);
    const isAlone =
      getMarriage.length === 0 || getMarriage.n === CONSTANTS.UNDEFINED;
    const getChilds = Adapter.getChilds(arr, node);

    return isAlone && getChilds.length === 0;
  };

  const conditionDelete2 = (arr, node) => {
    // no spouse, no parent, have atleast 1
    const getMarriage = Adapter.getMarriageByArray(arr, node.key);
    const isAlone =
      getMarriage.length === 0 ||
      (getMarriage.length === 1 && getMarriage[0].n === CONSTANTS.UNDEFINED);
    const noParents =
      !Adapter.getFather(arr, node) && !Adapter.getMother(arr, node);
    const getChilds = Adapter.getChilds(arr, node);
    return isAlone && noParents && getChilds.length <= 1;
  };

  const conditionDelete3 = (arr, node) => {
    // have 1 spouse, no parent
    const getMarriage = Adapter.getMarriageByArray(arr, node.key);
    const noParents =
      !Adapter.getFather(arr, node) && !Adapter.getMother(arr, node);
    return (
      getMarriage.length === 1 &&
      getMarriage[0].n !== CONSTANTS.UNDEFINED &&
      noParents
    );
  };

  const deleteForCondition1 = (list, node) => {
    let arr = [...list];
    //Remove this
    const getSpouseRemove = Adapter.getMarriageByArray(arr, node);
    if (
      getSpouseRemove.length !== 0 &&
      getSpouseRemove[0].n === CONSTANTS.UNDEFINED
    ) {
      arr = _.filter(arr, (ele) => ele.key !== getSpouseRemove[0].key);
    }
    const getFather = Adapter.getFather(arr, node);
    const getMother = Adapter.getMother(arr, node);
    const getChildsFather = Adapter.getChilds(arr, getFather);

    const getChildsMother = Adapter.getChilds(arr, getMother);

    if (
      getChildsMother
        .map((ele) => Object.values(_.pick(ele, ["key"])))[0]
        .includes(node.key) &&
      getFather.n === CONSTANTS.UNDEFINED
    ) {
      // Remove father node
      arr = Adapter.removeNodeAndRelationshipOfSpouse(arr, getFather);
    }
    if (
      getChildsMother
        .map((ele) => Object.values(_.pick(ele, ["key"])))[0]
        .includes(node.key) &&
      getMother.n === CONSTANTS.UNDEFINED
    ) {
      // Remove mother node
      arr = Adapter.removeNodeAndRelationshipOfSpouse(arr, getMother);
    }
    return _.filter(arr, (ele) => ele.key !== node.key);
  };

  const deleteForCondition2 = (list, node) => {
    const arr = [...list];
    const getChilds = Adapter.getChilds(arr, node);
    getChilds.forEach((ele) => {
      const getIndex = Adapter.getIndex(list, node);
      delete arr[getIndex].m;
      delete arr[getIndex].f;
    });
    const getSpouseRemove = Adapter.getMarriageByArray(arr, node);
    if (
      getSpouseRemove.length !== 0 &&
      getSpouseRemove[0].n === CONSTANTS.UNDEFINED
    ) {
      _.remove(arr, { key: getSpouseRemove[0].key });
    }
    const rmv = _.remove(arr, { key: node.key });
  };

  const deleteForCondition3 = (list, node) => {
    const arr = [...list];
    const getChilds = Adapter.getChilds(arr, node);
    if (getChilds.length === 0) {
      const getMarriage = Adapter.getMarriageByArray(arr, node.key);
      const indexMarriage = Adapter.getIndex(arr, getMarriage[0].key);
      delete arr[indexMarriage].ux;
      delete arr[indexMarriage].vir;
      const temp = _.filter(arr, (ele) => ele.key !== node.key);
      return temp;
    } else {
      const getIndex = Adapter.getIndex(arr, node.key);
      arr[getIndex].n = CONSTANTS.UNDEFINED;
      arr[getIndex].type = CONSTANTS.TYPE.DEAD;
    }
    return arr;
  };

  const handleDelete = (temp, myDiagram) => {
    const clone = [...temp];
    setupDiagram(myDiagram, clone, 1);
    setAlterLink(temp);
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
      case "nodeRelationship": {
        setForm({ ...form, nodeRelationship: e.target.value });
      }
      default: {
        break;
      }
    }
  };

  const nodeRelationship = () => {
    const diagram = tempDiagram.current;
    const arrNode = diagram.model.nodeDataArray;
    const arrSelect = Adapter.getMarriageByArray(arrNode, nodeSelect.key);
    const res = arrSelect.map((ele) => {
      const getNodeSpouse = Adapter.getNode(arrNode, ele.key);
      return { label: getNodeSpouse.n, value: getNodeSpouse.key };
    });
    return res;
  };

  const handleSelectRelationship = (label) => {
    // const nodeSelect = nodeSelect;
    switch (label) {
      case CONSTANTS.CHILDREN: {
        setShowModal({ ...showModal, step: 2, select: CHILDREN });
        break;
      }
      case CONSTANTS.SPOUSE: {
        setShowModal({ ...showModal, step: 2, select: SPOUSE });
        break;
      }
      case CONSTANTS.MOTHER: {
        setShowModal({ ...showModal, step: 2, select: MOTHER });
        break;
      }
      case CONSTANTS.FATHER: {
        setShowModal({ ...showModal, step: 2, select: FATHER });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleChangeRelationship = (e) => {
    setForm({ ...form, relationship: e.target.value });
    switch (e.target.value) {
      case "f": {
        const mother = Adapter.getMother(alterLinkDataArray, form.desNode);
        const father = Adapter.getFather(alterLinkDataArray, form.desNode);
        if (!mother && !father) {
          setAlternativeNotConfirm({
            show: true,
            warningAlternativeNode: true,
          });
        }
        setGender([{ label: "Male", value: "m" }]);
        break;
      }
      case "m": {
        const mother = Adapter.getMother(alterLinkDataArray, form.desNode);
        const father = Adapter.getFather(alterLinkDataArray, form.desNode);
        if (!mother && !father) {
          setAlternativeNotConfirm({
            show: true,
            warningAlternativeNode: true,
          });
        }
        setGender([{ label: "Female", value: "f" }]);
        break;
      }
      case "marriage": {
        const findDesNode = nodeDataArray.find(
          (ele) => ele.key === form.desNode
        );
        const getMarriages = Adapter.getMarriageByArray(
          alterLinkDataArray,
          form.desNode
        );
        const getAlternative = getMarriages.filter((ele) =>
          Adapter.isAlterNode(ele)
        );
        if (getAlternative.length > 0) {
          setAlternativeNotConfirm({
            show: true,
            warningUpdateForMarriage: true,
          });
        }
        setGender([
          {
            label: findDesNode.s === "m" ? "Male" : "Female",
            value: findDesNode.s === "m" ? "m" : "f",
          },
        ]);
        break;
      }
      default: {
        setGender(GENDER);
      }
    }
  };

  const indexMarriage = (key) => {
    const findInd = _.findIndex(
      alterLinkDataArray,
      (ele) => ele.ux === key || ele.vir === key
    );
    return findInd;
  };

  const handleHideAlert = () => {
    setAlert(false);
  };

  const recursionParentsNode = (node, arrayRecursion, arrow = 1) => {
    // arrow : 0 up/dow, 1 up, 2 down
    if (!node) return;
    arrayRecursion.push(node);

    if (arrow !== 2) {
      const father = alterLinkDataArray.find(
        (ele) => ele.key === _.get(node, "f")
      );
      const mother = alterLinkDataArray.find(
        (ele) => ele.key === _.get(node, "m")
      );
      if (father && !arrayRecursion.find((ele) => ele.key === father.key))
        recursionParentsNode(father, arrayRecursion, 0); // check up/down
      if (mother && !arrayRecursion.find((ele) => ele.key === mother.key))
        recursionParentsNode(mother, arrayRecursion, 1); // 1 up
    }

    if (arrow === 1) return;

    if (arrow === 2 || arrow === 0) {
      const childrens = alterLinkDataArray.filter(
        (ele) => _.get(ele, "f") === node.key || _.get(ele, "m") === node.key
      );
      childrens.forEach((child) => {
        if (arrayRecursion.find((ele) => child.key === ele.key)) return;
        recursionParentsNode(child, arrayRecursion, 2); // 2 down
      });
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    const search = _.filter(alterLinkDataArray, (ele) =>
      _.get(ele, "n", "").includes(e.target.value)
    );
    setListSearch([...search]);
  };

  const handleClickItemSearch = (key) => {
    const node = alterLinkDataArray.find((ele) => ele.key === key);
    const nodeFocus = diagram.findNodeForKey(key);
    diagram.select(nodeFocus);
  };

  const handleHideAlertAlternative = () => {
    setAlternativeNotConfirm({
      show: false,
      warningAlternativeNode: false,
      warningUpdateForMarriage: false,
    });
  };

  return (
    <Container maxWidth="xl" disableGutters className={classes.container}>
      <Grid container direction="row">
        {/* Left side */}
        <Grid item xs={2}>
          {/* Container of Left Side */}
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12}></Grid>
            {/* Family name */}
            <Grid item xs={11}>
              <Paper elevation={9} className={classes.paperPanel}>
                <Typography
                  align="center"
                  variant="h5"
                  component="p"
                  className={classes.boldTitle}
                >
                  Family 01
                </Typography>
              </Paper>
            </Grid>

            {/* Search box*/}
            <Grid item xs={11}>
              <SearchBox
                search={search}
                handleChangeSearch={handleChangeSearch}
                ariaLabel="search for people in this family"
              />
            </Grid>

            {/* Info of a member */}
            <Grid item xs={11}>
              <CardMember model={model} />
            </Grid>

            {/* Structure of family tree */}
            <Grid item xs={11}>
              <ListMember
                className={classes.paperPanel}
                members={data.family01}
                listSearch={listSearch}
                handleChangeSearch={handleChangeSearch}
                handleClickItemSearch={handleClickItemSearch}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>

        {/* Right side - Main side */}
        <Grid item xs={10}>
          {/* Container fo Right side */}
          <Grid container>
            {/* Mode action */}
            <Grid item xs={12} container justify="center">
              <Typography
                gutterBottom
                variant="h4"
                component="p"
                className={classes.actionTitle}
              >
                SELECT MODE
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justify="center"
              className={classes.toggleButtons}
            >
              <CustomToggleButton />
            </Grid>
            <Grid item xs={12}>
              {/* replace the paper component below with the gojs editor */}
              <Paper
                elevation={10}
                style={{
                  height: "80vh",
                  margin: "0px 16px",
                  borderRadius: "24px",
                }}
              >
                {nodeDataArray.length > 0 && (
                  <TreeDiagram
                    nodeDataArray={nodeDataArray}
                    linkDataArray={linkDataArray}
                    handleModelChange={handleModelChange}
                    handleDiagramEvent={handleDiagramEvent}
                    setupDiagram={setupDiagram}
                    initDiagram={initDiagram}
                    modelData={modelData}
                  />
                )}
                {/* <ToolSet className={classes.toolSet} /> */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {showModal.show && (
        <ModalAddTree
          showModal={showModal}
          form={form}
          gender={gender}
          relationship={relationship}
          nodeRelationship={nodeRelationship}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleUpdate={handleUpdate}
          handleChangeAddForm={handleChangeAddForm}
          handleChangeRelationship={handleChangeRelationship}
          handleSelectRelationship={handleSelectRelationship}
        />
      )}
      {showAlert && (
        <ModalAlert handleHideAlert={handleHideAlert} warning={warning} />
      )}
      {showAlternativeNotConfirm.show && (
        <AlertNotConfirm
          warningAlternativeNode={
            showAlternativeNotConfirm.warningAlternativeNode
          }
          warningUpdateForMarriage={
            showAlternativeNotConfirm.warningUpdateForMarriage
          }
          handleHideAlertAlternative={handleHideAlertAlternative}
        />
      )}
    </Container>
  );
}

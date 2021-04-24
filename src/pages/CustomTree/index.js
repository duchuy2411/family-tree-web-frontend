import React, { useState, useEffect } from "react";
import * as go from 'gojs';
import _ from 'lodash';
import GenogramLayout from '../../layouts/GenogramLayout/GenogramLayout';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateLinkDataArrayRedux,
  updateNodeDataArrayRedux,
  fetchFamiyTreeById,
  selectLinkDataArrayRedux,
  selectNodeDataArrayRedux,
  selectIt,
  test,
} from './customTreeSlice';
import './style.css';
// MUI
import { Container, Grid, Paper, Typography } from "@material-ui/core";

import CONSTAIN from '../../utils/const';
import Utils from '../../utils/api';
import Adapter from '../../utils/adapter';

// custom components
import SearchBox from "../../components/Search/Search";
import CardMember from "./components/CardMember/CardMember";
import ToolSet from "./components/ToolSet/ToolSet";
import CustomToggleButton from "./components/CustomToggleButton/CustomToggleButton";
import ListMember from "./components/ListMember/ListMember";
import TreeDiagram from './components/TreeDiagram';
import ModalAlert from './components/ModalAlert';
import ModalAddTree from './components/ModalAddTree';
import EditNodeForm from './components/EditNodeForm';

import data from "../../data";
import useCustomTreePageStyles from "./useCustomTreePageStyles";

// sample data
const memberInfo = data.memberInfoSample;

export default function CustomTreePage() {
  const classes = useCustomTreePageStyles();
  const dispatch = useDispatch();
  const { GENDER, RELATIONSHIP } = CONSTAIN;

  const nodeDataArrayRedux = useSelector(selectNodeDataArrayRedux);
  const linkDataArrayRedux = useSelector(selectLinkDataArrayRedux);

  const [nodeDataArray, setNodeDataArray] = useState();
  const [linkDataArray, setLinkDataArray] = useState();
  const [model, setModel] = useState(
    {
      key: '',
      name: ''
    }
  );
  const [diagram, setDiagram] = useState();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: 'male',
    desNode: 1,
    relationship: 'child',
    isNew: false
  });
  const [relationship, setRelationship] = useState(RELATIONSHIP);
  const [gender, setGender] = useState(GENDER);
  const [modelData, setModelData] = useState();
  const [alterLinkDataArray, setAlterLink] = useState([]);
  const [showAlert, setAlert] = useState(false);
  const [nodeSelect, setNodeSelect] = useState();
  const [warning, setWarning] = useState(false);
  const [search, setSearch] = useState('');
  const [listSearch, setListSearch] = useState([]);
  const [formUpd, setFormUpd] = useState({});
  const [showFormUpdate, setShowFormUpdate] = useState(false);

  useEffect(() => {
    dispatch(fetchFamiyTreeById(1)).then(rs => {
      const parseTree = Adapter.parse(_.get(rs.data, 'people', []));
      console.log(parseTree);
      setNodeDataArray([...parseTree]);
      setAlterLink([...parseTree]);
      setListSearch([...parseTree]);
    });
  }, []);

  function handleModelChange(data) {
    const insertedNodeKeys = data.insertedNodeKeys;
    const modifiedNodeData = data.modifiedNodeData;
    const removedNodeKeys = data.removedNodeKeys;
    const insertedLinkKeys = data.insertedLinkKeys;
    const modifiedLinkData = data.modifiedLinkData;
    const removedLinkKeys = data.removedLinkKeys;

    if (removedLinkKeys && removedNodeKeys) {
      console.log("Remove link key: ", removedLinkKeys);
      console.log("Remove node key: ", removedNodeKeys);
    } else {
      return;
    }
  };

  function handleDiagramEvent(e) {
    const name = e.name;
    switch (name) {
      case 'ChangedSelection': {
        const sel = e.subject.first();
        if (sel) {
          setModel({
            key: sel.data.key,
            name: sel.data.n,
          })
        } else {
          console.log('None');
        }
        break;
      }
      default: break;
    }
  };

  function setupDiagram(diagram, array, focusId) {
    diagram.model =
      go.GraphObject.make(go.GraphLinksModel,
        { // declare support for link label nodes
          linkLabelKeysProperty: "labelKeys",
          // this property determines which template is used
          nodeCategoryProperty: "s",
          // if a node data object is copied, copy its data.a Array
          copiesArrays: true,
          // create all of the nodes for people
          nodeDataArray: array,
          linkKeyProperty: 'key',
        });

    setupMarriages(diagram);
    setupParents(diagram);

    var node = diagram.findNodeForKey(focusId);
    if (node !== null) {
      diagram.select(node);
      setModel({
        key: node.data.key,
        name: node.data.n,
      })
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

    setNodeDataArray([...diagram.model.nodeDataArray]);
    setLinkDataArray([...diagram.model.linkDataArray]);
    console.log("====nodeData===", diagram.model.nodeDataArray);
    console.log("====linkData====", diagram.model.linkDataArray);
    return diagram;
  }

  function findMarriage(diagram, a, b) {  // A and B are node keys
    var nodeA = diagram.findNodeForKey(a);
    var nodeB = diagram.findNodeForKey(b);
    if (nodeA !== null && nodeB !== null) {
      var it = nodeA.findLinksBetween(nodeB);  // in either direction
      while (it.next()) {
        var link = it.value;
        // Link.data.category === "Marriage" means it's a marriage relationship
        if (link.data !== null && link.data.category === "Marriage") return link;
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
            var mlab = { s: "LinkLabel" };
            model.addNodeData(mlab);
            // add the marriage link itself, also referring to the label node
            var mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "Marriage" };
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
            var mlab = { s: "LinkLabel" };
            model.addNodeData(mlab);
            // add the marriage link itself, also referring to the label node
            var mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "Marriage" };
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
          if (window.console) window.console.log("unknown marriage: " + mother + " & " + father);
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
    const myDiagram = $(go.Diagram,
    {
      initialAutoScale: go.Diagram.UniformToFill,
      "undoManager.isEnabled": true,
      "draggingTool.isEnabled": true,
      // when a node is selected, draw a big yellow circle behind it
      nodeSelectionAdornmentTemplate:
        $(go.Adornment, "Auto",
          { layerName: "Grid" },  // the predefined layer that is behind everything else
          $(go.Shape, "Circle", { fill: "#c1cee3", stroke: null }),
          $(go.Placeholder, { margin: 2 })
        ),
      layout:  // use a custom layout, defined below
        $(GenogramLayout, { direction: 90, layerSpacing: 80, columnSpacing: 30 })
    });

    myDiagram.nodeTemplateMap.add("M",  // male
    $(go.Node, "Auto",
      $(go.Panel,
        $(go.Shape, "RoundedRectangle",
          { width: 150, height: 170, strokeWidth: 2, fill: "#7EABD0", stroke: "#919191" }),
      ),
      $(go.Panel, "Vertical",
        $(go.Picture, { width: 120, height: 120, margin: 2 }, new go.Binding("source", "image")),
        $(go.TextBlock,
          { textAlign: "center", stroke: 'white', margin: 5, font: '14px arial', alignment: go.Spot.Center },
          new go.Binding("text", "n")),
      ),
      {
        contextMenu:
          $(go.Adornment, "Vertical",
            $("ContextMenuButton",
            $(go.TextBlock,
              { textAlign: "center", stroke: 'black', margin: 5, width: 120, font: '16px arial', alignment: go.Spot.Center }, 
              "Add node",
              {
                click: function(e, button) {
                  var nodedata = button.part.adornedPart.data;
                  setForm({
                    ...form,
                    desNode: nodedata.key,
                  })
                  const getNode = alterLinkDataArray.find(ele => ele.key === nodedata.key);
                  console.log("Get node: ", getNode);
                  const getNodeMarriage = alterLinkDataArray.find(ele => ele.ux === nodedata.key || ele.vir === nodedata.key);
                  console.log("Node marriage: ", getNodeMarriage);
                  let tempRelationship = [];
                  // Father && Mother
                  if (_.isNil(_.get(getNode, 'f'))) tempRelationship.push(RELATIONSHIP[1]);
                  if (_.isNil(_.get(getNode, 'm'))) tempRelationship.push(RELATIONSHIP[2]);
                  tempRelationship.push(RELATIONSHIP[0]);
                  tempRelationship.push(RELATIONSHIP[3]);
                  setRelationship(tempRelationship);
                  
                  setShowModal(true);
                }
              }
            ),
          ),
          $("ContextMenuButton",
            $(go.TextBlock,
              { textAlign: "center", stroke: 'black', margin: 5, width: 120, font: '16px arial', alignment: go.Spot.Center }, 
              "Edit node",
            {
              click: function(e, button) {
                var nodedata = button.part.adornedPart.data;
                console.log("Edit node", nodedata.key);
                setFormUpd({
                  ...formUpd,
                  name: nodedata.n,
                  gender: nodedata.s,
                  dob: '',
                  image: nodedata.image,
                  dod: '',
                })
              }
            }
            ),
          ),
          $("ContextMenuButton",
            $(go.TextBlock,
              { textAlign: "center", stroke: 'black', margin: 5, width: 120, font: '16px arial', alignment: go.Spot.Center }, 
              "Remove node",
            {
              click: function(e, button) {
                var nodedata = button.part.adornedPart.data;
                setNodeSelect(nodedata);
                if (isLeaf(nodedata.key)) setWarning(false);
                else setWarning(true);
                setAlert(true);
              }
            }
          ),
        )
        )
      }
    ));
    
    myDiagram.nodeTemplateMap.add("F",  // female
    $(go.Node, "Auto",
      $(go.Panel,
        $(go.Shape, "RoundedRectangle",
          { width: 150, height: 170, strokeWidth: 2, fill: "#FED3DD", stroke: "#919191" }),
      ),
      $(go.Panel, "Vertical",
        $(go.Picture, { width: 120, height: 120, margin: 2 }, new go.Binding("source", "image")),
        $(go.TextBlock,
          { textAlign: "center", stroke: 'white', margin: 5, font: '14px arial', alignment: go.Spot.Center },
          new go.Binding("text", "n")),
        ),
        {
          contextMenu:
            $(go.Adornment, "Vertical",
              $("ContextMenuButton",
                $(go.TextBlock,
                  { textAlign: "center", stroke: 'black', margin: 5, width: 120, font: '16px arial', alignment: go.Spot.Center }, 
                  "Add node",
                {
                  click: function(e, button) {
                    var nodedata = button.part.adornedPart.data;
                    setForm({
                      ...form,
                      desNode: nodedata.key,
                    })
                    const getNode = alterLinkDataArray.find(ele => ele.key === nodedata.key);
                    console.log("Get node: ", getNode);
                    const getNodeMarriage = alterLinkDataArray.find(ele => ele.ux === nodedata.key || ele.vir === nodedata.key);
                    console.log("Node marriage: ", getNodeMarriage);
                    let tempRelationship = [];
                    // Father && Mother
                    if (_.isNil(_.get(getNode, 'f'))) tempRelationship.push(RELATIONSHIP[1]);
                    if (_.isNil(_.get(getNode, 'm'))) tempRelationship.push(RELATIONSHIP[2]);
                    tempRelationship.push(RELATIONSHIP[0]);
                    tempRelationship.push(RELATIONSHIP[3]);
                    setRelationship(tempRelationship);
                    
                    setShowModal(true);
                  }
                }
              ),
            ),
            $("ContextMenuButton",
              $(go.TextBlock,
                { textAlign: "center", stroke: 'black', margin: 5, width: 120, font: '16px arial', alignment: go.Spot.Center }, 
                "Edit node",
              {
                click: function(e, button) {
                  var nodedata = button.part.adornedPart.data;
                  console.log("Edit node", nodedata.key);
                  setNodeSelect(nodedata);
                  setFormUpd({
                    ...formUpd,
                    name: nodedata.n,
                    gender: nodedata.s,
                    dob: '',
                    image: nodedata.image,
                    dod: '',
                  })
                  setShowFormUpdate(true);
                }
              }
              ),
            ),
            $("ContextMenuButton",
              $(go.TextBlock,
                { textAlign: "center", stroke: 'black', margin: 5, width: 120, font: '16px arial', alignment: go.Spot.Center }, 
                "Remove node",
              {
                click: function(e, button) {
                  var nodedata = button.part.adornedPart.data;
                  setNodeSelect(nodedata);
                  if (isLeaf(nodedata.key)) setWarning(false);
                  else setWarning(true);
                  setAlert(true);
                }
              }
              ),
            )
          )
        }
      ));

    myDiagram.nodeTemplateMap.add("LinkLabel",
      $(go.Node, { selectable: false, width: 1, height: 1, fromEndSegmentLength: 40 }));

    myDiagram.linkTemplate =  // for parent-child relationships
      $(go.Link,
        {
          routing: go.Link.Orthogonal, corner: 2,
          layerName: "Background", selectable: false,
          fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top
        },
        $(go.Shape, { stroke: "#424242", strokeWidth: 2 })
      );

    myDiagram.linkTemplateMap.add("Marriage",  // for marriage relationships
      $(go.Link,
        { selectable: false },
        $(go.Shape, { strokeWidth: 2.5, stroke: "#5d8cc1" /* blue */ })
      ));
    console.log("Node: ", nodeDataArray);
    setupDiagram(myDiagram, nodeDataArray, 1);
    
    setDiagram(myDiagram);
    return myDiagram;
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  const handleSave = () => {
    // const key = nodeDataArray.length + 1;
    const key = alterLinkDataArray.length;

    const newNode = {
      key: key,
      s: form.gender === 'male' ? 'M' : 'F',
      n: form.name,
    }
    let updateAlter = false;
    let alterNode = {};
    let newNodeLinkLabel = {}; 
    let newLink = {};
    let newLinkLabels = {};
    console.log("before Link", alterLinkDataArray);
    const tempArray = [...alterLinkDataArray];

    switch(form.relationship) {
      case 'marriage': {
        const desNode = alterLinkDataArray.find(ele => ele.key === form.desNode);
        const alterMarriage = alterLinkDataArray.find(ele => ele.key === _.get(desNode, 'ux') || ele.key === _.get(desNode, 'vir'));
        if (_.get(alterMarriage, 'n') === 'Alternative') {
          console.log('Alter')
          updateAlter = true;
          const indexAlter = _.findIndex(alterLinkDataArray, { key: alterMarriage.key });
          if (indexAlter > -1) alterLinkDataArray[indexAlter].n = form.name;
          break;
        }
        _.set(newNode, `${form.gender === 'male' ? 'ux' : 'vir'}`, form.desNode);
        break;
      }
      case 'f': {
        // CheckAlter
        const desNode = alterLinkDataArray.find(ele => ele.key === form.desNode);
        const alterFather = alterLinkDataArray.find(ele => ele.key === _.get(desNode, 'f'));
        if (_.get(alterFather, 'n') === 'Alternative') {
          console.log('Alter')
          updateAlter = true;
          const indexAlter = _.findIndex(alterLinkDataArray, { key: alterFather.key });
          if (indexAlter > -1) alterLinkDataArray[indexAlter].n = form.name;
          break;
        }
        // Node Alter
        const keyAlter = key + 1;
        alterNode = {
          key: keyAlter,
          s: 'F',
          n: 'Alternative',
        }
        _.set(newNode, 's', 'M');
        _.set(newNode, 'ux', keyAlter);
        const childNode = nodeDataArray.find(ele => ele.key === form.desNode);
        const index = tempArray.findIndex(ele => ele.key === form.desNode);
        _.set(childNode, 'f', key);
        _.set(childNode, 'm', keyAlter);
        tempArray[index] = childNode;
        // Node Link Label
        const keyNodeLinkLabel =  - (key + 2);
        newNodeLinkLabel = { s: "LinkLabel", key: keyNodeLinkLabel };
        // Link Label Marriage
        newLinkLabels = { key: - (linkDataArray.length + 1), from: key, to: keyAlter, labelKeys: [keyNodeLinkLabel], category: "Marriage" };
        // Link Parents
        newLink = { key: - (linkDataArray.length + 2), from: form.desNode, to: keyNodeLinkLabel };
        break;
      }
      case 'm': {
        const desNode = alterLinkDataArray.find(ele => ele.key === form.desNode);
        const alterMother = alterLinkDataArray.find(ele => ele.key === _.get(desNode, 'm'));
        if (_.get(alterMother, 'n') === 'Alternative') {
          console.log('Alter')
          updateAlter = true;
          const indexAlter = _.findIndex(alterLinkDataArray, { key: alterMother.key });
          if (indexAlter > -1) alterLinkDataArray[indexAlter].n = form.name;
          break;
        }
        // Node Alter
        const keyAlter = key + 1;
        alterNode = {
          key: keyAlter,
          s: 'M',
          n: 'Alternative',
          ux: key,
        }
        const childNode = nodeDataArray.find(ele => ele.key === form.desNode);
        const index = _.findIndex(tempArray, ele => ele.key === form.desNode);
        _.set(childNode, 'm', key);
        _.set(childNode, 'f', keyAlter);
        tempArray[index] = childNode;
        // Node Link Label
        const keyNodeLinkLabel =  - (key +1);
        newNodeLinkLabel = { s: "LinkLabel", key: keyNodeLinkLabel };
        // Link Label
        newLinkLabels = { key: -(linkDataArray.length + 1), from: key, to: keyAlter, labelKeys: [keyNodeLinkLabel], category: "Marriage" };
        // Link Parents
        newLink = { key: - (linkDataArray.length + 2), from: form.desNode, to: keyNodeLinkLabel };
        break;
      }
      case 'child': {
        const findNode = nodeDataArray.find(ele => ele.key === form.desNode);
        const findMarriageNode = nodeDataArray.find(ele => ele.ux === form.desNode
          || ele.vir === form.desNode
          || (_.isArray(ele.vir) && ele.vir.includes(form.desNode))
          || (_.isArray(ele.ux) && ele.ux.includes(form.desNode)));
        if (findNode.ux || findMarriageNode.vir) {
          const self = _.isArray(findNode.ux) ? findNode.ux[0] : findNode.ux;
          _.set(newNode, `f`, form.desNode);
          _.set(newNode, `m`, self || findMarriageNode.key);
        } 
        else if (findNode.vir || findMarriageNode.ux) {
          const self = _.isArray(findNode.ux) ? findNode.ux[0] : findNode.ux;
          _.set(newNode, `m`, form.desNode);
          _.set(newNode, `f`, self || findMarriageNode.key);
        }
        console.log("Link: ", linkDataArray);
        const findLabelLinkParents = linkDataArray.find(ele => ele.from === form.desNode || ele.to === form.desNode)
        const labelLink = _.get(findLabelLinkParents, 'labelKeys.0', null);

        if (labelLink) {
          newLink = { key: -(linkDataArray.length + 1), from: labelLink, to: key};
        }

        break;
      }
      default: {
        break;
      }
    }
    // Check and push node//link
    if (updateAlter === false) tempArray.push(newNode);
    if (alterNode.key) tempArray.push(alterNode);
    console.log(newNode);
    // if (newNodeLinkLabel.key) tempArray.push(newNodeLinkLabel);
    setAlterLink(tempArray);
    setupDiagram(diagram, [...tempArray], key);
  }

  const deleteNode = () => {
    // Step 1: Delete from alter array
    const node = nodeSelect;
    const cloneArr = [...alterLinkDataArray];
    _.remove(cloneArr, {key: node.key});
    // Step 2: Check Marriage => move tree lam` sau
    // const isSelfMarriage = node.ux || node.vir;
    // Vir / Ux have parents
    // const arrTreeOfNode = [];
    // recursionParentsNode(node, arrTreeOfNode, 1);
    // console.log("====arrTreeOfNode======", arrTreeOfNode);

    console.log("Clone Array: ", cloneArr);
    setAlterLink(cloneArr);
    setupDiagram(diagram, cloneArr, 0);
    setNodeSelect(null);
    setAlert(false);
  }

  const nodeRelationship = () => {
    const rs = _.filter(nodeDataArray, ele => !_.isNil(ele.n)).map(ele => new Object({
      label: ele.n,
      value: ele.key
    }));
    return rs;
  }

  const handleChangeName = (e) => {
    setForm({...form, name: e.target.value});
  }

  const handleChange = (e) => {
    setForm({...form, gender: e.target.value});
  }

  const handleChangeNodeRelationship = (e) => {
    setForm({...form, desNode: e.target.value});
    const getNode = nodeDataArray.find(ele => ele.key === e.target.value);
    let tempRelationship = [...RELATIONSHIP];
    if (!_.isNil(getNode.m)) tempRelationship = tempRelationship.filter(ele => ele.value !== 'm');
    if (!_.isNil(getNode.f)) tempRelationship = tempRelationship.filter(ele => ele.value !== 'f');
    setRelationship(tempRelationship);
    setGender(GENDER);
  }

  const handleChangeRelationship = (e) => {
    setForm({...form, relationship: e.target.value});
    console.log(e.target.value);
    switch(e.target.value) {
      case 'f':  {
        setGender([{ label: 'Male', value: 'm' }]);
        break;
      }
      case 'm': {
        setGender([{ label: 'Female', value: 'f' }]);
        break;
      } case 'marriage': {
        const findDesNode = nodeDataArray.find(ele => ele.key === form.desNode);
        console.log(findDesNode);
        setGender([{ label: findDesNode.s === 'm' ? 'Male' : 'Female', value: findDesNode.s === 'm' ? 'm' : 'f' }]);
        break;
      } default: {
        setGender(GENDER);
      }
    }
  }

  useEffect(() => {
    if (diagram) {
      setupDiagram(diagram, alterLinkDataArray, 1);
    }
  }, [alterLinkDataArray])


  const handleClickAddBtn = (node) => {
    if (nodeDataArray.length === 0) {
      setForm({
        ...form,
        isNew: true
      })
    } else {
      setForm({
        ...form,
        isNew: false
      })
    }
    setShowModal(true)
  };

  const isLeaf = (key) => {
    const selfKey = alterLinkDataArray.find(ele => ele.key === key);
    if (_.get(selfKey, 'vir') || _.get(selfKey, 'ux')) return false;
    const findRelationship = alterLinkDataArray.find(ele => _.get(ele, 'f') === key 
      || _.get(ele, 'm') === key 
      || _.get(ele ,'ux') === key 
      || _.get(ele, 'vir') === key);
    if (findRelationship) return false;
    return true;
  }

  const indexMarriage = (key) => {
    const findInd = _.findIndex(alterLinkDataArray, ele => ele.ux === key || ele.vir === key);
    return findInd;
  }

  const handleHideAlert = () => {
    setAlert(false);
  }

  const recursionParentsNode = (node, arrayRecursion, arrow = 1) => { // arrow : 0 up/dow, 1 up, 2 down
    if (!node) return;
    arrayRecursion.push(node);

    if (arrow !== 2) {
    const father = alterLinkDataArray.find(ele => ele.key === _.get(node, 'f'));
    const mother = alterLinkDataArray.find(ele => ele.key === _.get(node, 'm'));
    console.log("Father: ", father);
    console.log("Mother: ", mother);
    if (father && !arrayRecursion.find(ele => ele.key === father.key))
      recursionParentsNode(father, arrayRecursion, 0); // check up/down 
    if (mother && !arrayRecursion.find(ele => ele.key === mother.key))
      recursionParentsNode(mother, arrayRecursion, 1); // 1 up 
    }

    if (arrow === 1) return;

    if (arrow === 2 || arrow === 0) {
      const childrens = alterLinkDataArray.filter(ele => _.get(ele, 'f') === node.key || _.get(ele, 'm') === node.key);
      childrens.forEach((child) => {
        if (arrayRecursion.find(ele => child.key === ele.key)) return;
        recursionParentsNode(child, arrayRecursion, 2); // 2 down
      })
    }
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    const search = _.filter(alterLinkDataArray, ele => _.get(ele, 'n', '').includes(e.target.value));
    setListSearch([...search]);
  }

  const handleClickItemSearch = (key) => {
    const node = alterLinkDataArray.find(ele => ele.key === key);
    const nodeFocus = diagram.findNodeForKey(key);
    diagram.select(nodeFocus);
  }

  const handleChangeFormUpdate = (e, label) => {
    console.log("Form: ", e.target.value);
    console.log("FormUpd: ", formUpd);
    switch (label) {
      case 'name': {
        setFormUpd({
          ...formUpd,
          name: e.target.value,
        })
        break;
      }
      case 'gender': {
        setFormUpd({
          ...formUpd,
          gender: e.target.value,
        })
        break;
      }
      case 'dod': {
        setFormUpd({
          ...formUpd,
          dob: e.target.value,
        })
        break;
      }
      case 'dob': {
        setFormUpd({
          ...formUpd,
          dod: e.target.value,
        })
        break;
      }
      default: {
        break;
      }
    }
  }

  const handleSaveFormUpdate = () => {
    console.log("Form UPD: ", formUpd);
    const indexNode = _.findIndex(alterLinkDataArray, ele => ele.key === nodeSelect.key);
    const temp = [...alterLinkDataArray];
    temp[indexNode] = {
      ...temp[indexNode],
      n: formUpd.name,
      s: formUpd.gender,
      dob: formUpd.dob,
      dod: formUpd.dod
    }
    setAlterLink(temp);
    setupDiagram(diagram, temp, nodeSelect.key);
  }

  const handleCancelEditForm = () => {
    setShowFormUpdate(false);
    setNodeSelect(null);
  }

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
              <CardMember
                model={model}
              />
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
                <TreeDiagram
                  nodeDataArray={nodeDataArray}
                  linkDataArray={linkDataArray}
                  handleModelChange={handleModelChange}
                  handleDiagramEvent={handleDiagramEvent}
                  setupDiagram={setupDiagram}
                  initDiagram={initDiagram}
                  modelData={modelData}
                />
                {/* <ToolSet className={classes.toolSet} /> */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      { showFormUpdate && 
        <EditNodeForm
          gender={gender}
          formUpd={formUpd}
          handleCancelEditForm={handleCancelEditForm}
          handleChangeFormUpdate={handleChangeFormUpdate}
          handleSaveFormUpdate={handleSaveFormUpdate}
        />
      }
      { showModal &&
        <ModalAddTree
          form={form}
          gender={gender}
          relationship={relationship}
          nodeRelationship={nodeRelationship}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleChange={handleChange}
          handleChangeName={handleChangeName}
          handleChangeNodeRelationship={handleChangeNodeRelationship}
          handleChangeRelationship={handleChangeRelationship}
        />
      }
      { showAlert &&
        <ModalAlert
          handleHideAlert={handleHideAlert}
          deleteNode={deleteNode}
          warning={warning}
        />
      }
    </Container>
  );
}

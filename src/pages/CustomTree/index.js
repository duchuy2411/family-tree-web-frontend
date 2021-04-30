import React, { useState, useEffect } from "react";
import * as go from 'gojs';
import _, { find } from 'lodash';
import moment from 'moment';
import GenogramLayout from '../../layouts/GenogramLayout/GenogramLayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFamiyTreeById, selectLinkDataArrayRedux, selectNodeDataArrayRedux } from './customTreeSlice';
import './style.css';
// MUI
import { Container, Grid, Paper, Typography } from "@material-ui/core";

import CONSTAIN from '../../utils/const';
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
import AlertNotConfirm from './components/AlertNotConfirm';

import data from "../../data";
import useCustomTreePageStyles from "./useCustomTreePageStyles";

// sample data
export default function CustomTreePage() {
  const classes = useCustomTreePageStyles();
  const dispatch = useDispatch();
  const { GENDER, RELATIONSHIP } = CONSTAIN;

  const [nodeDataArray, setNodeDataArray] = useState([]);
  const [linkDataArray, setLinkDataArray] = useState();
  const [model, setModel] = useState({ key: '', name: '', dob: '', dod: '', note: '' });
  const [diagram, setDiagram] = useState();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: 'male',
    desNode: 1,
    relationship: 'child',
    isNew: false,
    isDeath: false,
    dod: null,
    dob: null,
    note: '',
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
  const [showAlternativeNotConfirm, setAlternativeNotConfirm] = useState({ show: false, warningAlternativeNode: false, warningUpdateForMarriage: false })

  useEffect(() => {
    dispatch(fetchFamiyTreeById(1)).then(rs => {
      const parseTree = Adapter.parse(_.get(rs.data, 'people', []));
      console.log("Parse Tree: ", parseTree);
      setNodeDataArray([...parseTree]);
      setAlterLink(parseTree);
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
        console.log("Sel: ",sel);
        if (sel) {
          setModel({
            ...model,
            key: sel.data.key,
            gender: sel.data.s === 'F' ? 'Female' : 'Male',
            name: sel.data.n,
            dod: sel.data.dod,
            dob: sel.data.dob,
            note: sel.data.note,
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
        ...model,
        key: node.data.key,
        name: node.data.n,
        gender: node.data.s === 'F' ? 'Female' : 'Male',
        dob: node.data.dob,
        dod: node.data.dod,
        note: node.data.note,
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
      console.log(nodeA.key, ' ', nodeB.key);
      
      while (it.next()) {
        var link = it.value;
        console.log("Link: ", link)
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
        $(go.Picture, { width: 110, height: 110, margin: 2 }, new go.Binding("source", "image")),
        $(go.TextBlock,
          { textAlign: "center", stroke: 'white', margin: 5, font: '14px arial', alignment: go.Spot.Center },
          new go.Binding("text", "n")),
        $(go.TextBlock,
          { textAlign: "center", stroke: 'white', font: '14px arial', alignment: go.Spot.Center },
          new go.Binding("text", "dob")),
        $(go.TextBlock,
          { textAlign: "center", stroke: 'white', font: '14px arial', alignment: go.Spot.Center },
          new go.Binding("text", "dod")),
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
                  const newArr = myDiagram.model.nodeDataArray;
                  const getNode = Adapter.getNode(newArr, nodedata.key);
                  const getNodeMarriage = Adapter.getMarriageByKey(newArr, nodedata.key);
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
                  dob: _.get(nodedata, 'dob'),
                  image: nodedata.image,
                  dod: _.get(nodedata, 'dod'),
                  isDeath: _.get(nodedata, 'dod'),
                  note: _.get(nodedata, 'note'),
                });
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
    
    myDiagram.nodeTemplateMap.add("F",  // female
    $(go.Node, "Auto",
      $(go.Panel,
        $(go.Shape, "RoundedRectangle",
          { width: 150, height: 170, strokeWidth: 2, fill: "#FED3DD", stroke: "#919191" }),
      ),
      $(go.Panel, "Vertical",
        $(go.Picture, { width: 110, height: 110, margin: 2 }, new go.Binding("source", "image")),
        $(go.TextBlock,
          { textAlign: "center", stroke: 'white', margin: 5, font: '14px arial', alignment: go.Spot.Center },
          new go.Binding("text", "n")),
          $(go.TextBlock,
            { textAlign: "center", stroke: 'white', font: '14px arial', alignment: go.Spot.Center },
            new go.Binding("text", "dob")),
          $(go.TextBlock,
            { textAlign: "center", stroke: 'white', font: '14px arial', alignment: go.Spot.Center },
            new go.Binding("text", "dod")),
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
                    const newArr = myDiagram.model.nodeDataArray;
                    const getNode = Adapter.getNode(newArr, nodedata.key);
                    const getNodeMarriage = Adapter.getMarriageByKey(newArr, nodedata.key);
                    let tempRelationship = [];
                    console.log("node: ", getNode);
                    // Father && Mother
                    if (_.isNil(_.get(getNode, 'f'))) tempRelationship.push(RELATIONSHIP[1]);
                    if (_.isNil(_.get(getNode, 'm'))) tempRelationship.push(RELATIONSHIP[2]);
                    tempRelationship.push(RELATIONSHIP[0]);
                    tempRelationship.push(RELATIONSHIP[3]);
                    console.log("RELA:", tempRelationship)
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
                  setNodeSelect(nodedata);
                  setFormUpd({
                    ...formUpd,
                    name: nodedata.n,
                    gender: nodedata.s,
                    dob: nodedata.dob,
                    image: nodedata.image,
                    dod: nodedata.dod,
                    isDeath: !!_.get(nodedata, 'dod'),
                    note: _.get(nodedata, 'note'),
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
    const tempArray = [...alterLinkDataArray];
    console.log("Temp array: ", alterLinkDataArray);
    const key = Math.abs(alterLinkDataArray[alterLinkDataArray.length-1].key) + 1;
    console.log("KEy: ", key);
    const newNode = {
      key: key,
      s: form.gender === 'male' ? 'M' : 'F',
      n: form.name,
      dob: form.dob,
      dod: form.dod,
      note: form.note,
    }
    let updateAlter = false;
    let alterNode = {};

    switch(form.relationship) {
      case 'marriage': {
        const desNode = Adapter.getNode(alterLinkDataArray, form.desNode);
        const marriageNode = Adapter.getMarriageByKey(alterLinkDataArray, form.desNode);

        if (Adapter.isAlterNode(marriageNode)) {
          updateAlter = true;
          const indexAlter = Adapter.getIndex(alterLinkDataArray, marriageNode.key);
          if (indexAlter > -1) alterLinkDataArray[indexAlter].n = form.name;
          break;
        }
        _.set(newNode, `${form.gender === 'male' ? 'ux' : 'vir'}`, form.desNode);
        break;
      }
      case 'f': {
        // CheckAlter
        const desNode = Adapter.getNode(alterLinkDataArray, form.desNode);
        const getFather = Adapter.getFather(alterLinkDataArray, _.get(desNode, 'f'));
        if (Adapter.isAlterNode(getFather)) {
          updateAlter = true;
          const indexAlter = Adapter.getIndex(alterLinkDataArray, getFather.key);
          if (indexAlter > -1) alterLinkDataArray[indexAlter].n = form.name;
          break;
        }
        // Node Alter
        const keyAlter = key + 1;
        alterNode = { key: keyAlter, s: 'F', n: 'Alternative' };
        _.set(newNode, 's', 'M');
        _.set(newNode, 'ux', keyAlter);
        const childNode = Adapter.getNode(alterLinkDataArray, form.desNode);
        const index = Adapter.getIndex(alterLinkDataArray, form.desNode);
        _.set(childNode, 'f', key);
        _.set(childNode, 'm', keyAlter);
        tempArray[index] = childNode;       
        break;
      }
      case 'm': {
        const desNode = Adapter.getNode(alterLinkDataArray, form.desNode);
        console.log("Desnode: ", desNode);
        const getMother = Adapter.getMother(alterLinkDataArray, _.get(desNode, 'm'));
        console.log("Get mother: ", getMother);
        if (Adapter.isAlterNode(getMother)) {
          updateAlter = true;
          const indexAlter = Adapter.getIndex(alterLinkDataArray, getMother.key );
          if (indexAlter > -1) alterLinkDataArray[indexAlter].n = form.name;
          break;
        }
        // Node Alter
        const keyAlter = key + 1;
        alterNode = { key: keyAlter, s: 'M', n: 'Alternative' };
        _.set(newNode, 's', 'F');
        _.set(newNode, 'vir', keyAlter);
        const childNode = Adapter.getNode(alterLinkDataArray, form.desNode);
        const index = Adapter.getIndex(alterLinkDataArray, form.desNode);
        _.set(childNode, 'm', key);
        _.set(childNode, 'f', keyAlter);
        tempArray[index] = childNode;
        break;
      }
      case 'child': {
        const findNode = Adapter.getNode(alterLinkDataArray, form.desNode);
        const findMarriageNode = Adapter.getMarriageByKey(alterLinkDataArray, form.desNode);
        console.log("findMarriageNode:", findMarriageNode)
        if(!findMarriageNode) {
          const keyAlter = key + 1;
          const indexSelfKey = Adapter.getIndex(alterLinkDataArray, form.desNode);
          const sexDesnode = alterLinkDataArray[indexSelfKey].s;
          _.set(alterLinkDataArray[indexSelfKey], `${sexDesnode === 'M' ? 'ux' : 'vir'}`, keyAlter);
          alterNode = { key: keyAlter, s: sexDesnode === 'M' ? 'F' : 'M', n: 'Alternative' };
          _.set(newNode, 's', 'F');
          _.set(newNode, sexDesnode === 'M' ? 'f' : 'm', form.desNode);
          _.set(newNode, sexDesnode === 'M' ? 'm' : 'f', form.desNode);
        }
        if (findNode.ux || findMarriageNode.vir) {
          const self = _.isArray(findNode.ux) ? findNode.ux[0] : findNode.ux;
          _.set(newNode, `f`, form.desNode);
          _.set(newNode, `m`, self || findMarriageNode.key);
        } 
        else if (findNode.vir || findMarriageNode.ux) {
          const self = _.isArray(findNode.vir) ? findNode.vir[0] : findNode.vir;
          _.set(newNode, `m`, form.desNode);
          _.set(newNode, `f`, self || findMarriageNode.key);
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
    // if (newNodeLinkLabel.key) tempArray.push(newNodeLinkLabel);
    setAlterLink([...tempArray]);
    setupDiagram(diagram, tempArray, key);
    setShowModal(false);
  }

  const deleteNode = () => {
    // Step 1: Delete from alter array
    const node = nodeSelect;
    const cloneArr = [...alterLinkDataArray];
    _.remove(cloneArr, {key: node.key});
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

  const handleChangeAddForm = (e, label, isDeath = false) => {
    console.log(e.target.value)
    switch (label) {
      case 'name': {
        setForm({
          ...form,
          name: e.target.value,
        })
        break;
      }
      case 'gender': {
        setForm({
          ...form,
          gender: e.target.value,
        })
        break;
      }
      case 'dob': {
        setForm({
          ...form,
          dob: moment(e.target.value).format("YYYY-MM-DD"),
        })
        break;
      }
      case 'dod': {
        setForm({
          ...form,
          dod: moment(e.target.value).format("YYYY-MM-DD"),
        })
        break;
      }
      case 'isDeath': {
        setForm({
          ...form,
          isDeath: isDeath,
          dod: !isDeath ? null : form.isDeath, 
        });
        break;
      }
      case 'note': {
        setForm({
          ...form,
          note: e.target.value,
        })
        break;
      }
      case 'nodeRelationship': {
        setForm({...form, desNode: e.target.value});
        const getNode = nodeDataArray.find(ele => ele.key === e.target.value);
        let tempRelationship = [...RELATIONSHIP];
        if (!_.isNil(getNode.m)) tempRelationship = tempRelationship.filter(ele => ele.value !== 'm');
        if (!_.isNil(getNode.f)) tempRelationship = tempRelationship.filter(ele => ele.value !== 'f');
        setRelationship(tempRelationship);
        setGender(GENDER);
        break;
      }
      case 'relationship': {
        handleChangeRelationship(e);
        break;
      }
      default: {
        break;
      }
    }
  }

  const handleChangeRelationship = (e) => {
    setForm({...form, relationship: e.target.value});
    console.log(e.target.value);
    switch(e.target.value) {
      case 'f':  {
        const mother = Adapter.getMother(alterLinkDataArray, form.desNode);
        const father = Adapter.getFather(alterLinkDataArray, form.desNode);
        if (!mother && !father) {
          setAlternativeNotConfirm({
            show: true,
            warningAlternativeNode: true
          })
        }
        setGender([{ label: 'Male', value: 'm' }]);
        break;
      }
      case 'm': {
        const mother = Adapter.getMother(alterLinkDataArray, form.desNode);
        const father = Adapter.getFather(alterLinkDataArray, form.desNode);
        if (!mother && !father) {
          setAlternativeNotConfirm({
            show: true,
            warningAlternativeNode: true
          })
        }
        setGender([{ label: 'Female', value: 'f' }]);
        break;
      }
      case 'marriage': {
        const findDesNode = nodeDataArray.find(ele => ele.key === form.desNode);
        const getMarriages = Adapter.getMarriageByArray(alterLinkDataArray, form.desNode);
        console.log(getMarriages);
        const getAlternative = getMarriages.filter(ele => Adapter.isAlterNode(ele));
        if (getAlternative.length > 0) {
          setAlternativeNotConfirm({
            show: true,
            warningUpdateForMarriage: true,
          })
        }
        setGender([{ label: findDesNode.s === 'm' ? 'Male' : 'Female', value: findDesNode.s === 'm' ? 'm' : 'f' }]);
        break;
      } default: {
        setGender(GENDER);
      }
    }
  }

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

  const handleChangeFormUpdate = (e, label, isDeath = true) => {
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
      case 'dob': {
        setFormUpd({
          ...formUpd,
          dob: moment(e.target.value).format("YYYY-MM-DD"),
        })
        break;
      }
      case 'dod': {
        setFormUpd({
          ...formUpd,
          dod: moment(e.target.value).format("YYYY-MM-DD"),
        })
        break;
      }
      case 'isDeath': {
        setFormUpd({
          ...formUpd,
          isDeath: isDeath,
          dod: !isDeath ? null : formUpd.isDeath, 
        });
        break;
      }
      case 'note': {
        setFormUpd({
          ...formUpd,
          note: e.target.value,
        })
        break;
      }
      default: {
        break;
      }
    }
  }

  const handleSaveFormUpdate = () => {
    console.log("Form UPD: ", nodeSelect);
    const indexNode = Adapter.getIndex(alterLinkDataArray, nodeSelect.key);
    const temp = [...alterLinkDataArray];
    temp[indexNode] = {
      ...temp[indexNode],
      n: formUpd.name,
      s: formUpd.gender,
      dob: moment(formUpd.dob).format("YYYY-MM-DD"),
      dod: moment(formUpd.dod).format("YYYY-MM-DD"),
      note: formUpd.note,
    }
    setAlterLink(temp);
    setupDiagram(diagram, temp, nodeSelect.key);
    setShowFormUpdate(false);
  }

  const handleCancelEditForm = () => {
    setShowFormUpdate(false);
    setNodeSelect(null);
  }

  const handleHideAlertAlternative = () => {
    setAlternativeNotConfirm({
      show: false,
      warningAlternativeNode: false,
      warningUpdateForMarriage: false,
    });
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
              { nodeDataArray.length > 0 &&
                <TreeDiagram
                  nodeDataArray={nodeDataArray}
                  linkDataArray={linkDataArray}
                  handleModelChange={handleModelChange}
                  handleDiagramEvent={handleDiagramEvent}
                  setupDiagram={setupDiagram}
                  initDiagram={initDiagram}
                  modelData={modelData}
                />
              }
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
          handleChangeAddForm={handleChangeAddForm}
        />
      }
      { showAlert &&
        <ModalAlert
          handleHideAlert={handleHideAlert}
          deleteNode={deleteNode}
          warning={warning}
        />
      }
      {
        showAlternativeNotConfirm.show &&
        <AlertNotConfirm
          warningAlternativeNode={showAlternativeNotConfirm.warningAlternativeNode}
          warningUpdateForMarriage={showAlternativeNotConfirm.warningUpdateForMarriage}
          handleHideAlertAlternative={handleHideAlertAlternative}
        />
      }
    </Container>
  );
}

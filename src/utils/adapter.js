import _ from "lodash";
import moment from "moment";
import CONSTANTS from "./const";

const sourceDefaultImg =
  "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
class Adapter {
  parse(data) {
    const results = data.map((ele) => {
      const member = {
        id: ele.id,
        key: ele.id,
        n: `${_.get(ele, "firstName", " ") || "Unknow"} ${_.get(ele, "lastName", " ") || " "}`,
        s: ele.gender === 0 ? "M" : "F",
        dob: ele.dateOfBirth ? moment(ele.dateOfBirth).format("L") : null,
        dod: ele.dateOfDeath ? moment(ele.dateOfDeath).format("L") : null,
        type: ele.dateOfDeath ? "D" : ele.gender === 0 ? "M" : "F",
        note: ele.note,
        firstName: ele.firstName,
        lastName: ele.lastName,
        imageUrl: ele.imageUrl || sourceDefaultImg,
      };
      const parent1Id = _.get(ele, "parent1Id");
      _.set(member, "f", parent1Id);
      const parent2Id = _.get(ele, "parent2Id");
      _.set(member, "m", parent2Id);
      ele.spouses.forEach((element) => {
        if (element) {
          if (ele.gender === 0) {
            const arr = _.get(member, "ux", []);
            _.set(member, "ux", arr);
            if (_.get(element, "id")) member.ux.push(element.id);
          } else {
            const arr = _.get(member, "vir", []);
            _.set(member, "vir", arr);
            if (_.get(element, "id")) member.vir.push(element.id);
          }
        }
      });
      return member;
    });
    return this.processMemo(results);
  }

  countMemoForKey(array) {
    let count = 0;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].type === CONSTANTS.TYPE.UNDEFINED) count++;
    }
    return -(count + 1);
  }

  nodeMemo(vir = null, ux = null, father = null, mother = null) {
    const rs = {
      type: CONSTANTS.TYPE.UNDEFINED,
      n: CONSTANTS.UNDEFINED,
    };
    if (vir) rs.vir = [vir];
    if (ux) rs.ux = [ux];
    if (father) rs.f = father;
    if (mother) rs.m = mother;
    return rs;
  }

  processMemo(array) {
    const clone = [...array];
    for (let i = 0; i < array.length; i += 1) {
      if (!clone[i].f && clone[i].m) {
        const memo = this.nodeMemo(null, clone[i].m);
        const key = this.countMemoForKey(clone);
        memo.key = key;
        clone[i].f = key;
        clone.push(memo);
        const ind = _.findIndex(clone, (ele) => ele.key === clone[i].m);
        clone[ind].vir = [key];
      } else if (clone[i].f && !clone[i].m) {
        const memo = this.nodeMemo(clone[i].f);
        const key = this.countMemoForKey(clone);
        memo.key = key;
        clone[i].m = key;
        clone.push(memo);
        const ind = _.findIndex(clone, (ele) => ele.key === clone[i].f);
        clone[ind].ux = [key];
      }
    }

    return clone;
  }

  getWithoutLinkLabel(data) {
    const arr = _.filter(data, (ele) => _.get(ele, "type") !== "LinkLabel");
    return arr;
  }

  getNode(arr, key) {
    return arr.find((ele) => ele.key === key);
  }

  /**
   * Return spouses , if array return index 0
   * @param {*} arr nodeDataArray
   * @param {*} key key of self
   */
  getMarriageByKey(arr, key) {
    const getUx = _.get(key, "ux");
    const ux = _.isArray(getUx) && getUx ? getUx[0] : getUx;
    if (ux) return ux;
    const getVir = _.get(key, "vir");
    const vir = _.isArray(getVir) && getVir ? getVir[0] : getVir;
    if (vir) return vir;
    const marriageFrom = arr.find((ele) => {
      const uxs = _.get(ele, "ux");
      const virs = _.get(ele, "vir");
      const ux = _.isArray(uxs) ? _.includes(uxs, key) : uxs === key;
      const vir = _.isArray(virs) ? _.includes(virs, key) : virs === key;
      return (ux || vir) && ele.key;
    });
    if (marriageFrom) return marriageFrom;
    return false;
  }

  /**
   *  Return array spouses => [spouses]
   * @param {*} arr nodeDataArray
   * @param {*} key key of self
   */
  getMarriageByArray(arr, key) {
    const node = this.getNode(arr, key);
    const getUx = _.get(node, "ux");
    const ux = _.isArray(getUx) && getUx ? getUx : [getUx];
    if (ux.length > 0 && ux[0] !== undefined) return ux.map((ele) => this.getNode(arr, ele));
    const getVir = _.get(node, "vir");
    const vir = _.isArray(getVir) && getVir ? getVir : [getVir];
    if (vir.length > 0 && vir[0] !== undefined) return vir.map((ele) => this.getNode(arr, ele));
    const marriageFrom = arr.filter((ele) => {
      const uxs = _.get(ele, "ux");
      const virs = _.get(ele, "vir");
      const ux = _.isArray(uxs) ? _.includes(uxs, key) : uxs === key;
      const vir = _.isArray(virs) ? _.includes(virs, key) : virs === key;
      return ux || vir;
    });
    if (marriageFrom) return marriageFrom;
    return [];
  }

  getChilds(arr, node) {
    const filterChilds = _.filter(
      arr,
      (ele) => _.get(ele, "m") === node.key || _.get(ele, "f") === node.key
    );
    return filterChilds;
  }

  getFather(arr, node) {
    const father = _.find(arr, (ele) => ele.key === _.get(node, "f"));
    return father;
  }

  getMother(arr, node) {
    const mother = _.find(arr, (ele) => ele.key === _.get(node, "m"));
    return mother;
  }

  isAlterNode(node) {
    return _.get(node, "n") === "Alternative";
  }

  getIndex(arr, key) {
    return _.findIndex(arr, { key });
  }

  removeNodeAndRelationshipOfSpouse(arr, node) {
    // If have 1 spouse
    const clone = [...arr];
    const getMarriage = this.getMarriageByArray(arr, node);
    if (getMarriage.length === 1) {
      const index = this.getIndex(arr, getMarriage[0].key);
      const ux = _.get(arr[index], "ux", []);
      const vir = _.get(arr[index], "vir", []);
      if (ux.length > 1 && ux.includes(node.key)) {
        const arrMarriage = arr[index].ux.filter((ele) => ele !== node.key);
        clone[index].ux = arrMarriage;
      } else if (ux.length === 1 && ux.includes(node.key)) {
        delete clone[index].ux;
      }

      if (vir.length > 0 && vir.includes(node.key)) {
        const arrMarriage = arr[index].vir.filter((ele) => ele !== node.key);
        clone[index].vir = arrMarriage;
      } else if (vir.length === 1 && vir.includes(node.key)) {
        delete clone[index].vir;
      }
    }
    return clone.filter((ele) => ele.key !== node.key);
  }

  removeParentAndRelationship(arr, node) {
    // Case have 1 child, 1 mother || father
    const clone = [...arr];
    const father = this.getNode(clone, node.f);
    const mother = this.getNode(clone, node.m);
    let res = [];
    if (father.type === CONSTANTS.TYPE.UNDEFINED)
      res = this.removeNodeAndRelationshipOfSpouse(clone, node.father);
    if (mother.type === CONSTANTS.TYPE.UNDEFINED)
      res = this.removeNodeAndRelationshipOfSpouse(clone, node.mother);
    return res.filter((ele) => ele.key !== node.key);
  }

  formatData(model, imageUrl) {
    const obj = {
      s: model.gender === "male" ? "M" : "F",
      n:
        model.name ||
        `${_.get(model, "lastName", " ") || ""} ${_.get(model, "firstName", " ") || ""}`,
      dob: _.get(model, "dob") === "Invalid date" ? null : _.get(model, "dob"),
      dod: _.get(model, "dod") === "Invalid date" ? null : _.get(model, "dod"),
      note: _.get(model, "note", ""),
      occupation: _.get(model, "occupation", null),
      address: _.get(model, "address", ""),
      phone: _.get(model, "phone", ""),
      lastName: _.get(model, "lastName", ""),
      firstName: _.get(model, "firstName", ""),
      imageUrl: imageUrl || sourceDefaultImg,
    };
    if (model.type === CONSTANTS.TYPE.UNDEFINED) {
      _.set(obj, "type", CONSTANTS.TYPE.UNDEFINED);
      return obj;
    }
    if (model.dod && model.dod !== "Invalid date") {
      _.set(obj, "type", CONSTANTS.TYPE.DEAD);
      return obj;
    }
    if (model.id) _.set(obj, "id", model.id);
    if (model.id) _.set(obj, "key", model.id);
    _.set(obj, "type", model.gender === "male" ? "M" : "F");
    return obj;
  }

  createLinkForParentToChilds(diagram, arrayLink, arrayNode, parent1, parent2, node) {
    const linkParent = _.find(
      arrayLink,
      (ele) =>
        ele.category === CONSTANTS.MARRIAGE &&
        ((ele.from === parent1.key && ele.to === parent2.key) ||
          (ele.to === parent1.key && ele.from === parent2.key))
    );
    const newLink = { from: linkParent.labelKeys[0], to: node.key };
    diagram.model.addLinkData(newLink);
  }

  createLinkForMarriages(diagram, arrayLink, arrNode, self, spouse, key = null) {
    const linkLabel = { s: "LinkLabel", type: "LinkLabel" };
    if (key) _.set(linkLabel, "key", key);
    diagram.model.addNodeData(linkLabel);
    const linkMarriage = {
      from: self,
      to: spouse,
      labelKeys: [linkLabel.key],
      category: "Marriage",
    };
    diagram.model.addLinkData(linkMarriage);
  }

  editNode(diagram, model, key) {
    const part = diagram.findPartForKey(key);
    const arrProperty = Object.keys(model);
    arrProperty.forEach((ele) => {
      diagram.model.setDataProperty(part.data, ele, model[`${ele}`]);
    });
    return diagram.findPartForKey(key).data;
  }

  toFormAPI(model) {
    const res = {
      gender: model.s === "F" ? 1 : 0,
      firstName: model.firstName,
      lastName: model.lastName,
      dateOfBirth:
        moment(model.dob).format() === "Invalid date" ? null : moment(model.dob).format(),
      dateOfDeath:
        moment(model.dod).format() === "Invalid date" ? null : moment(model.dod).format(),
      note: model.note,
      imageUrl: model.imageUrl,
    };
    return res;
  }

  toFormChildrenAPI(model, fatherId, motherId) {
    const res = {
      fatherId: fatherId,
      motherId: motherId,
      childInfo: {
        gender: model.s === "F" ? 1 : 0,
        firstName: model.firstName,
        lastName: model.lastName,
        dateOfBirth:
          moment(model.dob).format() === "Invalid date" ? null : moment(model.dob).format(),
        dateOfDeath:
          moment(model.dod).format() === "Invalid date" ? null : moment(model.dod).format(),
        userId: null,
        note: model.note,
        imageUrl: model.imageUrl || sourceDefaultImg,
      },
    };
    return res;
  }

  getLinkMarrigage(diagram, key) {
    const linkArr = diagram.model.linkDataArray;
    const link = _.filter(
      linkArr,
      (ele) => ele.category === "Marriage" && (ele.to === key || ele.from === key)
    );
    return link;
  }

  formatResponseApiToGojs(ele, father = null, mother = null, spouses = []) {
    const member = {
      id: ele.id,
      key: ele.id,
      n: `${_.get(ele, "lastName", "") || ""} ${_.get(ele, "firstName", "") || " "}`,
      s: ele.gender === 0 ? "M" : "F",
      dob: ele.dateOfBirth ? moment(ele.dateOfBirth).format("L") : null,
      dod: ele.dateOfDeath ? moment(ele.dateOfDeath).format("L") : null,
      type: ele.dateOfDeath ? "D" : ele.gender === 0 ? "M" : "F",
      note: ele.note,
      firstName: ele.firstName,
      lastName: ele.lastName,
      imageUrl: ele.imageUrl || sourceDefaultImg,
    };
    if (father) _.set(member, "f", father);
    if (mother) _.set(member, "m", mother);
    if (spouses.length > 0) _.set(member, member.s === "M" ? "ux" : "vir", spouses);
    return member;
  }

  parseList(data) {
    return data.map((ele) => {
      const member = {
        id: ele.id,
        key: ele.id,
        gender: ele.gender === 0 ? "Male" : "Female",
        dob: ele.dateOfBirth ? moment(ele.dateOfBirth).format("L") : null,
        dod: ele.dateOfDeath ? moment(ele.dateOfDeath).format("L") : null,
        note: ele.note,
        firstName: ele.firstName,
        lastName: ele.lastName,
        imageUrl: ele.imageUrl || sourceDefaultImg,
      };
      const parent1Id = _.get(ele, "parent1Id");
      const infoParent1 = _.find(data, (father) => father.id === parent1Id);
      _.set(
        member,
        "father",
        infoParent1
          ? {
            id: parent1Id,
            name: `${_.get(infoParent1, "lastName", "")} ${_.get(infoParent1, "firstName", "")}`,
          }
          : null
      );
      const parent2Id = _.get(ele, "parent2Id");
      const infoParent2 = _.find(data, (mother) => mother.id === parent2Id);
      _.set(
        member,
        "mother",
        infoParent2
          ? {
            id: parent2Id,
            name: `${_.get(infoParent2, "lastName", "")} ${_.get(infoParent2, "firstName", "")}`,
          }
          : null
      );
      member.spouses = [];
      ele.spouses.forEach((element) => {
        if (element && _.get(element, "id")) {
          const infoSpouse = _.find(data, (sp) => sp.id === _.get(element, "id"));
          member.spouses.push({
            id: element.id,
            name: infoSpouse
              ? `${_.get(infoSpouse, "lastName", "")} ${_.get(infoSpouse, "firstName", "")}`
              : null,
          });
        }
      });
      return member;
    });
  }
}

export default new Adapter();

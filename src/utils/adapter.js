import _ from 'lodash';
import moment from 'moment';

class Adapter {
  parse(data) {
    const results = data.map((ele, index) => { 
      const member = {
        key: ele.id,
        n: ele.firstName + ele.lastName,
        s: ele.gender === 0 ? 'M' : 'F',
        dob: moment(ele.dateOfBirth).format('L'),
        dod: ele.dateOfDead ? moment(ele.dateOfDead).format('L') : null,
        note: ele.note,
      };
      const parent1Id = _.get(ele, 'parent1Id');
      if (parent1Id) _.set(member, 'f', parent1Id);
      const parent2Id = _.get(ele, 'parent2Id');
      if (parent2Id) _.set(member, 'm', parent2Id);
      ele.spouses.forEach(element => {
        if (ele.gender === 0) {
          const arr = _.get(member, 'ux') || [];
          _.set(member, 'ux', arr);
          member.ux.push(element.id);
        } else {
          const arr = _.get(member, 'vir') || [];
          _.set(member, 'vir', arr);
          member.vir.push(element.id);
        }
      });
    return member;
    }
    );
    return results;
  }

  getWithoutLinkLabel(data) {
    const arr = data.filter(ele => _.get(ele, 's') !== 'LinkLabel');
    console.log("Get arr: ", arr);
    return arr;
  }

  getNode(arr, key) {
    return arr.find(ele => ele.key === key);
  }

  /**
   * Return spouses , if array return index 0
   * @param {*} arr nodeDataArray
   * @param {*} key key of self
   */
  getMarriageByKey(arr, key) {
    const getUx = _.get(key, 'ux');
    const ux = _.isArray(getUx) && getUx ? getUx[0] : getUx;
    if (ux) return ux;
    const getVir = _.get(key, 'vir');
    const vir = _.isArray(getVir) && getVir ? getVir[0] : getVir;
    if (vir) return vir;
    const marriageFrom = arr.find((ele) => {
      const uxs = _.get(ele, 'ux');
      const virs = _.get(ele, 'vir');
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
    const getUx = _.get(node, 'ux');
    const ux = _.isArray(getUx) && getUx ? getUx : [getUx];
    if (ux.length > 0 && ux[0] !== undefined) return ux.map(ele => this.getNode(arr, ele));
    const getVir = _.get(node, 'vir');
    const vir = _.isArray(getVir) && getVir ? getVir : [getVir];
    console.log("Vir: ", vir);
    if (vir.length > 0 && vir[0] !== undefined) return vir.map(ele => this.getNode(arr, ele));
    const marriageFrom = arr.filter((ele) => {
      const uxs = _.get(ele, 'ux');
      const virs = _.get(ele, 'vir');
      const ux = _.isArray(uxs) ? _.includes(uxs, key) : uxs === key;
      const vir = _.isArray(virs) ? _.includes(virs, key) : virs === key;
      console.log("uxx", ux, "virr", vir);
      return ux || vir;
    });
    if (marriageFrom) return marriageFrom;
    return [];
  }

  getChilds(arr, node) {
    const filterChilds = _.filter(arr, ele => _.get(ele, 'm') === node.key || _.get(ele, 'f') === node.key);
    return filterChilds;
  }

  getFather(arr, node) {
    const father = _.find(arr, ele => ele.key === _.get(node,'f'));
    return father;
  }

  getMother(arr, node) {
    const mother = _.find(arr, ele => ele.key === _.get(node, 'm'));
    return mother;
  }

  isAlterNode(node) {
    console.log("Is alternode: ", _.get(node, 'n') === 'Alternative');
    return _.get(node, 'n') === 'Alternative';
  }

  getIndex(arr, key) {
    return _.findIndex(arr, { key });
  }

}

export default new Adapter();
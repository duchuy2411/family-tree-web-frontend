import _ from "lodash";
import Adapter from "../../utils/adapter";

class UtilDiagram {
  removeSpouseIfSpouseUndefined(node, diagram) {
    console.log("==node==", node);
    const arr = Adapter.getWithoutLinkLabel(diagram.model.nodeDataArray);
    console.log("==arr==", arr);
    const getMarriage = Adapter.getMarriageByArray(arr, node.key);
    console.log("===getMarriage===", getMarriage);
    if (getMarriage.length > 0) {
      const index = Adapter.getIndex(arr, getMarriage[0].key);
      const ux = _.get(arr[index], "ux", []);
      const vir = _.get(arr[index], "vir", []);
      if (ux.length > 1 && ux.includes(node.key)) {
        diagram.model.nodeDataArray[index].ux = arr[index].ux.filter((ele) => ele !== node.key);
      } else if (ux.length === 1 && ux.includes(node.key)) {
        delete diagram.model.nodeDataArray[index].ux;
      }

      if (vir.length > 0 && vir.includes(node.key)) {
        diagram.model.nodeDataArray[index].vir = arr[index].vir.filter((ele) => ele !== node.key);
      } else if (vir.length === 1 && vir.includes(node.key)) {
        delete diagram.model.nodeDataArray[index].vir;
      }
    }
    diagram.remove(diagram.findPartForKey(node.key));
    return diagram;
  }
}

export default new UtilDiagram();

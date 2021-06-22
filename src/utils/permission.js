import { find, filter, get } from "lodash";

class Permission {
  havePermission(listTree, idTree, idUser) {
    if (find(listTree, ele => ele.id === idTree)) return true;
    return false;
  }

  havePermissionAsOwner(listTree, idTree, idUser) {
    console.log("listTree", listTree, idTree, idUser);
    const tree = find(listTree, ele => `${ele.id}` === `${idTree}`);
    console.log("tree", tree);
    if (!tree) return false;
    const owner = get(tree, "owner");
    if (!owner) return false;
    console.log("owner", owner.id, idUser);
    if (`${owner.id}` === `${idUser}`) return true;
    return false;
  }

  havePermissionAsEditor(listTree, idTree, idUser) {
    console.log("listTree", listTree, idTree, idUser);
    const tree = find(listTree, ele => ele.id === idTree);
    if (!tree) return false;
    const editors = get(tree, "editors");
    const findUser = find(editors, ele => ele.id === idUser);
    if (findUser) return true;
    return false;
  }
}

export default new Permission();

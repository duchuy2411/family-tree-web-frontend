import { find, filter, map, get } from "lodash";
import config from "../configs/localStorageKeys";
class Permission {
  havePermission(listTree, idTree, idUser) {
    if (find(listTree, (ele) => ele.id === idTree)) return true;
    return false;
  }

  havePermissionAsOwner(idTree) {
    const listTree = JSON.parse(localStorage.getItem("listPermission"));
    const getUser = JSON.parse(localStorage.getItem(`${config.AUTH}`));
    const idUser = get(getUser, "user.id");
    if (!listTree || !idUser) return false;

    const tree = find(listTree, (ele) => `${ele.id}` === `${idTree}`);
    if (!tree) return false;
    const owner = get(tree, "owner");
    if (!owner) return false;
    if (`${owner.id}` === `${idUser}`) return true;
    return false;
  }

  havePermissionAsEditor(idTree) {
    const listTree = JSON.parse(localStorage.getItem("listPermission"));
    const getUser = JSON.parse(localStorage.getItem(`${config.AUTH}`));
    const idUser = get(getUser, "user.id");
    if (!listTree || !idUser) return false;

    const tree = find(listTree, (ele) => `${ele.id}` === `${idTree}`);
    if (!tree) return false;
    const editors = get(tree, "editors");
    const findUser = find(editors, (ele) => `${ele.id}` === `${idUser}`);
    if (findUser) return true;
    return false;
  }

  mapPermission(listTree) {
    localStorage.setItem("listPermission", JSON.stringify(listTree));
  }

  havePermissionRoles(idTree) {
    return this.havePermissionAsOwner(idTree) || this.havePermissionAsEditor(idTree);
  }

  checkPermission(idTree) {
    const data = JSON.parse(localStorage.getItem("listPermission"));
    const findData = find(data, (ele) => `${ele.id}` === `${idTree}`);
    if (!findData) return false;
    const userId = get(localStorage.getItem("auth"), "user.id");
    const findUser = find(data, (ele) => `${get(ele, "owner.id")}` === `${userId}`);
    return !!findUser;
  }
}

export default new Permission();

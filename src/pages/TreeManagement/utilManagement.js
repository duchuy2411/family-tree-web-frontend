import _ from "lodash";
class UtilManagement {
  rangeAge = [
    { value: 0, label: "" },
    { value: 10, label: "1 - 10" },
    { value: 20, label: "11 - 20" },
    { value: 30, label: "21 - 30" },
    { value: 40, label: "31 - 40" },
    { value: 50, label: "41 - 50" },
    { value: 60, label: "51 - 60" },
    { value: 70, label: "61 - 70" },
    { value: 80, label: "71 ~" },
  ];

  formatName = (object, label) => {
    const getName = _.get(object, `${label}.name`);
    if (getName === "null null" || getName === null) {
      return "Unknow name";
    }
    return getName;
  };
}

export default new UtilManagement();

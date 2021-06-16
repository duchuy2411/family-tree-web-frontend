import colors from "../../../../assets/colorPalette";

import { makeStyles } from "@material-ui/core";

const useToolSetStyles = makeStyles(() => ({
  toolSet: {
    width: 110,
  },
  horizontalSet: {
    backgroundColor: colors.brown,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  verticalSet: {
    backgroundColor: colors.brown,
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
  },
  icon: {
    width: 25,
    height: 25,
    fill: colors.white,
  },
}));

export default useToolSetStyles;

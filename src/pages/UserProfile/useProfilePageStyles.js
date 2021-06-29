import { fade, makeStyles } from "@material-ui/core";
import colors from "assets/colorPalette";

const useProfilePageStyle = makeStyles(() => ({
  root: {
    backgroundColor: "whitesmoke",
    minHeight: "100vh",
  },

  pageTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  buttonUpdate: {
    backgroundColor: colors.brown,
    color: colors.white,
    "&:hover": {
      backgroundColor: fade(colors.brown, 0.7),
    },
  },
  marginLeft: {
    marginLeft: 12,
  },

  accountInfoContainer: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    padding: 12,
  },
  accountInfoFieldsContainer: {
    flexGrow: 1,
    padding: 12,
  },
  accountInfoItem: {
    marginTop: 12,
  },

  detailsInfoContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "space-between",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  detailsInfoItem: {
    width: "30%",
    marginTop: 12,
  },
}));

export default useProfilePageStyle;

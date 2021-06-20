import { makeStyles, fade } from "@material-ui/core";
import colors from "../../assets/colorPalette";

const useHomePageStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "20px auto",
    width: "80%",
    maxWidth: "1444px",
  },

  // top site
  searchBox: {
    height: 40,
    width: "100%",
  },
  avatarBtn: {
    margin: theme.spacing(0, 0),
    padding: "3px",
  },
  avatarBtnActive: {
    border: "3px solid grey",
    borderRadius: "8px",
    padding: 0,
  },
  welcomePanel: {
    height: 100,
    borderRadius: theme.spacing(2),
    backgroundColor: colors.pink,
    display: "flex",
    alignItems: "center",
  },
  welcomeText: {
    marginLeft: theme.spacing(5),
  },
  bigText: {
    fontWeight: 900,
    fontSize: 30,
  },

  // toggle sorting buttons
  toggleSort: { margin: theme.spacing(2, 0) },
  toggleBtn: {
    margin: theme.spacing(0, 1),
    fontWeight: 900,
    fontSize: 16,
    "&:hover, &:focus": {
      color: fade("#000", 0.5),
    },
  },

  // list
  treeList: {
    marginTop: theme.spacing(2),
  },

  btnNewTree: {
    textAlign: "center",
  },
  customBtnDashed: {
    border: "dashed 1px black",
  },
  customBtnImport: {
    border: "dashed 1px black",
    padding: "5px 25px",
    minWidth: "74px",
    borderRadius: "3px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  progress: {
    backgroundColor: colors.pink,
    height: "12px",
    borderRadius: "15px",
  },
  groupProgress: {
    width: "100%",
    height: "300px",
    marginTop: "30px",
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default useHomePageStyles;

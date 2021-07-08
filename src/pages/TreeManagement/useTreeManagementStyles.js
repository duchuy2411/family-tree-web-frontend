import colors from "../../assets/colorPalette";

import { fade, makeStyles } from "@material-ui/core";

const useCustomTreePageStyles = makeStyles((theme) => ({
  media: {
    height: 300,
  },
  rootAccording: {
    margin: "20px auto",
    width: "80%",
    maxWidth: "1444px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cardContribute: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: theme.spacing(5),
    "& > *": {
      minWidth: theme.spacing(10),
    },
  },
  padding: {
    padding: "10px",
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  name: {
    fontSize: "17px",
  },
  borderTrike: {
    border: "1px dashed black",
    width: theme.spacing(20),
    height: theme.spacing(20),
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "5%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      cursor: "pointer",
    },
  },
  inputFields: {
    width: "96%",
    margin: theme.spacing(1),
    textAlign: "left",
  },
  label: {
    fontWeight: "bolder",
  },
  tab: {
    backgroundColor: colors.pink,
    borderRadius: "10px",
  },
  section: {
    marginTop: theme.spacing(2),
    borderRadius: "10px",
  },
  modal: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "right",
  },
  inputText: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  btnSecond: {
    backgroundColor: colors.blue5,
  },
  btnPrimary: {
    backgroundColor: colors.blue2,
    color: colors.white,
  },
  blockMale: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    backgroundColor: colors.blue4,
  },
  blockFemale: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    backgroundColor: colors.pink,
  },
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 940,
    marginTop: 20
  },
  header: {
    backgroundColor: colors.blue3,
    color: "white",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: "5px",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    fontSize: "10px",
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    zIndex: "101",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    fontSize: "12px",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "10ch",
    },
  },
  smallImg: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
  },
  details: {
    borderRadius: "10px",
    border: "none",
  },
  ageInput: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "& .MuiFormLabel-root": {
      color: "white",
      display: "none",
    },
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& .MuiInput-formControl": {
      marginTop: "5px",
    },
    "& .MuiSelect-root": {
      paddingLeft: "10px",
    },
    "& .MuiInput-underline": {
      "&::after": {
        borderBottom: `2px solid ${colors.pink}`,
      },
    },
  },
  modalDetail: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
  },
  avatarDetail: {
    width: "350px",
    height: "350px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  faSpinner: {
    display: "block",
    margin: "10px 15px",
    fontSize: "35px",
    color: "burlywood",
  },
  dateDetail: {
    textAlign: "center",
  },
  tableHead: {
    color: "#905842",
  },
  modalCustom: {
    borderRadius: "10px",
  },
  paperContainer: {
    margin: "10px",
  },
  nameTree: {
    fontSize: theme.spacing(5),
    fontWeight: "bolder",
    color: colors.blue2,
  },
  publicMode: {
    fontSize: theme.spacing(2),
    fontWeight: "bolder",
    color: colors.blue3
  },
  description: {
    margin: "20px"
  },
  containerInformation: {
    padding: "30px",
    textAlign: "center"
  },
  spinTitle: {
    borderRadius: "5px",
    backgroundColor: colors.blue4,
    display: "inline-block",
    padding: "10px",
    textAlign: "center",
    color: colors.white,
  },
  contentCard: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "10px"
  }
}));

export default useCustomTreePageStyles;

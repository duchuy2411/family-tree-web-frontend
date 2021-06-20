import colors from "../../../../assets/colorPalette";

import { makeStyles } from "@material-ui/core";

const useCardMemberStyles = makeStyles((theme) => ({
  root: {},
  card: {
    backgroundColor: colors.pink,
    borderRadius: theme.spacing(1),
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "5px 0px",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
}));

export default useCardMemberStyles;

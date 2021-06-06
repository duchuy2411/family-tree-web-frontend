import COLORS from "./../colorPalette";
import { makeStyles } from "@material-ui/core";

const useTypographyStyles = makeStyles(() => ({
  heading: {
    color: COLORS.VampireBlack,
    fontWeight: 700,
  },
  h1: {
    color: COLORS.VampireBlack,
    fontWeight: 700,
    fontSize: "2.5rem", // 40
  },
  h2: {
    color: COLORS.VampireBlack,
    fontWeight: 700,
    fontSize: "2rem", // 32
  },
  h3: {
    color: COLORS.VampireBlack,
    fontWeight: 700,
    fontSize: "1.5rem", // 24
  },
  h4: {
    color: COLORS.VampireBlack,
    fontWeight: 700,
    fontSize: "1.25rem", // 20
  },
  h5: {
    color: COLORS.VampireBlack,
    fontWeight: 700,
    fontSize: "1rem", // 16
  },
  button: {
    color: COLORS.DarkGreen,
    fontWeight: 700,
    fontSize: "1rem", // 16
  },
  cardItem: {
    color: COLORS.VampireBlack,
    fontWeight: 600,
    fontSize: "1.125rem", // 18
  },
  lead: {
    color: COLORS.VampireBlack,
    fontWeight: 400,
    fontSize: "1rem", //16
  },
  body: {
    color: COLORS.VampireBlack,
    fontWeight: 400,
    fontSize: "0.875rem", // 14
  },
  textGray: {
    color: COLORS.Zambezi,
    fontWeight: 400,
    fontSize: "0.875rem", // 14
  },
  textSubtle: {
    color: COLORS.DarkGrey,
    fontWeight: 400,
    fontSize: "0.875rem", // 14
  },
  caption: {
    color: COLORS.Grey,
    fontWeight: 400,
    fontSize: "0.75rem", // 12
  },
}));

export default useTypographyStyles;

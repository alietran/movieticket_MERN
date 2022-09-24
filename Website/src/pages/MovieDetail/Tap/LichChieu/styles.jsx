import { makeStyles, withStyles } from "@mui/styles";
import { customScrollbar, underLine } from "../../../../styles/materialUi";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: 713,
    borderRadius: "10px",
    color: "#000",
  },
  leftSection: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "28%",
  },
  indicator: {
    backgroundColor: "transparent",
  },

  wrapper: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  tabRoot: {
    padding: 20,
    textAlign: "left",
    fontSize: 12,
    opacity: 0.3,
    "&:hover": {
      opacity: 1,
    },
    transition: "all .2s",
    ...underLine,
  },
  logo: {
    width: 50,
    marginRight: 10,
  },

  rightSection: {
    width: "72%",
  },

  listDay: {
    height: "90px",
    padding: "16px !important",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    backgroundColor: "#fff",
    borderRadius: 10,

    display: "flex",

    overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    ...customScrollbar,
  },
  dayItem: {
    width: "100%",
    padding: 10,
    fontWeight: 500,
    textAlign: "center",
    cursor: "pointer",
  },
  cumRapItem: {
    transition: "height .2s",
    overflowY: "hidden",
    ...underLine,
  },
  imgTheater: {
    width: 50,
    float: "left",
    display: "inline-block",
    border: "1px solid #ebebec",
  },
}));

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    alignItems: "center",
    gap: 12,
    "& > img": {
      width: 50,
    },
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    gap: "10px",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}))(MuiAccordionDetails);

export { useStyles, Accordion, AccordionSummary, AccordionDetails };

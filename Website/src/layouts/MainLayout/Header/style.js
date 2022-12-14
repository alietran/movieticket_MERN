import { makeStyles } from "@mui/styles";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // backgroundColor: "rgba(255,255,255,.95)",f
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,

    marginRight: drawerWidth,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  logo: {
    cursor: "pointer",
  },
  linkTobody: {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    // color: "#000",
    paddingLeft: 10,
    paddingRight: 10,
    width: "auto",
    // "&:hover": {
    //   textDecoration: "none",
    // //   backgroundColor: "transparent",
    // //   color: "#fb4226",
    //   transition: "all .2s",
    // },
  },
  user: {
    // display: (props) => (props.isDesktop ? "block" : "none"),
    display: "block",
  },
  auth: {
    display: "flex",
    // color: (props) => (props.isDesktop ? "#9b9b9b" : "#000"),
    // color: "#9b9b9b",
  },
  itemAuth: {
    paddingLeft: 10,
    paddingRight: 10,
    minWidth: "fit-content",
    "&:hover": {
      //   backgroundColor: "transparent",
      "& .MuiTypography-root": {
        // color: "#fb4226",
      },
      "& .MuiListItemIcon-root": {
        // color: "#fb4226",
      },
    },
    "& .MuiTypography-root": {
      //   transition: "all .2s",
    },
    "& .MuiListItemIcon-root": {
      transition: "all .2s",
    },
  },
  hover: {
    "&:hover": {
      //   color: "#fb4226",
      //   backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  divide: {
    fontWeight: 500,
    "&::after": {
      content: "''",
      position: "absolute",
      right: "0",
      height: "30px",
      top: "50%",
      transform: "translateY(-50%)",
      //   borderRight: (props) => (props.isDesktop ? "1px solid #e9e9e9" : "none"),
      borderRight: "1px solid #e9e9e9",
    },
  },
  icon: {
    // minWidth: 41,
    // color: "#9b9b9b",
  },

  listItem: {
    color: "gray",
    "&:hover" : {
          color: "#fb4226",
    }
  

    // "&:hover > a": {
    //     // color: "#fb4226",
    // },
    // "&:hover > div": {
    //     // color: "#fb4226",
    // },
    // "&:hover > span": {
    //     // color: "#fb4226",
    // },
  },
  menuIcon: {
    // display: (props) =>
    //   props.isDesktop || props.openDrawer ? "none" : "block",
    display: "block",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "none",
    },
    // padding: theme.spacing(0, 1),
    // ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  itemMenu: {
    display: "block",
    padding: 20,
    transition: "all 0.2s",
    fontWeight: 500,
    width: "100%",
    cursor: "pointer",
    fontSize: 16,
    "&:hover": {
      color: "#fb4226 !important",
      //   backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  username: {
    "& > span": {
      fontWeight: 500,
    },
  },
}));

export default useStyles;

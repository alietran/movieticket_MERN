import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  addbg: {
    backgroundImage: (props) => `url(${props.bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "147.9%",
    borderRadius: 4,
  },
  // dots: {
  //   "slick-arrow slick-next": {
  //     right: "4px",
  //   },
  //   "slick-arrow slick-previous": {
  //     left: "14px",
  //   },
  // },
}));

export default useStyles;

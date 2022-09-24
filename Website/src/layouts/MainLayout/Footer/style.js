import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  textColor: {
    "& > li > a": {
      color: "#F4FCD9",
    },
    "& > li ": {
      margin: "5px 0",
    },
    "& > a": {
      color: "#F4FCD9",
    },
  },
  footer:{
      backgroundColor: "#222222",
      padding: "0 20px"
   
  }
})); 
  
export default useStyles;

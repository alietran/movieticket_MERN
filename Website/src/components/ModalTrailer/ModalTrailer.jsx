import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from "@mui/styles";

// import { CLOSE_MODAL } from "../../reducers/constants/ModalTrailer";
import getVideoId from "../../utils/getVideoIdFromUrlyoutube";

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: "visible",
    backgroundColor: "black",
  },
  // closeButton: {
  //   position: "absolute",
  //   top: 0,
  //   right: 0,
  //   transform: "translate(50%,-150%)",
  //   border: "2px solid white",
  //   "&:focus": {
  //     outline: "none",
  //   },
  //   "&:hover": { opacity: 0.7 },
  //   transition: "all .2s",
  // },
  iframe: {
    width: "898px",
     height: "480px",
    // transform: "translate(0%,5%)",
    [theme.breakpoints.down("lg")]: {
      width: "598px",
      height: "336px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "fit-content",
      height: "fit-content",
    },
  },
}));

export default function ModalTrailer() {
  const { open, urlYoutube } = useSelector(
    (state) => state.ModalTrailerReducer
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL", payload: { open: false } });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      classes={{ paper: classes.paper }}
    >
      <iframe
        className={classes.iframe}
        src={`https://www.youtube.com/embed/${getVideoId(
          urlYoutube
        )}?autoplay=1`}
        allowFullScreen
        frameBorder="0"
        allow="autoplay"
        title="trailer movie"
      ></iframe>
      {/* <IconButton onClick={handleClose}> */}
      {/* //  className={classes.closeButton} > */}
        {/* <CloseIcon style={{ color: "white" }} fontSize="small" /> */}
      {/* </IconButton> */}
    </Dialog>
  );
}

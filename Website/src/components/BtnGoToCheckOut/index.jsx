import React from "react";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
export default function BtnGoToCheckout({ lichChieuTheoPhim }) {
   const { userLogin } = useSelector((state) => state.UserReducer);
  const classes = useStyles();
  const history = useHistory();
  const formatDateShow = new Date(lichChieuTheoPhim.dateShow)
    .toLocaleTimeString([], { hour12: false })
    .slice(0, 5);

  const calculateTimeout = (dateShow) => {
    const fakeThoiLuong = 120;
    const timeInObj = new Date(dateShow);
    const timeOutObj = new Date(
      timeInObj.getTime() + fakeThoiLuong * 60 * 1000
    );

    return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
  };

  const handleCheckout = ()=>{
    if(userLogin)
      history.push(
          `/checkout/${lichChieuTheoPhim._id}`,
          // `/checkout/${lichChieuTheoPhim._id}`
        )
        else{
          history.push("/login")
        }
  }
  return (
    <button
      className={classes.button}
      onClick={() =>
       {handleCheckout()}
       
      }
    >
      <span className={classes.inTime}>{formatDateShow}</span>
      <span className={classes.outTime}>{` ~ ${calculateTimeout(
        lichChieuTheoPhim.dateShow
      )}`}</span>
    </button>
  );
}

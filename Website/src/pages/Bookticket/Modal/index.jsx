import React from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ResultBookticket from "../ResultBookticket";
import useStyles from "./style";
import { getDetailShowtime } from "../../../redux/actions/showtimeAction";
import { Button, Dialog } from "@mui/material";

export default function Modal(props) {
  const {
    listSeat,
    amount,
    email,
    phone,
    paymentMethod,
    isReadyPayment,
    isMobile,
    seatCodes,
    danhSachPhongVe: { idMovie },
    idShowtime,
    isSelectedSeat,
    listSeatSelected,
    loadingBookigTicket,
    successBookingTicket,
    errorBookTicket,
    timeOut,
    alertOver10,
  } = useSelector((state) => state.BookTicketReducer);
  const dispatch = useDispatch();
  // const params = useParams(); // lấy dữ liệu param từ URL
  const history = useHistory();
  const classes = useStyles({
    idMovie,
  });
    
  const isBookticket = successBookingTicket || errorBookTicket ? true : false;

  const handleReBooking = () => {
    if (successBookingTicket) {
     
      dispatch(getDetailShowtime(props.match?.params.id));
          
    }
    dispatch({ type: "RESET_DATA_BOOKTICKET" });
  };
  const handleTimeOut = () => {
  
    dispatch({ type: "RESET_DATA_BOOKTICKET" });
    dispatch(getDetailShowtime(props.match.params.id));
  };
  const handleAlertOver10 = () => {
    dispatch({ type: "RESET_ALERT_OVER10" });
  };

  const handleCombackHome = () => {
    dispatch({ type: "RESET_DATA_BOOKTICKET" });
    // dispatch({ type: LOADING_BACKTO_HOME });
    history.push("/");
  };

  return (
    <Dialog
      open={timeOut || (isBookticket && !isMobile) || alertOver10}
      classes={{ paper: classes.modal }}
      maxWidth="md"
    >
      {timeOut &&
        !isBookticket && ( // không thông báo hết giờ khi đã có kết quả đặt vé
          <div className={classes.padding}>
            <p>
              Đã hết thời gian giữ ghế. Vui lòng thực hiện đơn hàng trong thời
              hạn 5 phút.
              <span className={classes.txtClick} onClick={handleTimeOut}>
                Đặt vé lại
              </span>
            </p>
          </div>
        )}
      {alertOver10 &&
        !timeOut && ( // ẩn thông báo quá 10 ghế khi time out
          <div className={classes.over10}>
            <div className={classes.notification}>
              <img
                width="100%"
                src="/img/bookticket/Post-notification.png"
                alt="Post-notification"
              />
            </div>
            <p className={classes.textOver}>Bạn không thể chọn quá 10 ghế</p>
            <Button
              variant="outlined"
              classes={{ root: classes.btnOver }}
              onClick={handleAlertOver10}
            >
              ok
            </Button>
          </div>
        )}
      {!isMobile &&
        isBookticket && ( // chỉ open modal khi là desktop và đã đạt vé
          <>
            <ResultBookticket />
            <div className={classes.spaceEvenly}>
              <Button
                classes={{ root: classes.btnResult }}
                onClick={handleReBooking}
              >
                {successBookingTicket && "Mua thêm vé phim này"}
                {errorBookTicket && "Thử mua lại"}
              </Button>
              <Button
                classes={{ root: classes.btnResult }}
                onClick={handleCombackHome}
              >
                Quay về trang chủ
              </Button>
            </div>
          </>
        )}
    </Dialog>
  );
}

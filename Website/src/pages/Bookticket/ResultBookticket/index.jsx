import React from "react";

import { useSelector } from "react-redux";

import useStyles from "./style";
import formatDate from "../../../utils/formatDate";

export default function SuccessBooking() {
  const {
    listSeat,
    amount,
    email,
    phone,
    paymentMethod,
    isReadyPayment,
    seatCodes,
    danhSachPhongVe,
    idShowtime,
    isSelectedSeat,
    listSeatSelected,
    successBookingTicket,
    errorBookTicket,
    timeOut,
    alertOver10,
  } = useSelector((state) => state.BookTicketReducer);
  const { idMovie, dateShow, idCinema } = danhSachPhongVe;
  const { userLogin } = useSelector((state) => state.UserReducer);

  const classes = useStyles({
    idMovie,
  });
  const calculateTimeout = (dateShow) => {
    const fakeThoiLuong = 120;
    const timeInObj = new Date(dateShow);
    const timeOutObj = new Date(
      timeInObj.getTime() + fakeThoiLuong * 60 * 1000
    );

    return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
  };
  return (
    <div className={classes.resultBookticket}>
      <div className={classes.infoTicked}>
        <div className={classes.infoTicked__img}></div>
        <div className={classes.infoTicked__txt}>
          <p className={classes.tenPhim}>{idMovie?.name}</p>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td valign="top">Suất chiếu:</td>
                <td valign="top">{`${calculateTimeout(dateShow)} ${
                  formatDate(dateShow).YyMmDd
                }`}</td>
              </tr>
              <tr>
                <td valign="top">Phòng:</td>
                <td>{idCinema?.name}</td>
              </tr>
              <tr>
                <td valign="top">Ghế:</td>
                <td>{listSeatSelected?.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          <h3 className={classes.infoResult_label}>Thông tin đặt vé</h3>
          <table className={`${classes.table} table`}>
            <tbody>
              <tr>
                <td valign="top">Họ tên:</td>
                <td>{userLogin?.userName}</td>
              </tr>
              <tr>
                <td valign="top">Điện thoại:</td>
                <td valign="top">{phone}</td>
              </tr>
              <tr>
                <td valign="top">Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td valign="top">Trạng thái:</td>
                <td>
                  {successBookingTicket && (
                    <span>
                      Đặt vé thành công qua{" "}
                      <span className={classes.paymentColor}>
                        {paymentMethod}
                      </span>
                    </span>
                  )}
                  {errorBookTicket && (
                    <span>
                      Đặt vé thất bại:{" "}
                      <span className={classes.errorColor}>
                        {errorBookTicket}
                      </span>
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td valign="top">Tổng tiền:</td>
                <td valign="top">
                  <span>{`${amount.toLocaleString("vi-VI")} đ`}</span>
                </td>
              </tr>
            </tbody>
          </table>
          {successBookingTicket && (
            <p className={classes.noteresult}>
              Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

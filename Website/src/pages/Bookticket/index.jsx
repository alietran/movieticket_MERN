import React from "react";
import Desktop from "./Desktop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailShowtime } from "../../redux/actions/showtimeAction";
import { useParams } from "react-router-dom";
import Modal from "./Modal";

export default function BookTicket(props) {
  const { danhSachPhongVe, timeOut, refreshKey } = useSelector(
    (state) => state.BookTicketReducer
  );
  const { userLogin } = useSelector((state) => state.UserReducer);
  const { id } = props.match.params;
  const { idCinema, idmovie, seatList, ticketPrice } = danhSachPhongVe;
  // console.log("danhSachPhongVe",danhSachPhongVe)
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailShowtime(id));
    return () => {
      // xóa dữ liệu khi đóng hủy component
      dispatch({ type: "RESET_DATA_BOOKTICKET" });
    };
  }, []);

  useEffect(() => {
    // sau khi lấy được danhSachPhongVe thì khởi tạo data
    let initCode = 64;
    const danhSachGheEdit = seatList?.map((seat, i) => {
      // thêm label A01, thêm flag selected: false
      if (i % 16 === 0) initCode++;
      const txt = String.fromCharCode(initCode);
      const number = ((i % 16) + 1).toString().padStart(2, 0);
      return {
        ...seat,
        label: txt + number,
        selected: false,
        ticketPrice: ticketPrice,
      };
    });
    dispatch({
      type: "INIT_DATA",
      payload: {
        listSeat: danhSachGheEdit,
        idShowtime: danhSachPhongVe?._id,
        userName: userLogin?.userName,
        email: userLogin?.email,
        phone: userLogin?.phoneNumber,
      },
    });
  }, [seatList, userLogin, timeOut]);
  return (
    <div>
      <Desktop key={refreshKey + 1} />
      <Modal {...props}/>
    </div>
  );
}

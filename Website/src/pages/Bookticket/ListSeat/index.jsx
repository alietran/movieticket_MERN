import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailShowtime } from "../../../redux/actions/showtimeAction";
import useStyles from "./style";
import Countdown from "../Countdown";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../../../utils/formatDate";

export default function ListSeat() {
  const { danhSachPhongVe, listSeat } = useSelector(
    (state) => state.BookTicketReducer
  );
  // console.log("listSeat", listSeat);
  const { idCinema, idMovie, dateShow } = danhSachPhongVe;
  const domToSeatElement = useRef(null);
  const dispatch = useDispatch();
  const param = useParams();
  const [widthSeat, setWidthSeat] = useState(0);
  const classes = useStyles({
    modalLeftImg: idMovie?.images,
    widthLabel: widthSeat / 2,
  });

  useEffect(() => {
    // khởi tạo event lắng nghe "resize"
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    handleResize();
  }, [listSeat]); // sau khi có listSeat thì run handleResize để lấy giá trị đầu tiên
  const handleResize = () => {
    setWidthSeat(domToSeatElement?.current?.offsetWidth);
  };
  //  console.log("listSeat35",listSeat);
  const handleSelectedSeat = (seatSelected) => {
    if (seatSelected.isBooked) {
      // click vào ghế đã có người chọn
      return;
    }
    // console.log("líisatts", listSeat);
    // đổi lại giá trị selected của ghế đã chọn
   
    let newListSeat = listSeat?.map((seat) => {
      if (seatSelected._id === seat._id) {
        return { ...seat, selected: !seat.selected };
      }
      return seat;
    });
    // cập nhật lại danh sách hiển thị ghế đã chọn
    const newListSeatSelected = newListSeat?.reduce(
      (newListSeatSelected, seat) => {
        if (seat.selected) {
          return [...newListSeatSelected, seat.label];
         
        }
        return newListSeatSelected;
        
      },
      []
    );
     console.log("seat.label1",newListSeatSelected) 
    // thông báo nếu chọn quá 10 ghế
    if (newListSeatSelected.length === 11) {
      dispatch({
        type: 'SET_ALERT_OVER10',
      });
      return;
    }

    // cập nhật lại danhSachVe dùng để booking
    const seatCodes = newListSeat?.reduce((seatCodes, seat) => {
      if (seat.selected) {
        return [...seatCodes, seat.name];
      }
      return seatCodes;
    }, []);
    // console.log("newListSeat", newListSeat);
    // cập nhật biến kiểm tra đã có ghế nào được chọn chưa
    const isSelectedSeat = newListSeatSelected.length > 0 ? true : false;
    // tính lại tổng tiền

    const amount = newListSeat?.reduce((amount, seat) => {
      if (seat.selected) {
        return (amount += seat.ticketPrice);
      }
      return amount;
    }, 0);
 console.log("newListSeat",newListSeat);
  console.log("newListSeatSelected",newListSeatSelected);
    dispatch({
      type: "CHANGE_LISTSEAT",
      payload: {
        listSeat: newListSeat,
        isSelectedSeat,
        listSeatSelected: newListSeatSelected,
        seatCodes,
        amount,
      },
    });
  };
 
  const color = (seat) => {
    let color = "#3e515d";
    if (seat.selected) {
      color = "#44c020";
    }
    if (seat.isBooked) {
      color = "#99c5ff";
    }
    return color;
  };
  const calculateTimeout = (dateShow) => {
    const fakeThoiLuong = 120;
    const timeInObj = new Date(dateShow);
    const timeOutObj = new Date(
      timeInObj.getTime() + fakeThoiLuong * 60 * 1000
    );

    return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
  };
  return (
    <main className={classes.listSeat}>
      {/* thông tin phim */}
      <div className={classes.info_CountDown}>
        <div className={classes.infoTheater}>
          <img
            src="/img/lotte-cinema-go-vap-15383873960955.jpg"
            alt="rap"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <div className={classes.text}>
            {/* <TenCumRap tenCumRap={thongTinPhim?.tenCumRap} /> */}
            <p className={classes.textTime}>{`${
              idMovie && formatDate(dateShow).dayToday
            } ${formatDate(dateShow).YyMmDd}`}</p>
            <p className={classes.textTime}>{`${calculateTimeout(dateShow)} - ${
              idCinema?.name
            }`}</p>
          </div>
        </div>
        <div className={classes.countDown}>
          <p className={classes.timeTitle}>Thời gian giữ ghế</p>
          <Countdown />
        </div>
      </div>
      <div className={classes.overflowSeat}>
        <div className={classes.invariantWidth}>
          {/* mô phỏng màn hình */}
          <img className="" src="/img/bookticket/screen.png" alt="screen" />
          {/* danh sách ghế */}
          <div className={classes.seatSelect}>
            {listSeat?.map((seat, i) => (
              <div
                className={classes.seat}
                key={seat._id}
                ref={domToSeatElement}
              >
                {/* label A B C ... đầu mỗi row */}
                {(i === 0 || i % 16 === 0) && (
                  <p className={classes.label}>{seat.label.slice(0, 1)}</p>
                )}

                {/* số ghế thứ tự của ghế */}
                {seat.selected && (
                  <p className={classes.seatName}>
                    {Number(seat.label.slice(1)) < 10
                      ? seat.label.slice(2)
                      : seat.label.slice(1)}
                  </p>
                )}

                {/* label ghế đã có người đặt */}
                {/* Nếu đã đặt thì thêm vào ảnh */}
                {seat.isBooked && (
                  <img
                    className={classes.seatLocked}
                    src="/img/bookticket/notchoose.png"
                    alt="notchoose"
                  />
                )}
                {/* icon ghế */}

                <SquareRoundedIcon
                  style={{ color: color(seat) }}
                  className={classes.seatIcon}
                />
                {/* đường viền chỉ vùng ghế */}
                {/* {seat.label === "E08" && (
                  <img
                    className={classes.viewCenter}
                    src="/img/bookticket/seatcenter.png"
                    alt="seatcenter"
                  />
                )} */}
                {/* vùng bắt sự kiện click */}
                <div
                  className={classes.areaClick}
                  onClick={() => handleSelectedSeat(seat)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* thông tin các loại ghế */}
      <div className={classes.noteSeat}>
        <div className={classes.typeSeats}>
          <div>
            <SquareRoundedIcon style={{ color: "#3e515d", fontSize: 27 }} />
            <p>Ghế thường</p>
          </div>
          <div>
            <SquareRoundedIcon style={{ color: "#44c020", fontSize: 27 }} />
            <p>Ghế đang chọn</p>
          </div>
          <div>
            <div style={{ position: "relative" }}>
              <p className={classes.posiX}>x</p>
              <SquareRoundedIcon style={{ color: "#99c5ff", fontSize: 27 }} />
            </div>
            <p>Ghế đã được mua</p>
          </div>
        </div>
        <div className={classes.positionView}>
          {/* <span>
            <span className={classes.linecenter} />
            <span>Ghế trung tâm</span>
          </span>
          <span className={classes.line}>
            <span className={classes.linebeautiful} />
            <span>Ghế Đẹp</span>
          </span> */}
        </div>
      </div>

      {/* modalleft */}
      <div className={classes.modalleft}>
        <div className={classes.opacity}></div>
      </div>
    </main>
  );
}

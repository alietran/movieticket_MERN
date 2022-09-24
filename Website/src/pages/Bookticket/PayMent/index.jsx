import React, { useState, useEffect, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { postCreateTicket } from "../../../redux/actions/showtimeAction";
import formatDate from "../../../utils/formatDate";
import toast, { Toaster } from 'react-hot-toast';
import useStyles from "./style";
  import { useHistory } from "react-router-dom";
import { payment } from "../../../redux/actions/ticketAction";


const makeObjError = (name, value, dataSubmit) => {
  // kiểm tra và set lỗi rỗng
  let newErrors = {
    ...dataSubmit.errors,
    [name]:
      value?.trim() === ""
        ? `${name.charAt(0).toUpperCase() + name.slice(1)} không được bỏ trống`
        : "",
  };

  //   // kiểm tra và set lỗi sai định dạng
  //eslint-disable-next-line
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //eslint-disable-next-line
  const regexNumber =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
  if (name === "email" && value) {
    if (!regexEmail.test(value)) {
      newErrors[name] = "Email không đúng định dạng";
    }
  }
  if (name === "phone" && value) {
    if (!regexNumber.test(value)) {
      newErrors[name] = "Phone không đúng định dạng";
    }
  }
  return newErrors;
};

export default function PayMent() {
  const {
    listSeat,
    amount,
    email,
    phone,
    paymentMethod,
    isReadyPayment,
    isMobile,
    seatCodes,
    danhSachPhongVe,
    idShowtime,
    isSelectedSeat,
    listSeatSelected,
    loadingBookingTicket,
    successBookingTicket,
    errorBookTicket,
  } = useSelector((state) => state.BookTicketReducer);
  // let amout = amount ? amout : 0.01
  const history = useHistory();
  const { idMovie, idCinema, dateShow } = danhSachPhongVe;
  console.log("danhSachPhongVe", danhSachPhongVe);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const phoneRef = useRef(); // dùng useRef để dom tớ element
  let variClear = useRef(""); // dùng useRef để lưu lại giá trị setTimeout
  const [dataFocus, setDataFocus] = useState({ phone: false, email: false });
  const [dataSubmit, setdataSubmit] = useState({
    values: {
      email: email,
      phone: phone,
      paymentMethod: paymentMethod,
    },
    errors: {
      email: "",
      phone: "",
    },
  });
  const classes = useStyles({
    isSelectedSeat,
    isReadyPayment,
    isMobile,
    dataFocus,
    dataSubmit,
  });

  const onChange = (e) => {
    // khi onchange update values và validation
    let { name, value } = e.target;
    let newValues = { ...dataSubmit.values, [name]: value };
    console.log("newValues", newValues);
    let newErrors = makeObjError(name, value, dataSubmit);
    setdataSubmit((dataSubmit) => ({
      ...dataSubmit,
      values: newValues,
      errors: newErrors,
    }));
  };

  useEffect(() => {
    // sau 0.5s mới đẩy data lên redux để tăng hiệu năng
    clearTimeout(variClear);
    variClear.current = setTimeout(() => {
      dispatch({
        type: "SET_DATA_PAYMENT",
        payload: {
          email: dataSubmit.values.email,
          phone: dataSubmit.values.phone,
          paymentMethod: dataSubmit.values.paymentMethod,
        },
      });
      // khi không có lỗi và đủ dữ liệu thì set data sẵn sàng đặt vé và ngược lại, set activeStep = 1 nếu đủ dữ liệu và chưa đặt vé
      if (
        !dataSubmit.errors.email &&
        !dataSubmit.errors.phone &&
        dataSubmit.values.email &&
        dataSubmit.values.phone &&
        dataSubmit.values.paymentMethod &&
        isSelectedSeat
      ) {
        dispatch({
          type: "SET_READY_PAYMENT",
          payload: { isReadyPayment: true },
        });
      } else {
        dispatch({
          type: "SET_READY_PAYMENT",
          payload: { isReadyPayment: false },
        });
      }
    }, 500);
    return () => clearTimeout(variClear.current);
  }, [dataSubmit, isSelectedSeat]);

  useEffect(() => {
    // cập nhật lại data email, phone và validation khi reload
    let emailErrors = makeObjError(emailRef.current.name, email, dataSubmit);
    let phoneErrors = makeObjError(phoneRef.current.name, phone, dataSubmit);
    setdataSubmit((dataSubmit) => ({
      ...dataSubmit,
      values: {
        email: email,
        phone: phone,
        paymentMethod: paymentMethod,
      },
      errors: { email: emailErrors.email, phone: phoneErrors.phone },
    }));
  }, [listSeat]); // khi reload listSeat sẽ được cập nhật kèm theo, email, phone mặc định của tài khoản
  

  const handleBookTicket = () => {
  
    // action="http://localhost:5000/api/ticket/createTicket" method="post"
    // dispatch(payment())
    // khi đủ dữ liệu và chưa có lần đặt vé nào trước đó thì mới cho đặt vé
  //  history.push("http://localhost:5000/api/ticket/createTicket");
    //   if (
    //   isReadyPayment &&
    //   !loadingBookingTicket &&
    //   !successBookingTicket &&
    //   !errorBookTicket
    // ) {
    
      dispatch(postCreateTicket({ idShowtime, seatCodes, email }));
    //   console.log("email", email);
          // dispatch(postCreateTicket({idShowtime: "621cf3051b6992b50ba614f4" , seatCodes: ["A1","A2"], "ngocdiep710@gmail.com" })
    // }
    
  };
  const onFocus = (e) => {
    setDataFocus({ ...dataFocus, [e.target.name]: true });
  }; 
  const onBlur = (e) => {
    setDataFocus({ ...dataFocus, [e.target.name]: false });
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
    <aside className={classes.payMent}>
      <div>
        {/* tổng tiền */}
        <p className={`${classes.amount} ${classes.payMentItem}`}>
          {`${amount.toLocaleString("vi-VI")} đ`}
        </p>

        {/* thông tin phim và rạp */}

        <div className={classes.payMentItem}>
          <p className={classes.tenPhim}>{idMovie?.name}</p>
          <p>{`${idMovie && formatDate(dateShow).dayToday} ${
            formatDate(dateShow).YyMmDd
          } - ${calculateTimeout(dateShow)} - ${idCinema?.name}`}</p>
        </div>

        {/* ghế đã chọn */}
        <div className={`${classes.seatInfo} ${classes.payMentItem}`}>
          <span>{`Ghế ${listSeatSelected?.join(", ")}`}</span>
          <p className={classes.amountLittle}>
            {`${amount.toLocaleString("vi-VI")} đ`}
          </p>
        </div>

        {/* email */}
        <div className={classes.payMentItem}>
          <label className={classes.labelEmail}>E-Mail</label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            onFocus={onFocus}
            onBlur={onBlur}
            value={dataSubmit.values.email}
            className={classes.fillInEmail}
            onChange={onChange}
            autoComplete="off"
            disabled

          />
          <p className={classes.error}>{dataSubmit.errors.email}</p>
        </div>

        {/* phone */}
        <div className={classes.payMentItem}>
          <label className={classes.labelPhone}>Phone</label>
          <input
            type="number"
            name="phone"
            ref={phoneRef}
            onFocus={onFocus}
            onBlur={onBlur}
            value={dataSubmit.values.phone}
            className={classes.fillInPhone}
            onChange={onChange}
            autoComplete="off"
          />
          <p className={classes.error}>{dataSubmit.errors.phone}</p>
        </div>

        {/* Mã giảm giá */}
        <div className={classes.payMentItem}>
          <label className={classes.label}>Mã giảm giá</label>
          <input
            type="text"
            value="Tạm thời không hỗ trợ..."
            readOnly
            className={classes.fillIn}
          />
          <button className={classes.btnDiscount} disabled>
            Áp dụng
          </button>
        </div>

        {/* hình thức thanh toán */}
        <div className={classes.selectedPayMentMethod}>
          <label className={classes.label}>Hình thức thanh toán</label>
          <p className={classes.toggleNotice}>
            Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.
          </p>

          <div className={classes.formPayment}>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="ZaloPay"
                onChange={onChange}
                checked={dataSubmit.values.paymentMethod === "ZaloPay"}
              />
              <img
                className={classes.img}
                src="/img/bookticket/zalo.jpg"
                alt="zalopay"
              />
              <label>Thanh toán qua ZaloPay</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="Visa, Master, JCB"
                onChange={onChange}
                checked={
                  dataSubmit.values.paymentMethod === "Visa, Master, JCB"
                }
              />
              <img
                className={classes.img}
                src="/img/bookticket/visa.png"
                alt="visa"
              />
              <label>Visa, Master, JCB</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="ATM nội địa"
                onChange={onChange}
                checked={dataSubmit.values.paymentMethod === "ATM nội địa"}
              />
              <img
                className={classes.img}
                src="/img/bookticket/atm.png"
                alt="atm"
              />
              <label>Thẻ ATM nội địa</label>
            </div>
            <div className={classes.formPaymentItem}>
              <input
                className={classes.input}
                type="radio"
                name="paymentMethod"
                value="Cửa hàng tiện ích"
                onChange={onChange}
                checked={
                  dataSubmit.values.paymentMethod === "Cửa hàng tiện ích"
                }
              />
              <img
                className={classes.img}
                src="/img/bookticket/cuahang.png"
                alt="cuahang"
              />
              <label>Thanh toán tại cửa hàng tiện ích</label>
            </div>
          </div> 
        </div>
        {/* <PayPalScriptProvider
          options={{
            "client-id":
              "AeMhxzby0QNrCowpUJM52nCsPqPRZByHFZu-hrvm8I4C6NWFzGgCAR0O50pZhk3-2Wb21KJd38k0gUUV",
          }}
        >
          <Toaster />
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
              // console.log("actions", actions);
              // console.log("data", data);

               handleBookTicket();
              toast.success("Thanh toán thành công!");
              });
            }}
            onCancel={() => {
              toast("Bạn đã huỷ thanh toán!", { duration: 10000 });
            }}
            onErrorl={() => {
              toast.error("Thanh toán lỗi. Vui lòng thử lại!", {
                duration: 10000,
              });
            }}
          />
        </PayPalScriptProvider> */}
        {/* <button  onClick={handleBookTicket}>
          <PayPalScriptProvider options={{ "client-id": "AbGNy-ejR3p152O7rxJV2IpPKD44PAgmBidvBRxkuADowkKPksjbTSv-vzVPTn4yhLwUMg6cnZ3lK57w" }}>     
            <PayPalButtons  style={{ layout: "horizontal" }} reateOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "1.99",
                                },
                            },
                        ],
                    });
                }}
                 onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    
                    });
                }} />
         
        </PayPalScriptProvider>
        </button> */}
             {/* đặt vé */}
         <div className={classes.bottomSection}> 
         <button
            className={classes.btnDatVe}
            disabled={!isReadyPayment}
            onClick={handleBookTicket}
        
          >
            <p className={classes.txtDatVe}>Đặt Vé</p>
          </button> 
       </div>
    
    {/* <form action="http://localhost:5000/api/ticket/pay" method="POST">
        <input type="submit"  value="Đặt vé"
         onClick={handleBookTicket}
         />
       </form> */}

      
      </div>

      {/* notice */}
      <div className={classes.notice}>
        <img
          className={classes.imgNotice}
          src="/img/bookticket/exclamation.png"
          alt="notice"
        />
        <span>Vé đã mua không thể đổi hoặc hoàn tiền</span>
        <p>
          Mã vé sẽ được gửi qua tin nhắn{" "}
          <span className={classes.contactColor}>ZMS</span> (tin nhắn Zalo) và{" "}
          <span className={classes.contactColor}>Email</span> đã nhập.
        </p>
      </div>
    </aside>
  );
}

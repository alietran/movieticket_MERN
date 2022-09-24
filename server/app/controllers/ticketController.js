// import {EmailService} from "./config.sendEmail";
// const EmailService = require("../config/config.sendEmail");
const { MODEL_TICKET, MODEL_SHOWTIME } = require("../models");
const catchAsync = require("../utils/catchAsync");
// const Showtimes = require("../models/Showtime");
require("dotenv").config();
const message = require("../constants/message");
const nodemailer = require("nodemailer");
const paypal = require("paypal-rest-sdk");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_APP, // generated ethereal user
    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
  },
});

let newTicket = null;
let calculateTimeout = (dateShow) => {
  const fakeThoiLuong = 120;
  const timeInObj = new Date(dateShow);
  const timeOutObj = new Date(timeInObj.getTime() + fakeThoiLuong * 60 * 1000);
  return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
};

const createTicket = catchAsync(async (req, res, next) => {
  const { idShowtime, seatCodes, email } = req.body;
  const user = req.user;
  await MODEL_SHOWTIME.findById(idShowtime)
    .populate("idMovie")
    .populate("idCinema")
    .then((showtime) => {
      if (!showtime)
        return Promise.reject({
          status: 404,
          message: "Lịch chiếu không tồn tại!",
        });

      // availableSeatCodes.indexOf(name) === 0 , ghế đã đặt
      //availableSeatCodes.indexOf(name) === -1, chưa ai đặt nên sẽ cho phép đặt
      const availableSeatCodes = showtime.seatList
        .filter((seat) => !seat.isBooked)
        .map((seat) => seat.name);
      console.log("availableSeatCodes", availableSeatCodes);
      let invalidSeat = [];
      //vd a1,2,3 đã đặt; a4,6 chưa đặt
      // availableSeatCodes: a4,6
      // seatcode; ds ghế đang đặt vd a2,4
      // availableSeatCodes.indexOf(name) === -1 (a4 === a4)
      seatCodes.forEach((name) => {
        // console.log(
        //   "availableSeatCodes.indexOf(name)",
        //   availableSeatCodes.indexOf(name)
        // );
        if (availableSeatCodes.indexOf(name) === -1) invalidSeat.push(name);
      });
      if (invalidSeat.length > 0)
        return Promise.reject({
          status: 400,
          message: "Ghế đã được đặt!",
          notAvaiSeat: invalidSeat,
        });
      // Xử lý đặt vé
      newTicket = new MODEL_TICKET({
        idShowtime,
        userId: user,
        // seatCodes ghế đang chọn
        // seatList === seatChecked
        seatList: seatCodes.map((seat) => ({
          isBooked: true,
          name: seat,
        })),
        // seatCodes.length === sluong ghe 
        totalPrice: showtime.ticketPrice * seatCodes.length,
      });

      // showtime.seatList ghế đã bấm đặt
      showtime.seatList = showtime.seatList.map((seat) => {
        // trả về vị trí > -1 : có giá trị
        if (seatCodes.indexOf(seat.name) > -1) {
          seat.isBooked = true;
        }
        return seat;
      });

      Promise.all([newTicket.save(), showtime.save()]);

      // console.log("newTicket", newTicket);
      // res.locals.newTicket = newTicket;
      res.status(201).json({
        status: "success",
        data: newTicket,
      });
      req.ticket = newTicket;
      req.showtime = showtime;
      //dùng req.ticket hay req.showtime đều được
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });

  // const { userName } = req.user;
  const { id, totalPrice, createAt } = req.ticket;
  req.ticket1 = totalPrice;
  const { dateShow } = req.showtime;
  // console.log("req", req);
  let formatDateTimeShow = new Date(dateShow)
    .toLocaleTimeString([], { hour12: false })
    .slice(0, 5);

  let formatDateShow = new Date(dateShow)
    .toLocaleDateString("en-GB")
    .slice(0, 10);
  let formatDateCreateAt = new Date(createAt)
    .toLocaleDateString("en-GB")
    .slice(0, 10);

  let formatDateCreateAtTime = new Date(createAt).toLocaleTimeString();

  let info = await transporter.sendMail({
    from: `"STAR MOVIE " < ${req.body.email}>`, // sender address
    to: req.user.email, // list of receivers
    subject: "EMAIL XÁC NHẬN ĐẶT VÉ THÀNH CÔNG", // Subject line
    // text: "Hello world?", // plain text body
    html: `   <div style="background-color: #ff7f00 ;text-align: center;padding: 10px; border-radius: 10px; width: 80%">
      <div style=" color: white; margin-bottom: 10px;">
            <h3>Chúc mừng bạn!</h3>
            <span>Việc mua vé online của bạn đã thành công. Star Movie xin chân thành cám ơn bạn đã chọn chúng tôi để
                phục vụ nhu cầu giải trí của bạn. Bạn vui lòng xem thông tin đặt vé dưới đây</span>
        </div>
    
            <table style="background-color: #F3E9DD;width: 80%; margin: 0 auto;padding: 20px;text-align: left;">
                <tbody>
                    <tr>
                        <td>Mã vé:</td>
                        <th >${id}</th>
                    </tr>
                    <tr>
                        <td>Phim:</td>
                        <th >
                        
  ${req.showtime.idMovie.name} 
                        </th>
                    </tr>
                    <tr>
                        <td>Rạp:</td>
                        <th >${req.showtime.idCinema.name}</th>
                    </tr>
                    <tr>
                        <td>Thời gian:</td>
                        <th > ${formatDateShow}, ${formatDateTimeShow} ~ ${calculateTimeout(
      dateShow
    )}</th>
                    </tr>
                    <tr>
                        <td>Ghế:</td>
                        <th ><span>${req.body.seatCodes.join(", ")}</span></th>
                    </tr>
                    <tr>
                        <td>Phương thức thanh toán:</td>
                        <th ><b>ZaloPay</b></th>
                    </tr>
                    <tr>
                        <td>Thời gian thanh toán:</td>
                        <th >${formatDateCreateAt}, ${formatDateCreateAtTime}</th>
                    </tr>
                    <tr>
                        <td>Tổng tiền (Total):</td>
                        <th ><span>${totalPrice.toLocaleString(
                          "vi-VI"
                        )} vnđ</span></th>
                    </tr>
                </tbody>

            </table>

</div>
    </div>
                    `,
  });
});
// user đang là admin  <div style="background-color:orange ;text-align: center;padding: 10px; border-radius: 10px;">

const deleteTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const row = await MODEL_TICKET.findByIdAndRemove(id).exec();

    if (!row) {
      return res.status(404).send({ messages: message.NotFound + id });
    }
    return res.status(200).send({ messages: message.DeleteSuccessfully });
  } catch (error) {
    res.status(500).send({ messages: message.DeleteFail });
  }
};

const getAllTicket = catchAsync(async (req, res, next) => {
  const data = await MODEL_TICKET.find().populate([
    "idShowtime",
    "userId",
    // "idSeat",
  ]);

  res.status(200).json({
    status: "success",
    result: data.length,
    data,
  });

});

const payment = async (req, res) => {
   const data = await MODEL_TICKET.find().populate([
     "idShowtime",
     "userId",
     // "idSeat",
   ]);
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5000/api/ticket/success",
      cancel_url: "http://localhost:5000/api/ticket/cancle",
    },
    transactions: [
      {
        // item_list: {
        //   items: [
        //     {
        //       name: "item",
        //       sku: "item",
        //       price: "0.01",
        //       currency: "USD",
        //       quantity: 1,
        //     },
        //   ],
        // },
        amount: {
          currency: "USD",
          total: "0.01",
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      // throw error;
    } else {
      console.log("Create Payment Response");
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
 
   req.diep = data.length;
   console.log(" req.diep ", req.diep);
   const result = data?.length;
   console.log("result", result);
   console.log("data[0]", data[0]);
   console.log("data[1]", data[1]);
   console.log("totalPrice", data[result]?.totalPrice);
   
};

const excute = async (req, res) => {
 
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  console.log("payerId", payerId);
  console.log("paymentId", paymentId);
  var execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "0.01",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        //  console.log("B");
      } else {
        res.redirect("http://localhost:3000/");
        console.log(JSON.stringify(payment));
      }
    }
  );
  // res.render("cancle");
  //       } else {
  //         console.log(JSON.stringify(payment));
  //         res.render("success");
  //       }
};

module.exports = {
  getAllTicket,
  createTicket,
  deleteTicket,
  payment,
  excute,
};

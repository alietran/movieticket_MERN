const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const database = require("./app/config/config.mongoDB");
var bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const cors = require("cors");

// PAYPAL

const paypal = require("paypal-rest-sdk");
const fs = require("fs");

const authRouter = require("./app/routes/auth");
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "./public")));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(express.json());
// app.use("/api/auth",authRouter)
app.use(cors());
require("./app/routes")(app);

// PAYPAL
  paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
      "AbGNy-ejR3p152O7rxJV2IpPKD44PAgmBidvBRxkuADowkKPksjbTSv-vzVPTn4yhLwUMg6cnZ3lK57w",
    client_secret:
      "ELdt4TCsTH1b5SEaDBXHtH7S-CCh-VVvdKwT9vzKK1djpnzRVIA49uJT1jn1zb_mPwrTuRJLd_QPzrha",
  });

  // app.use("/pay", function (req, res) {
  //     console.log("HE");
  //   var create_payment_json = {
  //     intent: "sale",
  //     payer: {
  //       payment_method: "paypal",
  //     },
  //     redirect_urls: {
  //       return_url: "http://localhost:3000/success",
  //       cancel_url: "http://localhost:3000/cancel",
  //     },
  //     transactions: [
  //       {
  //         item_list: {
  //           items: [
  //             {
  //               name: "item",
  //               sku: "item",
  //               price: "1.00",
  //               currency: "USD",
  //               quantity: 1,
  //             },
  //           ],
  //         },
  //         amount: {
  //           currency: "USD",
  //           total: "1.00",
  //         },
  //         description: "This is the payment description.",
  //       },
  //     ],
  //   };
  //   paypal.payment.create(create_payment_json, function (error, payment) {
    
  //     if (error) {
  //       throw error;
  //     } else {
  //       console.log("Create Payment Response");
  //       console.log(payment);
  //     }
  //   });
  // });

 
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

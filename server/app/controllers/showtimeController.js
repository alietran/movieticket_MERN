const { MODEL_SHOWTIME, MODEL_SEATS } = require("../models");
const catchAsync = require("../utils/catchAsync");
const message = require("../constants/message");
const Seat = require("../models/Seat");
const seatType = require("../data/seat.json");

const createShowtime = catchAsync(async (req, res) => {
  const idCinema = req.body.idCinema;
  const idMovie = req.body.idMovie;
  const ticketPrice = req.body.ticketPrice;
  const dateShow = req.body.dateShow;
  //render seatcode = seatList
  let seatCode = [];
  for (let types of seatType) {
    seatCode = types.seatList;
  }

  // render json
  let seatList = [];
  seatCode.map((name) => {
    const seat = new MODEL_SEATS({ name, isBooked: false });
    seatList.push(seat);
  });

  const newShowtime = new MODEL_SHOWTIME({
    idCinema,
    idMovie,
    ticketPrice,
    dateShow,
    seatList,
  });
  newShowtime
    .save()
    .then((data) => {
      // console.log("data", data);
      return res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

const getDetailShowtime = catchAsync(async (req, res) => {
  // const movieId = req.query.idMovie;
  // console.log(movieId)
  const showtime = await MODEL_SHOWTIME.findById(req.params.id).populate([
    "idCinema",
    "idMovie",
  ]);

  res.status(200).json({
    status: "success",
    result: showtime.length,
    showtime,
  });
});

const getAllShowtime = catchAsync(async (req, res) => {
  const showtime = await MODEL_SHOWTIME.find();
  res.status(200).json({
    status: "success",
    result: showtime.length,
    showtime,
  });
});

const deleteShowtime = async (req, res) => {
 
  try {
    const id = req.params.id;
    const row = await MODEL_SHOWTIME.findByIdAndRemove(id).exec();
    if (!row) { 
      return res.status(404).send({ messages: message.NotFound + id });
    }  
    return res.status(200).send({ messages: message.DeleteSuccessfully });
  } catch (error) {
    res.status(500).send({ messages: message.DeleteFail });
  }
};

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
const updateShowtime = catchAsync(async (req, res) => {
  const filteredBody = filterObj(req.body, "idCinema", "idMovie", "ticketPrice","dateShow");

  const updateDetailShowtime = await MODEL_SHOWTIME.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success ",
    content: updateDetailShowtime,
  });
});

module.exports = {
  createShowtime,
  getAllShowtime,
  getDetailShowtime,
  deleteShowtime,
  updateShowtime,
};

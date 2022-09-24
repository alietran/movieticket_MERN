const { MODEL_SEATS } = require("../models");
const catchAsync = require("../utils/catchAsync");
const message = require("../constants/message");


const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
  
    const data = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data,
    });
  });


const getAllSeat = catchAsync(async (req, res) => {
  const data = await MODEL_SEATS.find()
//   .populate([
//     "idCinema",
//     "idMovie",
//   ]);
  res.status(200).json({
    status: "success",
    result: data.length,
    data,
  });
});


module.exports = {
  getAllSeat,
  createOne,
};

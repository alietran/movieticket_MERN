const { MODEL_CINEMAS } = require("../models");
const catchAsync = require("../utils/catchAsync");
const message = require("../constants/message");

const createCinema = catchAsync(async (req, res) => {
  const name = req.body.name;
  const cinemaType = req.body.cinemaType;
  const seatsTotal = req.body.seatsTotal;

  const cinema = new MODEL_CINEMAS({
    name,
    cinemaType,
    // seatsTotal,

  });
  cinema
    .save()
    .then((data) => {
      // console.log("data", data);
      return res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}); 

const getAllCinema = catchAsync(async (req, res) => {
  const cinema = await MODEL_CINEMAS.find();
  res.status(200).json({
    status: "success",
    result: cinema.length,
    cinema,
  });
});

const deleteCinema = async (req, res) => {
  // console.log("a");
  try {
    const id = req.params.id;
    const row = await MODEL_CINEMAS.findByIdAndRemove(id).exec();

    if (!row) {
      console.log(message.NotFound);
      return res.status(404).send({ messages: message.NotFound + id });
    }
    console.log(message.DeleteSuccessfully);
    return res.status(200).send({ messages: message.DeleteSuccessfully });
  } catch (error) {
    res.status(500).send({ messages: message.DeleteFail });
  }
};
const getDetailCinema = async (req, res) => {
  //  console.log("a");
  try {
    const id = req.params.id;
    const data = await MODEL_CINEMAS.findById(id);

    if (!data) {
      console.log(message.NotFound);
      return res.status(404).send({ messages: message.NotFound + id });
    }

    return res.status(200).send({ data });
  } catch (error) {
    res.status(500).send({ messages: error });
  }
};

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
const updateCinema= catchAsync(async (req, res) => {
  const filteredBody = filterObj(
    req.body,
    "name",
    "cinemaType",
    "seatsTotal",
    
  );

  const updateDetailCinema = await MODEL_CINEMAS.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success ",
    content: updateDetailCinema,
  });
});

module.exports = {
  createCinema,
  getAllCinema,
  deleteCinema,
  getDetailCinema,
  updateCinema,
};

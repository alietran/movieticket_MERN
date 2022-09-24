const { MODEL_MOVIES } = require("../models");
const catchAsync = require("../utils/catchAsync");
const message = require("../constants/message");
const multer = require("multer");
const AppError = require("../utils/appError");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/movies");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("Không phải hình ảnh! Vui lòng tải file hình ảnh.", 400),
      false
    );
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const uploadUserPhoto = upload.single("images");

const createMovie = catchAsync(async (req, res) => {
  const path = req.file?.path.replace(/\\/g, "/").substring("public".length);
  const urlImage = `http://localhost:5000${path}`;
  if (req.file) req.body.images = urlImage;

  const name = req.body.name;
  const genre = req.body.genre;
  const trailer = req.body.trailer;
  const premiere = req.body.premiere;
  const durations = req.body.durations;
  const description = req.body.description;
  const comment = req.body.comment;
  const images = req.body.images;

  const movie = new MODEL_MOVIES({
    name,
    genre,
    trailer,
    premiere,
    durations,
    description,
    comment,
    images,
  });
  movie
    .save()
    .then((data) => {
      // console.log("data", data);
      return res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

const getAllMovie = catchAsync(async (req, res) => {
  const movie = await MODEL_MOVIES.find();
  res.status(200).json({
    status: "success",
    result: movie.length,
    movie,
  });
});

const deleteMovie = async (req, res) => {
  // console.log("a");
  try {
    const id = req.params.id;
    const row = await MODEL_MOVIES.findByIdAndRemove(id).exec();

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

const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const content = await query;
    if (!content) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      content,
    });
  });

const getDetailMovie = async (req, res) => {
  //  console.log("a");
  try {
    const id = req.params.id;
    const query = MODEL_MOVIES.findById(id);
    if ({ path: "showtimes" }) query = query.populate({ path: "showtimes" });
    const content = await query;
    if (!content) {
      console.log(message.NotFound);
      return res.status(404).send({ messages: message.NotFound + id });
    }

    return res.status(200).send({ content });
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
const updateMovie = catchAsync(async (req, res) => {
  const filteredBody = filterObj(
    req.body,
    "name",
    "genre",
    "trailer",
    "premiere",
    "durations",
    "description",
    "images"
  );

  const path = req.file?.path.replace(/\\/g, "/").substring("public".length);
  const urlImage = `http://localhost:5000${path}`;
  if (req.file) filteredBody.images = urlImage;
  const updateDetailMovie = await MODEL_MOVIES.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success ",
    content: updateDetailMovie,
  });
});

module.exports = {
  createMovie,
  getAllMovie,
  deleteMovie,
  getDetailMovie,
  updateMovie,
  uploadUserPhoto,
  getOne,
};

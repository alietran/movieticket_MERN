const { MODEL_COMMENTS } = require("../models");
const messages = require("../constants/message");
const catchAsync = require("../utils/catchAsync");
// thêm bình luận
const addComment = async (req, res) => {
  // const idUser = req.idUser;
  // console.log("idUser",idUser);
  // if (req.body.content.trim().length === 0) {
  //   res.status(400).send({ message: "Bình luận không được để trống" });
  // } else {
  // const Comment = new MODEL_COMMENTS({ ...req.body, idUser });
  // Comment.save()
  //   .then((data) =>
  //     res.status(200).send({
  //       data: data,
  //       status: 200,
  //       messages: messages.CreateSuccessfully,
  //     })
  //   )
  //   .catch((error) => {
  //     res.status(500).json(error);
  //   });
  // }
  const newComment = await MODEL_COMMENTS.create(req.body);
  res.status(200).json({
    status: "success",
    //  result: comment.length,
    comment: newComment,
  });
};
const getAllComment = catchAsync(async (req, res) => {
  const comment = await MODEL_COMMENTS.find().populate([
    "userId",
    // "idSeat",
  ]);
  res.status(200).json({
    status: "success",
    result: comment.length,
    comment,
  });
});

module.exports = {
  addComment,
  getAllComment,
};

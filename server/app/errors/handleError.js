const message = require("../constants/message");

const serverError = (err, res) => {
  const response = {
    status: 500,
    err: err,
    messege: message.serverError,
  };
  console.log(response);
  return res.status(500).send(response);
};

const alreadyExistError = (params, res) => {
  const response = {
    status: 400,
    message: message.AlreadyExists + " " + params,
  };
  console.log(response);
  return res.status(400).send(response);
};

const hashPasswordError = (verifyPassword, res) => {
  const response = {
    status: 400,
    messege: verifyPassword.messege,
  };
  console.log(response);
  return res.status(400).send(response);
};
const handleError = {
  serverError,
  alreadyExistError,
  hashPasswordError,
};

module.exports = handleError;

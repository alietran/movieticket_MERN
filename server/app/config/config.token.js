const formatDate = require("../utils/formatDate")

const configToken = {
  secret: "rapchieuphim-secret-key",
  jwtExpiration: formatDate.oneHour,
  jwtRefreshExpiration: formatDate.oneDay
};
module.exports = configToken;
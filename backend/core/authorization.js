const jwt = require("jsonwebtoken");
const UsersModel = require("../main/users/users.model");

const { APP_TOKEN_JWT_KEY = "" } = process.env;

const authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("ERROR_AUTHORIZATION_FAILED");
  }
  const accessToken = authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(accessToken, APP_TOKEN_JWT_KEY);

    const findUser = await UsersModel.findOne({ _id: decoded._id });
    if (!findUser) {
      throw new Error("ERROR_AUTHORIZATION_FAILED");
    }

    req.user = decoded;
    next();
  } catch (error) {
    throw new Error("ERROR_AUTHORIZATION_FAILED");
  }
};

module.exports = authorization;

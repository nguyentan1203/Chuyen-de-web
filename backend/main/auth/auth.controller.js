const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../core/nodemailer");
const { sendResponseSuccess } = require("../../core/commonFuncs");
const UsersModel = require("../users/users.model");

const { APP_TOKEN_JWT_KEY = "", APP_BCRYPT_LIMIT_ROUNDS: rounds } = process.env;

const signIn = async (req, res) => {
  const { Email = "", Password = "" } = req.body;

  const user = await UsersModel.findOne({ Email }).exec();
  if (!user) {
    throw new Error("ERROR_SIGN_IN_FAILED");
  }

  const isValid = await bcrypt.compare(Password, user.Password);
  if (!isValid) {
    throw new Error("ERROR_SIGN_IN_FAILED");
  }

  const accessToken = jwt.sign({ ...user._doc }, APP_TOKEN_JWT_KEY, {
    expiresIn: "30d",
  });

  return sendResponseSuccess(res, {
    results: {
      data: { user, accessToken },
    },
  });
};

const signUp = async (req, res) => {
  const { Email = "", Password = "" } = req.body;

  const user = await UsersModel.findOne({ Email }).exec();
  if (user) {
    throw new Error("ERROR_SIGN_UP_EXISTED");
  }

  const data = {
    Email,
    Password: await bcrypt.hash(Password, Number(rounds)),
  };
  const created = await new UsersModel(data).save();

  sendEmail(
    Email,
    "Đăng ký thành công | React Recruit.",
    "<h3>Chào mừng bạn đến với ứng dụng React Recruit. 😜</h3>"
  );

  return sendResponseSuccess(res, {
    results: {
      data: created,
      insertId: created._id,
      rowsAffected: created ? 1 : 0,
    },
  });
};

module.exports = { signIn, signUp };

const bcrypt = require("bcrypt");
const { sendResponseSuccess } = require("../../core/commonFuncs");
const UsersModel = require("./users.model");
const sendEmail = require("../../core/nodemailer");

const { APP_LIMIT_DEFAULT_LIMIT, APP_BCRYPT_LIMIT_ROUNDS: rounds } = process.env;

/* Users */

const getUsers = async (req, res) => {
  const { ids } = req.params;
  const {
    page: defaultPage,
    pageSize: defaultPageSize,
    order = "desc",
    orderby = "updated_at",
    loadAll = false,
    loadMore = false,
  } = req.query;

  const page = Number(defaultPage) || 1;
  const pageSize = Number(defaultPageSize) || Number(APP_LIMIT_DEFAULT_LIMIT);

  let pagination = {};

  if (loadAll) {
    pagination = {};
  } else if (loadMore) {
    pagination = {
      limit: pageSize * page,
    };
  } else {
    pagination = {
      skip: pageSize * (page - 1),
      limit: pageSize,
    };
  }

  const search = {
    ...(ids ? { _id: { $in: ids } } : {}),
  };

  const items = await UsersModel.find(
    search,
    {},
    { ...pagination, sort: { [orderby]: order } }
  );
  const total = await UsersModel.countDocuments(search);

  const pageTotal = Math.ceil(total / pageSize);
  const nextPage = page >= pageTotal ? null : page + 1;
  const previousPage = page <= 1 ? null : page - 1;

  const data = {
    items,
    pagination: loadAll
      ? null
      : {
          total,
          page,
          pageSize,
          pageTotal,
          nextPage,
          previousPage,
        },
  };

  return sendResponseSuccess(res, { results: { data } });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleted = await UsersModel.findByIdAndDelete(id);

  return sendResponseSuccess(res, {
    results: {
      data: deleted,
      rowsAffected: deleted ? 1 : 0,
    },
  });
};

const changePassword = async (req, res) => {
  const { OldPassword, NewPassword } = req.body;
  const user = req.user;

  const findUser = await UsersModel.findById(user._id);
  if (!findUser) {
    throw new Error("ERROR_USER_NOT_FOUND");
  }

  const isMatch = await bcrypt.compare(OldPassword, findUser.Password);
  if (!isMatch) {
    throw new Error("ERROR_SIGN_IN_WRONG_PASSWORD");
  }

  findUser.Password = await bcrypt.hash(NewPassword, Number(rounds));
  await findUser.save();

  return sendResponseSuccess(res, { results: { data: user } });
};

module.exports = { getUsers, deleteUser, changePassword };

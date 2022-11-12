const { sendResponseSuccess } = require("../../core/commonFuncs");
const UsersModel = require("../users/users.model");
const PostsModel = require("../posts/posts.model");
const AppliesModel = require("./applies.model");
const sendEmail = require("../../core/nodemailer");

const getApplies = async (req, res) => {
  const { ids } = req.params;
  const {
    search: defaultSearch = {},
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
    ...defaultSearch,
  };

  const items = await AppliesModel.find(
    search,
    {},
    { ...pagination, sort: { [orderby]: order } }
  ).populate("User_Ref");
  const total = await AppliesModel.countDocuments(search);

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

const createApply = async (req, res) => {
  const user = req.user;

  const created = await AppliesModel.create({
    ...req.body,
    User_Ref: user?._id,
    CurriculumVitae: req.file.path.replaceAll("\\", "/"),
  });

  if (user) {
    const findUser = await UsersModel.findById(user._id);
    if (findUser) {
      await findUser.updateOne({ $push: { Applies_Ref: created._id } });
    }
  }

  const findPost = await PostsModel.findById(req.body.Post_Ref);
  await findPost.updateOne({ $push: { Applies_Ref: created._id } });

  const postUser = await UsersModel.findById(findPost.User_Ref);
  if (postUser) {
    sendEmail(
      postUser.Email,
      `${created.Name.toUpperCase()} | Ứng tuyển.`,
      `Thông tin ứng tuyển mới.
      <br />
      Tên: ${created.Name}.
      <br />
      Email: ${created.Email}.
      <br />
      CV: http://localhost:4000/${created.CurriculumVitae}.
      <br />
      Mô tả: ${created.Description}`
    );
  }

  return sendResponseSuccess(res, {
    results: {
      data: created,
      insertId: created._id,
      rowsAffected: created ? 1 : 0,
    },
  });
};

module.exports = { getApplies, createApply };

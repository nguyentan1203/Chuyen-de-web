const router = require("express-promise-router")();
const authorization = require("../../core/authorization");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("./posts.controller");

router.get("/", getPosts);
router.post("/", authorization, createPost);
router.get("/:id", getPost);
router.put("/:id", authorization, updatePost);
router.delete("/:id", authorization, deletePost);

module.exports = router;

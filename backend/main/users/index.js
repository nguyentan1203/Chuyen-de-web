const router = require("express-promise-router")();
const authorization = require("../../core/authorization");
const { getUsers, deleteUser, changePassword } = require("./users.controller");

router.get("/", authorization, getUsers);
router.delete("/:id", authorization, deleteUser);
router.put("/change-password", authorization, changePassword);

module.exports = router;

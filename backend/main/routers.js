const router = require("express-promise-router")();

router.use("/", require("./auth"));
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/applies", require("./applies"));

router.get("/500", () => {
  throw {};
});

module.exports = router;

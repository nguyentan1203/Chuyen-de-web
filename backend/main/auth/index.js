const router = require("express-promise-router")();
const { signIn, signUp } = require("./auth.controller");

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);

module.exports = router;

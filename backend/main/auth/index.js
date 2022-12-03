const router = require("express-promise-router")();
const {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
} = require("./auth.controller");

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;

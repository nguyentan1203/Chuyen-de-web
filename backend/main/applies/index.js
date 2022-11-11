const multer = require('multer');
const router = require("express-promise-router")();
const { getApplies, createApply } = require("./applies.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getApplies);
router.post("/", upload.single("file"), createApply);

module.exports = router;

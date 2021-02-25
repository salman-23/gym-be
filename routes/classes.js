const express = require("express");
const {
  // classUpdate,
  classList,
  // classDelete,
  fetchClass,
  classDetail,
} = require("../controllers/classControllers");
const passport = require("passport");

const router = express.Router();
const upload = require("../middleware/multer");

router.param("classId", async (req, res, next, classId) => {
  const foundClass = await fetchClass(classId, next);
  if (foundClass) {
    req.class = foundClass;
    next();
  } else {
    next({
      status: 404,
      message: "Class Not Found",
    });
  }
});

//Class List Route
router.get("/", classList);

//Class Detial Route
router.get("/:classId", classDetail);

//Class Delete Route
// router.delete(
//   "/:classId",
//   passport.authenticate("jwt", { session: false }),
//   classDelete
// );

module.exports = router;

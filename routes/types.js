const express = require("express");
const {
  // typeUpdate,
  typeList,
  typeDetail,
  // typeDelete,
  typeCreate,
  fetchType,
  classCreate,
} = require("../controllers/typeControllers");
const passport = require("passport");

const router = express.Router();
const upload = require("../middleware/multer");

router.param("typeId", async (req, res, next, typeId) => {
  const foundType = await fetchType(typeId, next);
  if (foundType) {
    req.type = foundType;
    next();
  } else {
    next({
      status: 404,
      message: "Type Not Found",
    });
  }
});

//Type List Route
router.get("/", typeList);

//Type Detial Route
router.get("/:typeId", typeDetail);

//Type Create Route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  typeCreate
);

//Class Create Route
// router.post(
//   "/:typeId/classes",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   classCreate
// );

//Type Update Route
// router.put(
//   "/:typeId",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   typeUpdate
// );

//Type Delete Route
// router.delete(
//   "/:typeId",
//   passport.authenticate("jwt", { session: false }),
//   typeDelete
// );

module.exports = router;

const express = require("express");
const {
  // gymUpdate,
  gymList,
  gymDetail,
  // gymDelete,
  gymCreate,
  fetchGym,
  classCreate,
} = require("../controllers/gymControllers");
const passport = require("passport");

const router = express.Router();
const upload = require("../middleware/multer");

router.param("gymId", async (req, res, next, gymId) => {
  const foundGym = await fetchGym(gymId, next);
  if (foundGym) {
    req.gym = foundGym;
    next();
  } else {
    next({
      status: 404,
      message: "Gym Not Found",
    });
  }
});

//Gym List Route
router.get("/", gymList);

//Gym Detial Route
router.get("/:gymId", gymDetail);

//Gym Create Route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  gymCreate
);

//Class Create Route
router.post(
  "/:gymId/classes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  classCreate
);

//Gym Update Route
// router.put(
//   "/:gymId",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   gymUpdate
// );

//Gym Delete Route
// router.delete(
//   "/:gymId",
//   passport.authenticate("jwt", { session: false }),
//   gymDelete
// );

module.exports = router;

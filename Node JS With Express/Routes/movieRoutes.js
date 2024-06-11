const express = require("express");
const movoiesController = require("./../Controllers/moviesController");

const router = express.Router(); //Here it is returning router middleware

// router.param("id", (req, res, next, value) => {
//   console.log("Movie ID is " + value);
//   next();
// });

router.param("id", movoiesController.checkId);

router
  .route("/")
  .get(movoiesController.getAllMovies)
  .post(movoiesController.createMovie);

router
  .route("/:id")
  .get(movoiesController.getMovie)
  .patch(movoiesController.updateMovie)
  .delete(movoiesController.deletMovie);

module.exports = router;

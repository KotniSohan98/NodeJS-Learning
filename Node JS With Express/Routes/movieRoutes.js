const express = require("express");
const movoiesController = require("./../Controllers/moviesController");

const router = express.Router(); //Here it is returning router middleware

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

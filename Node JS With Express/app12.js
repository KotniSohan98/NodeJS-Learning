//Chaining Mulltiple Middleware
const express = require("express");
const movieRouter = require("./Routes/movieRoutes");

const morgan = require("morgan");

let app = express();

const logger = (req, res, next) => {
  console.log("Custom Middleware logged!");
  next();
};

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

// //GET - api/movies
// app.get("/api/v1/movies", getAllMovies);

// //GET - api/v1/movies/id
// app.get("/api/v1/movies/:id", getMovie);

// //PATCH - api/v1/movies/id
// app.patch("/api/v1/movies/:id", updateMovie);

// //POST - api/movies
// app.post("/api/v1/movies", createMovie);

// //DELETE - api/v1/movies
// app.delete("/api/v1/movies/:id", deletMovie);

// Another format

app.use("/api/v1/movies", movieRouter);

//create a server
const port = 5000;
app.listen(port, () => {
  console.log("Server Started!");
});

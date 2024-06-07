//API Handling: GET request
const express = require("express");
const fs = require("fs");

let app = express();
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

//GET - api/movies
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "sucess",
    count: movies.length,
    data: {
      movies: movies,
    },
  });
});

//create a server
const port = 5000;
app.listen(port, () => {
  console.log("Server Started!");
});

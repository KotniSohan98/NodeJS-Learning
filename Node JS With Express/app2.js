//API Handling: POST request
const express = require("express");
const fs = require("fs");

let app = express();
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

app.use(express.json());

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

//POST - api/movies
app.post("/api/v1/movies", (req, res) => {
  //console.log(req.body);
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
  //   res.send("Created");
});

//create a server
const port = 5000;
app.listen(port, () => {
  console.log("Server Started!");
});

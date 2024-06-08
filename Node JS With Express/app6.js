//Refactor all route Handler functions
const express = require("express");
const fs = require("fs");

let app = express();
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

app.use(express.json());

//Route Handlier functions
const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "sucess",
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

const getMovie = (req, res) => {
  //   console.log(req.params);
  //Convert ID string to number type
  const id = req.params.id * 1;
  //Find movie based on ID parameter
  let movie = movies.find((el) => el.id === id);

  //Particular ID movie not there then send failed status
  if (!movie) {
    return res.status(404).json({
      status: "Failed",
      message: "Movie with ID " + id + " is not found",
    });
  }

  //send particular Id movie in the response
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });

  //   res.send("Testted!");
};

const updateMovie = (req, res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === id);

  if (!movieToUpdate) {
    return res.status(404).json({
      status: "Failed",
      message: "Movie with ID " + id + " is not found",
    });
  }

  let index = movies[movieToUpdate];

  Object.assign(movieToUpdate, req.body);

  movies[index] = movieToUpdate;

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "Succuess",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

const createMovie = (req, res) => {
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
};

const deletMovie = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const movieToDelete = movies.find((el) => el.id === id);

  if (!movieToDelete) {
    return res.status(404).json({
      status: "Failed",
      message: "Movie with ID " + id + " is not found",
    });
  }

  const index = movies.indexOf(movieToDelete);

  movies.splice(index, 1);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};

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

app.route("/api/v1/movies").get(getAllMovies).post(createMovie);
app
  .route("/api/v1/movies/:id")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deletMovie);

//create a server
const port = 5000;
app.listen(port, () => {
  console.log("Server Started!");
});

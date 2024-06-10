const fs = require("fs");

let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

//Route Handlier functions
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "sucess",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

exports.getMovie = (req, res) => {
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

exports.updateMovie = (req, res) => {
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
exports.createMovie = (req, res) => {
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

exports.deletMovie = (req, res) => {
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

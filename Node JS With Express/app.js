const express = require("express");

let app = express();

//ROUTE = HTTP Method + URL
app.get("/", (req, res) => {
  //   res.send("Hello World!");
  //   res.send("<h1>Hello World!</h1>");
  res.status(200).send("<h1>Hello World!</h1>");
  //   res.status(200).json({ message: "Hello World!", status: 200 });
});

//create a server
const port = 5000;
app.listen(port, () => {
  console.log("Server Started!");
});

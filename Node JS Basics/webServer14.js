//Understanding Streams in Practice.
const protocol = require("http");
const fs = require("fs");

const server = protocol.createServer();
//Solution 1: Without Readable or writable streams
// server.on("request", (req, res) => {
//   fs.readFile("./Files/large-file.txt", (err, data) => {
//     if (err) {
//       res.end("Something went wrong!");
//       return;
//     }
//     res.end(data);
//   });
// });

//Solution 2: Using Readable and Writable stream

// server.on("request", (req, res) => {
//
//   let rs = fs.createReadStream("./Files/large-file.txt");
//   rs.on("data", (chunk) => {
//     // console.log("Reading Data");
//     res.write(chunk);
//     res.write("----------------------------------------------------");
//   });
//   rs.on("end", () => {
//     res.end();
//     console.log("Response End");
//   });
//   rs.on("error", (error) => {
//     res.end(error.message);
//   });
// });

//Solution 3: Using Pipe method
server.on("request", (req, res) => {
  let rs = fs.createReadStream("./Files/large-file.txt");
  rs.pipe(res);
});

server.listen(5000, () => {
  console.log("Server Started!");
});

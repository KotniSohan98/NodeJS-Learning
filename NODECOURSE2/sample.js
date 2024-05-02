let protocol = require("http");
protocol
  .createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("Hello first Node App...");
  })
  .listen(5000, () => console.log("Server started at port:5000"));

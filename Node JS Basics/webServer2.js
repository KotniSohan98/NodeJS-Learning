const fs = require("fs");
const protocol = require("http");
const html = fs.readFileSync("./Templates/index.html", "utf-8");
//create and start server
const server = protocol
  .createServer((request, response) => {
    response.end(html);
    console.log("A new request received");
  })
  .listen(5000, () => {
    console.log("Server Started");
  });

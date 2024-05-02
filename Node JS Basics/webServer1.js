const protocol = require("http");
//step1: Create a Server
const server = protocol.createServer((request, response) => {
  //   response.end("Hello from the server");
  response.end("<h1>This is Home Page</h1>");
  console.log("A new request has received");
});

//Step2: Start the server
server.listen(5000, () => {
  console.log("Server Started");
});

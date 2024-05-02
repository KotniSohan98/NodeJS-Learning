//Working with JSON data
const protocol = require("http");
const fs = require("fs");
const html = fs.readFileSync("./Templates/index1.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
const server = protocol
  .createServer((request, response) => {
    let path = request.url;
    if (path === "/" || path.toLocaleLowerCase() === "/home") {
      response.writeHead(200, {
        "Content-Type": "text/html",
        "my-header": "Hello World",
      });
      response.end(html.replace("{{%CONTENT%}}", "You are in Home Page"));
    } else if (path.toLocaleLowerCase() === "/about") {
      response.writeHead(200, {
        "Content-Type": "text/html",
        "my-header": "Hello World",
      });
      response.end(html.replace("{{%CONTENT%}}", "You are in About Page"));
    } else if (path.toLocaleLowerCase() === "/contact") {
      response.writeHead(200, {
        "Content-Type": "text/html",
        "my-header": "Hello World",
      });
      response.end(html.replace("{{%CONTENT%}}", "You are in Contact Page"));
    } else if (path.toLocaleLowerCase() === "/products") {
      response.writeHead(200, { "Content-Type": "application/json" });
      //   fs.readFile("./Data/products.json", "utf-8", (error, data) => {
      //     response.end(data);
      //   });
      response.end("you are in products page");
      console.log(products);
    } else {
      response.writeHead(404, {
        "Content-Type": "text/html",
        "my-header": "Hello World",
      });
      response.end(html.replace("{{%CONTENT%}}", "Error:404 Page Not Found!"));
    }
  })
  .listen(5000, () => {
    console.log("Server Started");
  });

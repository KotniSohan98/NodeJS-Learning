const protocol = require("http");
const fs = require("fs");
const html = fs.readFileSync("./Templates/index1.html", "utf-8");
const server = protocol
  .createServer((request, response) => {
    let path = request.url;
    if (path === "/" || path.toLocaleLowerCase() === "/home") {
      response.end(html.replace("{{%CONTENT%}}", "You are in Home Page"));
    } else if (path.toLocaleLowerCase() === "/about") {
      response.end(html.replace("{{%CONTENT%}}", "You are in About Page"));
    } else if (path.toLocaleLowerCase() === "/contact") {
      response.end(html.replace("{{%CONTENT%}}", "You are in Contact Page"));
    } else {
      response.end(html.replace("{{%CONTENT%}}", "Error:404 Page Not Found!"));
    }
  })
  .listen(5000, () => {
    console.log("Server Started");
  });

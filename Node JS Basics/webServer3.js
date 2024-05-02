const protocol = require("http");
const server = protocol
  .createServer((req, res) => {
    let path = req.url;
    // res.end(path);
    if (path === "/" || path.toLocaleLowerCase() === "/home") {
      res.end("You are in Home Page");
    } else if (path.toLocaleLowerCase() === "/about") {
      res.end("You are in About Page");
    } else if (path.toLocaleLowerCase() === "/contact") {
      res.end("You are in contact page");
    } else {
      res.end("Error 404: Page not found");
    }
  })
  .listen(5000, () => console.log("Server Started"));

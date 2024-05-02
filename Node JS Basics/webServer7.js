//Working with JSON data
const protocol = require("http");
const fs = require("fs");
const html = fs.readFileSync("./Templates/index1.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
let productListHtml = fs.readFileSync("./Templates/product-list.html", "utf-8");
let productHtmlArray = products.map((prod) => {
  let output = productListHtml.replace("{{%IMAGE%}}", prod.productImage);
  output.replace("{{%NAME%}}", prod.name);
  output = output.replace("{{%MODELNAME%}}", prod.modeName);
  output = output.replace("{{%MODELNO%}}", prod.modelNumber);
  output = output.replace("{{%SIZE%}}", prod.size);
  output = output.replace("{{%CAMERA%}}", prod.camera);
  output = output.replace("{{%PRICE%}}", prod.price);
  output = output.replace("{{%COLOR%}}", prod.color);
  output = output.replace("{{%ID%}}", prod.id);
  output = output.replace("{{%ROM%}}", prod.ROM);
  output = output.replace("{{%DESC%}}", prod.Description);

  return output;
});
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
      let productResponseHtml = html.replace(
        "{{%CONTENT%}}",
        productHtmlArray.join(",")
      );
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(productResponseHtml);
      //   console.log(productHtmlArray.join(","));
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

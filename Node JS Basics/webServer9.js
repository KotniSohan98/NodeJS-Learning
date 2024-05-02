//Parsing Querry String from URL.
const protocol = require("http");
const fs = require("fs");
const url = require("url");

const html = fs.readFileSync("./Templates/index1.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
let productListHtml = fs.readFileSync("./Templates/product-list.html", "utf-8");
let productDetailsHtml = fs.readFileSync(
  "./Templates/product-details.html",
  "utf-8"
);

function replaceHtml(template, product) {
  let output = template.replace("{{%IMAGE%}}", product.productImage);
  output = output.replace("{{%NAME%}}", product.name);
  output = output.replace("{{%MODELNAME%}}", product.modeName);
  output = output.replace("{{%MODELNO%}}", product.modelNumber);
  output = output.replace("{{%SIZE%}}", product.size);
  output = output.replace("{{%CAMERA%}}", product.camera);
  output = output.replace("{{%PRICE%}}", product.price);
  output = output.replace("{{%COLOR%}}", product.color);
  output = output.replace("{{%ID%}}", product.id);
  output = output.replace("{{%ROM%}}", product.ROM);
  output = output.replace("{{%DESC%}}", product.Description);

  return output;
}
const server = protocol
  .createServer((request, response) => {
    // let x = url.parse(request.url, true);
    // console.log(x);
    let { query, pathname: path } = url.parse(request.url, true);
    // console.log(x);
    // let path = request.url;
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
      if (!query.id) {
        let productHtmlArray = products.map((prod) => {
          return replaceHtml(productListHtml, prod);
        });
        // console.log(productHtmlArray);
        let productResponseHtml = html.replace(
          "{{%CONTENT%}}",
          productHtmlArray.join(",")
        );
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(productResponseHtml);
        //   console.log(productHtmlArray.join(","));
      } else {
        let prod = products[query.id];
        // console.log(prod);
        let productDetailsResponseHtml = replaceHtml(productDetailsHtml, prod);
        response.end(html.replace("{{%CONTENT%}}", productDetailsResponseHtml));
      }
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

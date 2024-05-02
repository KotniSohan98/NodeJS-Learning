const fs = require("fs");

//reading file:
let textIn = fs.readFileSync("./Files/input.txt", "utf-8");
console.log(textIn);

//writing a file:
let content = `Data read from input.txt: ${textIn}. \nData Created ${new Date()}`;
fs.writeFileSync("./Files/output.txt", content);

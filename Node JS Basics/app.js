const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Please enter your name: ", (name) => {
  console.log("You enterd your name: " + name);
  rl.close();
});
rl.on("close", () => {
  console.log("Interface is closed");
  process.exit(0);
});

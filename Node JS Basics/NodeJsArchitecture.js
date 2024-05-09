//Event Loop in practice

//Example 1:

const fs = require("fs");

// console.log("Program has started");

// // Stored in 1st phase
// setTimeout(() => {
//   console.log("Timer callback executed");
// }, 0);

// //Stored in 2nd phase
// fs.readFile("./Files/input.txt", () => {
//   console.log("File Read complete!");
// });

// // Stored in 3rd phase
// setImmediate(() => {
//   console.log("SetImmediate callback exectued");
// });
// console.log("Program has completed");

//Example 2:

console.log("Program has started");

//Stored in 2nd phase
fs.readFile("./Files/input.txt", () => {
  console.log("File Read complete!");
  // Stored in 1st phase
  setTimeout(() => {
    console.log("Timer callback executed");
  }, 0);

  // Stored in 3rd phase
  setImmediate(() => {
    console.log("SetImmediate callback exectued");
  });
  process.nextTick(() => {
    console.log("process.nextTick callback exctuted");
  });
});

console.log("Program has completed");

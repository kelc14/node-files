// native
const fs = require("fs");
const process = require("process");

// installs
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(data);
  });
}

// this allows us to specify the path from the command line
// cat(process.argv[2]);

async function webCat(url) {
  try {
    response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

//  check the second arg given, if it starts with http then it is a url, so run webCat. otherwise run cat

let userInput = process.argv[2].slice(0, 4);
// console.log(userInput);
if (userInput === "http") {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}

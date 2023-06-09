const fs = require("fs");

const process = require("process");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error reading file");
      console.error(err);
      process.exit(1);
    }
    console.log(data);
  });
}

// this allows us to specify the path from the command line
cat(process.argv[2]);

// native
const fs = require("fs");
const process = require("process");

// installs
const axios = require("axios");

// function to read a file and log contents in the terminal
// $ node step3.js one.txt
// This is file one.
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
// $ node step3.js http://google.com
// <!doctype html><html ...

async function webCat(url) {
  try {
    response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console.
// $ node step3.js --out new.txt one.txt
// $ # no output, but new.txt contains contents of one.txt

// $ node step3.js --out new.txt  http://google.com
// $ # no output, but new.txt contains google's HTML

function catWrite(output, readfile) {
  try {
    // use the synchronous version here, otherwise the "writefile" happens before this is finished being read
    let content = fs.readFileSync(readfile, "utf8");
    writeContents(output, content);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function webCatWrite(output, readfile) {
  try {
    resp = await axios.get(readfile);
    let content = resp.data;
    writeContents(output, content);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function writeContents(output, content) {
  fs.writeFile(`./${output}`, content, "utf-8", function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
}

//  check the second arg given, if it starts with http then it is a url, so run webCat. otherwise run cat

if (process.argv[2] === "--out") {
  if (process.argv[4].slice(0, 4) === "http") {
    webCatWrite(process.argv[3], process.argv[4]);
  } else {
    catWrite(process.argv[3], process.argv[4]);
  }
} else {
  let userInput = process.argv[2].slice(0, 4);
  if (userInput === "http") {
    // console.log(userInput);
    webCat(process.argv[2]);
  } else {
    cat(process.argv[2]);
  }
}

const { createServer } = require("node:http");
const { readFile } = require("node:fs");
const { join, extname } = require("node:path");

const hostname = "127.0.0.1";
const port = 8080;

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
  "/styles.css": "styles.css"
};

const filePath = join(__dirname, "/about.html");
console.log(filePath);

const server = createServer((req, res) => {
  const url = req.url;

  if (routes[url]) {
    const filePath = join(__dirname, routes[url]);

    let contentType = "text/html"
    if (extname(filePath) === ".css"){
      contentType = "text/css"
    }

    readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      res.end(data);
    });
  } else {
    const filePath = join(__dirname, "404.html");

    readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("404 Not Found");
        return;
      }
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

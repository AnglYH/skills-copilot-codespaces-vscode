// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
var server = http.createServer(function(request, response) {
  var urlObj = url.parse(request.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, 'Not Found');
        response.end('404 Not Found');
      }
      response.writeHead(200, 'OK');
      response.end(data);
    });
  } else if (pathname === '/addComment') {
    var comment = urlObj.query;
    comments.push(comment);
    response.writeHead(200, 'OK');
    response.end(JSON.stringify(comments));
  } else {
    var filePath = path.join(__dirname, pathname);
    fs.readFile(filePath, function(err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, 'Not Found');
        response.end('404 Not Found');
      }
      response.writeHead(200, 'OK');
      response.end(data);
    });
  }
});
server.listen(8080, function() {
  console.log('Server is running at http://localhost:8080');
});
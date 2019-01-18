var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var x = 20
  var y = -20

  res.write(''+x+'+'+y+'='+(x+y)+'\n');
  res.end('Hello Http');
}).listen(3000);

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var x = 20
  var y = -20

  res.write('<!DOCTYPE html>\n'+
  '<HTML>\n' + 
  '<HEAD>\n' +
      '<TITLE>\n'+
        ' Hi\n' +
     ' </TITLE>\n'+
  ' </HEAD>\n'+
  '<BODY>\n'+
  +x+'+'+y+'='+(x+y)+'\n'+
   '</BODY>\n'+
          ' </HTML>');
  res.end('Hello Http');
}).listen(3000);


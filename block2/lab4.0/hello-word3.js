  var http = require('http');
  var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('<!DOCTYPE html>\n'+
    '<HTML>\n' + '<HEAD>\n' +
    '<TITLE>\n'+ ' Hi\n' +
    '</TITLE>\n'+ ' </HEAD>\n'+
    '<BODY>\n'+
    '<table>'+
         '<tr><td>' + 'Table' + '</td><td>' +'Brown'+'</td><td>' + 
         '<tr><td>' +'Table'+ '</td><td>' +'Brown'+'</td><td>' + 
         '<tr><td>' +'Cupboard'+ '</td><td>' +'Red'+'</td><td>' + 
	 '<tr><td>' +'Chair'+ '</td><td>' +'Green'+'</td><td>' + 
	 '<tr><td>' +'Table'+ '</td><td>' +'Brown'+'</td><td>' + 
	 '<tr><td>' +'Cupboard'+ '</td><td>' +'White'+'</td><td>' + 
	 '<tr><td>' +'Chair'+ '</td><td>' +'White'+'</td><td>' + 
	 '<tr><td>' +'Table'+ '</td><td>' +'Green'+'</td><td>' + 
	 '<tr><td>' +'Cupboard'+ '</td><td>' +'Red'+'</td><td>' + 
	 '<tr><td>' +'Shelf'+ '</td><td>' +'Green'+'</td><td>' + 
	 '<tr><td>' +'Table'+ '</td><td>' +'Green'+'</td><td>' + 
	 '<tr><td>' +'Shelf'+ '</td><td>' +'White'+'</td><td>' +
	 '<tr><td>' +'Chair'+ '</td><td>' +'White'+'</td><td>' +
	 '<tr><td>' +'Table'+ '</td><td>' +'Red'+'</td><td>' + 
     '</table>'+
    '</BODY>\n'+'</HTML>');
   res.end('end');
}).listen(3000);


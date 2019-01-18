var http = require('http');
var fs = require('fs');
var urlapi = require('url'); 

var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints:['127.0.0.1'], localDataCenter: 'datacenter1'});

function createDb() {
	client.connect()
		.then(function() {
			const query = "CREATE KEYSPACE IF NOT EXISTS furnitures WITH replication =" +
				"{'class': 'SimpleStrategy', 'replication_factor': '1' }";

			return client.execute(query);
		})
		.then(function() {
			const query = "USE furnitures";
			return client.execute(query);
		})
		.then(function() {
			const query = "CREATE TABLE IF NOT EXISTS furniture " +
				"(id int, name TEXT, color TEXT, price int, PRIMARY KEY (ID))";
			return client.execute(query);
		})
		.then(function() {
			var query = "INSERT INTO furniture (ID, name, color, price) VALUES (?, ?, ?, ?)";

			params = [1, "Table", "red", 13283];
			client.execute(query, params, {
				prepare: true
			});
			params = [2, "Cupboard", "white", 2424];
			client.execute(query, params, {
				prepare: true
			});
			params = [3, "Door", "black", 6565];
			client.execute(query, params, {
				prepare: true
			});
			params = [4, "Table", "white", 5757];
			client.execute(query, params, {
				prepare: true
			});
			params = [5, "Table", "black", 3443];
			client.execute(query, params, {
				prepare: true
			});
			params = [6, "Cupboard", "brown", 5454];
			client.execute(query, params, {
				prepare: true
			});
			params = [7, "Table", "black", 56577];
			client.execute(query, params, {
				prepare: true
			});
			params = [8, "Shelf", "brown", 76666];
			client.execute(query, params, {
				prepare: true
			});
			params = [9, "Door", "brown", 3333];
			client.execute(query, params, {
				prepare: true
			});
			params = [10, "Shelf", "white", 443243];
			client.execute(query, params, {
				prepare: true
			});
		});
	return client;
}

http.createServer(function(req,res){
	client = createDb();
	console.log("request: "+ req.url);
	var component = urlapi.parse('http://localhost:3000'+req.url);
	switch(component.pathname){
		case "/": 
			fs.readFile("./index.html", function(err, content){
				if(!err){
					res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
					res.end(content,"utf-8");
				}
				else{
					res.writeHead(500,{"Content-Type":"text/html; charset=utf-8"});
					res.end(err.message,"utf-8");
					console.log(err);
				}
			});
			break;
		case "/call1":
				res.writeHead (200, {'Content-Type': 'text/plain; charset = utf-8'});
				color = component.query.slice(component.query.indexOf("=")+1)
				console.log(color)
    			client.execute("SELECT * FROM furniture WHERE color LIKE'" + color + "'", function (err, result) {
				if(err) {
					res.write ("<div style = 'font-size:30px; color:red'>");
					console.log("ERR1")
				}
				else {
					res.write("<table>\n");
					res.write ("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
					for(var i = 0; i < result.rows.length; ++i) {
						res.write("<tr><td>"+result.rows[i].name+"</td><td>"+result.rows[i].color+"</td><td>"+result.rows[i].price+"</td></tr>\n");
					}
					res.write("</table>\n");
				}
				res.end();
			});
			break;
			
		case "/call2":
				res.writeHead (200, {'Content-Type': 'text/plain; charset = utf-8'});
				client.execute("SELECT * FROM furniture", function (err, result) {
				if(err) {
					res.write("<div style = 'font-size:30px; color:red'>");
					console.log("ERR2")
				}
				else {
					res.write("<table>\n");
					res.write ("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
					for(var i = 0; i < result.rows.length; ++i) {
						res.write("<tr><td>"+result.rows[i].name+"</td><td>"+result.rows[i].color+"</td><td>"+result.rows[i].price+"</td></tr>\n");
					}
					res.write("</table>\n");
				}
				res.end();
			});
			break;
		
		default:
			res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
			res.write('<!DOCTYPE html>\n' +
			'<html>\n'+
			'<head>\n'+
			'<meta charset=\'utf-8\'>\n' +
			'</head>\n' +
			'<body>\n'
			);
			res.write("404, NOT FOUND: " + req.url);
			res.write(
				'</body>\n'+
				'</html>\n'
			);	
	}
}).listen(3000);
var http=require("http");
var fs = require("fs");
var url = require("url");

var sqlite3=require("sqlite3").verbose();
var db = new sqlite3.Database("furniture.db");

// db.run("CREATE TABLE IF NOT EXISTS Furniture (name TEXT, color TEXT, price int)");

// var stmt=db.prepare("INSERT INTO Furniture VALUES(?,?,?)");
// stmt.run("Table", "brown", 3000);
// stmt.run("Shelf", "green", 500);
// stmt.run("Chair", "red", 400);
// stmt.run("Cupboard", "blue", 8000);
// stmt.run("Door", "grey", 20000);
// stmt.run("Chair", "white", 1000);
// stmt.run("Chair", "yellow", 900);
// stmt.run("Cupboard", "brown", 3500);
// stmt.run("Shelf", "grey", 3000);
// stmt.run("Table", "green", 9000);
// stmt.run("Door", "blue", 900);
// stmt.run("Shelf", "yellow", 1000);
// stmt.run("Table", "white", 2000);
// stmt.run("Door", "black", 100000);
// stmt.run("Chair", "brown", 780);
// stmt.run("Shelf", "red", 5578);
// stmt.run("Table", "white", 3534);
// stmt.run("Cupboard", "yellow", 7000);
// stmt.run("Table", "red", 200);
// stmt.run("Door", "brown", 1313);
// stmt.run("Shelf", "green", 300);
// stmt.run("Shelf", "grey", 600);
// stmt.run("Chair", "blue", 2222);
// stmt.run("Cupboard", "blue", 3000);
// stmt.run("Table", "white", 3000);
// stmt.run("Cupboard", "green", 3000);

// stmt.finalize();
// db.close();

http.createServer(function(req,res){
	var params = url.parse('http://localhost:3000' + req.url);
	switch (params.pathname) {
		case "/": {
			fs.readFile("./index.html", function(err, content) {
				if (!err) {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(content);
				}
				else {
					res.writeHead(500, {'Content-Type': 'text/html'});
					res.end ('Error: ' + err.message);
				}
			});
			break;
		}
		case "/call1": {
			res.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});
			color = params.query.slice(params.query.indexOf("=") + 1)
			db.all("SELECT * FROM Furniture WHERE color = '" + color +"'", function(err, rows) {
				if(err) {
					res.write ("<div style = 'font-size:30px; color:red'>");
				}
				else {
					res.write("<table>\n");
					res.write("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
					for(var i = 0; i < rows.length; ++i) {
						res.write("<tr><td>"+rows[i].name+"</td><td>"+rows[i].color+"</td><td>"+rows[i].price+"</td></tr>\n");
					}
					res.write("</table>\n");
				}
				res.end();
			});
			break;
		}
		case "/call2": {
			res.writeHead (200, {'Content-Type': 'text/plain; charset = utf-8'});
			db.all("SELECT * FROM Furniture ", function(err, rows) {
				if (err) {
					res.write("<div style = 'font-size:30px; color:red'>");
				}
				else {
					res.write("<table>\n");
					res.write ("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
					for(var i = 0; i < rows.length; ++i) {
						res.write("<tr><td>"+rows[i].name+"</td><td>"+rows[i].color+"</td><td>"+rows[i].price+"</td></tr>\n");
					}
					res.write("</table>\n");
				}
				res.end();
			});
			break;
		}
		default: {
			res.writeHead (404, {'Content-Type': 'text/html'});
			res.end('Error, page not found: ' + req.url);
		}
	}
}).listen(3000);
console.log("run at 3000");


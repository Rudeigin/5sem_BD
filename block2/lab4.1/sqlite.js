var http=require("http");

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
	res.writeHead(200,{'Content-Type': "text/html; charset=utf-8"});
	res.write(
		'<!DOCTYPE html>\n' +
		'<html>\n'+
		'<head>\n' +
		'<meta charset=\'utf-8\'>\n' +
		'</head>\n'+
		'<body>\n'
	);
	db.all("SELECT * FROM Furniture ", function(err, rows) {
	// db.all("SELECT * FROM Furniture WHERE name = 'Table'", function(err, rows) {
	// db.all("SELECT * FROM Furniture WHERE price < 1000", function(err, rows) {
		if(err) {
			res.write("<div style='font-size: 30px; color:red'>" + err + "</div>\n");
		}
		else {
			res.write("<table>\n");
			res.write ("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
			for(var i = 0; i < rows.length; ++i) {
				res.write("<tr><td>"+rows[i].name+"</td><td>"+rows[i].color+"</td><td>"+rows[i].price+"</td></tr>\n");
			}
			res.write("</table>\n");	
		}
		res.end(
			'<body>\n'+
			'<html>\n'
		);
	});
}).listen(3000);
console.log("run at 3000");


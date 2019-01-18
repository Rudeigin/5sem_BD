var http = require('http');
var fs = require('fs');
var urlapi = require('url'); 

var mongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

// mongoClient.connect(url,{useNewUrlParser: true}, function(err, client){
// 	if(err){
// 		console.log("Failed to connect", url);
// 	}
// 	else{
// 		console.log("Connected to", url);
		
// 		var db = client.db("furnitures");
// 		var collection = db.collection("furniture");
// 		var furniture = [
// 			{name:"Chair", faq: {color: "grey",price:1000}},
// 			{name:"Table", faq: {color: "red",price:8000}},
// 			{name:"Chair", faq: {color: "green",price:800}},
// 			{name:"Door", faq: {color: "grey",price:20000}},
// 			{name:"Door", faq: {color: "red",price:10000}},
// 			{name:"Table", faq: {color: "blue",price:9489}},
// 			{name:"Table", faq: {color: "white",price:564}},
// 			{name:"Shelf", faq: {color: "brown",price:5644}},
// 			{name:"Door", faq: {color: "yellow",price:2324}},
// 			{name:"Chair", faq: {color: "grey",price:555}},
// 			{name:"Cupboard", faq: {color: "blue",price:656}},
// 			{name:"Table", faq: {color: "white",price:11123}},
// 			{name:"Door", faq: {color: "yellow",price:5885}},
// 			{name:"Shelf", faq: {color: "white",price:222}},
// 			{name:"Shelf", faq: {color: "red",price:54545}},
// 			{name:"Chair", faq: {color: "green",price:656}},
// 			{name:"Cupboard", faq: {color: "green",price:3553}},
// 			{name:"Table", faq: {color: "black",price:81132}},
// 			{name:"Cupboard", faq: {color: "blue",price:5955}}
// 		];
// 		collection.insertMany(furniture, function(err, result){
// 			if(err){
// 				console.log(err);
// 			}
// 			client.close();
// 		});
// 	}
// });

http.createServer(function(req,res){
	mongoClient.connect(url,{useNewUrlParser: true}, function(err, client){
		if(err){
			console.log("Failed to connect", url);
		}	
		else{
			console.log("request: "+ 'http://localhost:3000');
			var component = urlapi.parse('http://localhost:3000'+req.url);
			switch(component.pathname){
				case "/": {
					fs.readFile("./index.html", function(err, content){
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
						res.writeHead (200, {'Content-Type': 'text/plain; charset = utf-8'});
						searchName = component.query.slice(component.query.indexOf("=")+1)
	    				var db = client.db("furnitures");
	    				var collection = db.collection("furniture");
	    				var query = {name: searchName};
	    				collection.find(query).toArray(function (err, result){
							if (err) {
								res.write ("<div style = 'font-size:30px; color:red'>");
							}
							else if(result.length != 0){
							 	res.write("<table>\n");
								res.write ("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
								for(var i = 0; i < result.length; ++i) {
									res.write("<tr><td>"+result[i].name+"</td><td>"+result[i].faq.color+"</td><td>"+result[i].faq.price+"</td></tr>\n");
								}
								res.write("</table>\n");
							}
							res.end();
						});
						break;
	    		}
				case "/call2": {
						res.writeHead (200, {'Content-Type': 'text/plain; charset = utf-8'});
						var db = client.db("furnitures");
	    				var collection = db.collection("furniture");
						collection.find({}).toArray(function (err, result){
						if (err) {
							res.write ("<div style = 'font-size:30px; color:red'>");
						}
						else if(result.length != 0){
							res.write("<table>\n");
								res.write ("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
								for(var i = 0; i < result.length; ++i) {
									res.write("<tr><td>"+result[i].name+"</td><td>"+result[i].faq.color+"</td><td>"+result[i].faq.price+"</td></tr>\n");
								}
								res.write("</table>\n");;
						}
						else{
							console.log("NOT FOUND");					
						}
						res.end ();
					});
					break;
				}			
				default:
					res.writeHead (404, {'Content-Type': 'text/html'});
					res.end ('Error, page not found: ' + req.url);
			}
			
			client.close();
		}	
	});
}).listen(3000);

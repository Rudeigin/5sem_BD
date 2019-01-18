var neo4j = require("neo4j-driver").v1;
var http = require('http');
var fs = require('fs');
var urlapi = require('url'); 

var urll = "bolt://localhost";
var user = "neo4j";
var password = "neo4jj";

var driver = neo4j.driver(urll, neo4j.auth.basic(user, password));
var session = driver.session();

// session.run( 
// "CREATE(Furnitures:Furniture{title:'Fur'})"+
// "CREATE(Shf:Mebel{name:'Shelf', color:'red', price: 10000})"+
// "CREATE(Ch:Mebel{name:'Chair', color:'black', price: 2000})"+
// "CREATE(Cup:Mebel{name:'Cupboard', color:'grey', price: 200})"+
// "CREATE(Dr:Mebel{name:'Door', color:'yellow', price: 2400})"+
// "CREATE(Tbl:Mebel{name:'Table', color:'grey', price: 10400})"+
// "CREATE(Tabl:Mebel{name:'Table', color:'blue', price: 500})"+
// "CREATE(Cupb:Mebel{name:'Cupboard', color:'white', price: 8000})"+
// "CREATE(Chr:Mebel{name:'Chair', color:'green', price: 1000})"+
// "CREATE"+
// "(Shf)-[:Furniture]->(Furnitures)," +
// "(Ch)-[:Furniture]->(Furnitures)," +
// "(Cup)-[:Furniture]->(Furnitures)," +
// "(Dr)-[:Furniture]->(Furnitures)," +
// "(Tbl)-[:Furniture]->(Furnitures)," +
// "(Tabl)-[:Furniture]->(Furnitures)," +
// "(Cupb)-[:Furniture]->(Furnitures)," +
// "(Chr)-[:Furniture]->(Furnitures);" 
// ).then(result=>{
// 	session.close();
// 	driver.close();	
// });

http.createServer(function(req,res){
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
				}
			});
			break;
		case "/call1":
				res.writeHead (200, {'Content-Type': 'text/plain; charset = utf-8'});
				name = component.query.slice(component.query.indexOf("=")+1)
    			session.run("MATCH(buff:Mebel) WHERE buff.name ='"+name+"' RETURN buff;"
    			).then(result=>{
					session.close();
					res.write("<table>\n");
					res.write("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
					for(var i = 0; i < result.records.length; ++i){
						var node = result.records[i].get("buff");
						res.write ("<tr><td>" + node.properties.name + "</td><td>" + node.properties.color + "</td><td>" + node.properties.price + "</td><td></tr>\n");
					}
					res.write ("</table>\n");
					driver.close();
					res.end ();
				});
			break;
			
		case "/call2":
				res.writeHead (200, {'Content-Type': 'text/plain; charset = utf-8'});
				session.run("MATCH(buff:Mebel) RETURN buff LIMIT 20;"
				).then(result=>{
					session.close();
					res.write ("<table>");
					res.write("<tr><td>Name</td><td>Color</td><td>Price</td></tr>\n");
					for(var i = 0; i < result.records.length; ++i){
						var node = result.records[i].get("buff");
						res.write ("<tr><td>" + node.properties.name + "</td><td>" + node.properties.color + "</td><td>" + node.properties.price + "</td><td></tr>\n");
					}
					res.write ("</table>\n");
					driver.close();
					res.end ();
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
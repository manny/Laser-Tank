var databaseUrl = "mydb";

var collections = ["debug_log"];
var db = require("mongojs").connect(databaseUrl, collections);
var http = require('http');
http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Mongo\n');
}).listen(3000, "localhost");
//db.debug_log.insert({command: "fireUp"});
db.debug_log.remove({});
console.log('Server running at localhost:3000');

db.debug_log.find({}, console.log);

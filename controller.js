var databaseUrl = "mydb";
var collections = ["debug_log"];
var db = require("mongojs").connect(databaseUrl, collections);
var http = require('http');
http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Mongo\n');
}).listen(3000, "localhost");
//db.debug_log.insert({command: "fireUp"});
function mongo(){
	db.debug_log.find({}, console.log);
}
console.log('Server running at localhost:3000');

//db.debug_log.find({}, console.log);

var five = require("./johnny-five"),
	board, motor, led,laser, button, photoresistor;

board = new five.Board();

board.on("ready", function() {
	//phptoresistor
	photoresistor = new five.Sensor({
		pin: "A2",
		freq: 250
	});
	//led
	fireLight = new five.Led(6);
	hitLight = new five.Led(10);

	laser = new five.Led(11); 
	//motors
	
	motorL = new five.Motor(13);
	motorR = new five.Motor(12);
	//buttons
	left = new five.Button(4);
	forward = new five.Button(3);
	right = new five.Button(2);
	fire = new five.Button(5);
	board.repl.inject({
		pot: photoresistor,
		laser: laser,
		motorL: motorL,
		motorR: motorR,
		left: left,
		forward: forward,
		right: right,
		fire: fire
	});
	//left controls
	left.on("down", function(){
		motorL.start();
		console.log("downL");
	    db.debug_log.insert({command: "downL"});
	});
	left.on("up", function(){
		motorL.stop();
		console.log("upL");
	    db.debug_log.insert({command: "upL"});
	});
	//forward controls
	forward.on("down", function(){
		motorR.start();
		motorL.start();
		console.log("downF");
		//db.debug_log.remove({});
	    db.debug_log.insert({command: "downF"});
	});
	forward.on("up", function(){
		motorR.stop();
		motorL.stop();
		console.log("upF");
	    db.debug_log.insert({command: "upF"});
	});
	right.on("down", function(){
		motorR.start();
		console.log("downR");
	    db.debug_log.insert({command: "downR"});
	});
	right.on("up", function(){
		motorR.stop();
		console.log("upR");
	    db.debug_log.insert({command: "upR"});
	});

	fire.on("down", function(){
		console.log("fireDown");
		fireLight.on();
		laser.on();
	    db.debug_log.insert({command: "fireDown"});
		setTimeout(function(){
			laser.off();
			fireLight.off();
		},300);
	});

	fire.on("up", function(){
		console.log("fireUp");
		fireLight.off();
		laser.off();
	    db.debug_log.insert({command: "fireUp"});
		db.debug_log.find({}, console.log);
	});

	//motor functions
	motorL.on("start", function( err, timestamp ) {
		//console.log( "startL", timestamp );
	});
	
	motorL.on("stop", function( err, timestamp ) {
		//console.log( "stopL", timestamp );
	});
	motorR.on("start", function( err, timestamp ) {
		//console.log( "startR", timestamp );
	});
	
	motorR.on("stop", function( err, timestamp ) {
		//console.log( "stopR", timestamp );
	});
	
  	photoresistor.on("read", function( err, value ) {
    	//console.log( value, this.normalized );
		if(value <60){
			console.log("HIT!!!");
			hitLight.on();
			//hitLight.strobe(100);
			setTimeout(function(){
				console.log("off");
				hitLight.off();
			}, 3000);
		}
  	});
	
});

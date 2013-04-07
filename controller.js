var five = require("./johnny-five"),

	board, motor, led,laser, button;

board = new five.Board();

board.on("ready", function() {
	//led
	fireLight = new five.Led(6);

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
		//console.log("downL");
	});
	left.on("up", function(){
		motorL.stop();
		console.log("upL");
	});
	//forward controls
	forward.on("down", function(){
		motorR.start();
		motorL.start();
		//console.log("downF");
	});
	forward.on("up", function(){
		motorR.stop();
		motorL.stop();
		//console.log("upF");
	});
	right.on("down", function(){
		motorR.start();
		//console.log("downR");
	});
	right.on("up", function(){
		motorR.stop();
		//console.log("upR");
	});

	fire.on("down", function(){
		//console.log("fireDown");
		fireLight.on();
		laser.on();
	});

	fire.on("up", function(){
		console.log("fireUp");
		fireLight.off();
		//laser.off();
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
	
});

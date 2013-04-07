var five = require("./johnny-five"),

	board, motor, led, button;

 board = new five.Board();

board.on("ready", function() {
	// Create a new `motor` hardware instance.

	motor1 = new five.Motor({
		pin: 5
	});
	motor2 = new five.Motor({
		pin: 6
	});

	button1 = new five.Button({
		pin: 12
	});
	button2 = new five.Button({
		pin: 13
	});

	// Inject the `motor` hardware into
	// the Repl instance's context;
	// allows direct command line access
	board.repl.inject({
		motor1: motor1,
		motor2: motor2,
		button1: button1,
		button2: button2
	});
	button1.on("down", function(){
		motor1.start();
		console.log("down1");
	});
	button1.on("up", function(){
		motor1.stop();
		console.log("up1");
	});
	button2.on("down", function(){
		motor2.start();
		console.log("down2");
	});
	button2.on("up", function(){
		motor2.stop();
		console.log("up2");
	});

	// "start" events fire when the motor is started.
	/*
	motor1.on("start", function( err, timestamp ) {
		console.log( "start", timestamp );

		// Demonstrate motor stop in 2 seconds
		
		board.wait( 2000, function() {
			//this.stop();
			motor.stop();
		});
		
	});
	/
	// "stop" events fire when the motor is started.
	motor1.on("stop", function( err, timestamp ) {
		console.log( "stop", timestamp );
	});
	*/
});

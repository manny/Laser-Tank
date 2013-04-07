var five = require("./johnny-five"),

	board, motor, led, button, laser;

 board = new five.Board();

board.on("ready", function() {
	// Create a new `motor` hardware instance.
	laser = new five.Led(9);

	motor = new five.Motor({
		pin: 5
	});

	button = new five.Button({
		pin: 13
	});

	// Inject the `motor` hardware into
	// the Repl instance's context;
	// allows direct command line access
	board.repl.inject({
		motor: motor,
		button: button,
		laser: laser
	});
	button.on("down", function(){
		laser.toggle();
	});
	button.on("up", function(){
		//laser.stop();
	});

	// Motor Event API

	// "start" events fire when the motor is started.
	motor.on("start", function( err, timestamp ) {
		console.log( "start", timestamp );

		// Demonstrate motor stop in 2 seconds
		/*
		board.wait( 2000, function() {
			//this.stop();
			motor.stop();
		});
		*/
	});

	// "stop" events fire when the motor is started.
	motor.on("stop", function( err, timestamp ) {
		console.log( "stop", timestamp );
	});

	// Motor API

	// start()
	// Start the motor. `isOn` property set to |true|
	//motor.start();

	// stop()
	// Stop the motor. `isOn` property set to |false|
});

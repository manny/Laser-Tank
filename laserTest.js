var five = require("./johnny-five"),

	board, led, button, laser;

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
});

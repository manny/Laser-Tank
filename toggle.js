var five = require("./johnny-five"),
	board, led, button;
board = new five.Board();
board.on("ready", function(){
	led = new five.Led(13);
	button = new five.Button(3);
	board.repl.inject({
		button: button
	});

	button.on("down", function(){
		console.log("down");
		led.toggle();
	});
	button.on("up", function(){
		console.log("up");
	});
});

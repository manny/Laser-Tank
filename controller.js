var databaseUrl = "mydb";
var collections = ["debug_log"];
//var db = require("mongojs").connect(databaseUrl, collections);
var Canvas = require('./node-canvas/lib/canvas')
  , canvas = new Canvas(2000, 1000)
  , ctx = canvas.getContext('2d')
  , http = require('http');
//db.debug_log.insert({command: "fireUp"});
console.log('Server running at localhost:3000');
draw();
var damage1 = 0;
var damage2 = 0;
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
	//    db.debug_log.insert({command: "downL"});
	});
	left.on("up", function(){
		motorL.stop();
		//console.log("upL");
	    //`db.debug_log.insert({command: "upL"});
	});
	//forward controls
	forward.on("down", function(){
		motorR.start();
		motorL.start();
		console.log("downF");
		//db.debug_log.remove({});
	  //  db.debug_log.insert({command: "downF"});
	});
	forward.on("up", function(){
		motorR.stop();
		motorL.stop();
		//console.log("upF");
	   //db.debug_log.insert({command: "upF"});
	});
	right.on("down", function(){
		motorR.start();
		console.log("downR");
//	    db.debug_log.insert({command: "downR"});
	});
	right.on("up", function(){
		motorR.stop();
		//console.log("upR");
//	    db.debug_log.insert({command: "upR"});
	});

	fire.on("down", function(){
		//console.log("fireDown");
		fireLight.on();
		laser.on();
//	    db.debug_log.insert({command: "fireDown"});
		setTimeout(function(){
			laser.off();
			fireLight.off();
		},300);
	});

	fire.on("up", function(){
		//console.log("fireUp");
		fireLight.off();
		laser.off();
//	    db.debug_log.insert({command: "fireUp"});
		//db.debug_log.find({}, console.log);
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
		//lower the value if room is too bright
		if(value <45){
			ctx.font = "bold 18pt Verdian";
			ctx.fillStyle = "red";
			ctx.fillText("HIT -100", 950, 90);
			console.log("");
			console.log("****     ****  *********  ******** **");
			console.log("****     ****     **         **    **");
			console.log("*************     **         **    **");
			console.log("*************     **         **    **");
			console.log("*************     **         **    **");
			console.log("****     ****     **         **        ");
			console.log("****     ****     **         **	   **");
			console.log("****     ****  ********      **	   **");
			console.log("");
			if(damage2 + 110 >= 550){
				damage2 = 550;
			}else{
				damage2 = damage2 + 110;
			}
			hitLight.on();
			
			//hitLight.strobe(100);
			setTimeout(function(){
				hitLight.off();
			}, 3000);
		}
  	});	
});
function draw(){
	ctx.clearRect(0, 0, 2000, 1000);

	ctx.fillStyle = "rgb(1, 1, 1)";
    ctx.fillRect(0,0, 2000 , 1000);
	//green health
	ctx.fillStyle = "rgb(2, 200, 2)";
    ctx.fillRect(60, 150, 550 , 35);
	
	ctx.fillStyle = "rgb(2, 200, 2)";
    ctx.fillRect(740, 150, 550 , 35);
	//red damage
	ctx.fillStyle = "rgb(200, 2, 2)";
    ctx.fillRect(60, 150, damage1, 35);
	
	ctx.fillStyle = "rgb(200, 2, 2)";
    ctx.fillRect(740+550 -damage2, 150, damage2 , 35);
	//title + player names
	ctx.font = "bold 24pt Verdian";
	ctx.fillStyle = "green";
	ctx.fillText("Laser Tanks", 550, 40);
	ctx.fillText("New York Tech Meetup", 450, 90);
	
	ctx.font = "bold 22pt Verdian";
	ctx.fillStyle = "red";
	ctx.fillText("Manny", 100, 130);
	
	ctx.font = "bold 22pt Verdian";
	ctx.fillStyle = "red";
	ctx.fillText("Player 2", 1100,130);
	if(damage2 == 550){

		//console.log("player one wins");
		ctx.font = "bold 30pt Verdian";
		ctx.fillStyle = "red";
		ctx.fillText("Manny Wins!!!", 540, 400);

	}
}
setInterval(function(){
	draw();
}, 1000);


http.createServer(function (req, res) {
 // clock(ctx);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(''
    + '<meta http-equiv="refresh" content="1;" />'
    + '<img src="' + canvas.toDataURL() + '" />');
}).listen(3000);

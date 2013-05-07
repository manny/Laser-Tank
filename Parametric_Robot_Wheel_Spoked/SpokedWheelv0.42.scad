/*
 * Parametric Robot Wheel (Spoked Edition), v0.43
 *
 * by Alex Franke (CodeCreations), Apr 2012
 * http://www.theFrankes.com
 * 
 * Licenced under Creative Commons Attribution - Non-Commercial - Share Alike 3.0 
 * 
 * INSTRUCTIONS: Choose some values in the "User-defined values" section, and render. 
 * 
 * v0.43, Apr 8, 2012: Bug fix - hard-coded number of spokes. 
 * v0.42, Apr 8, 2012: Initial Release.
 */

/////////////////////////////////////////////////////////////////////////////
// User-defined values... 
/////////////////////////////////////////////////////////////////////////////

// O-Ring Tire Parameters:
//      Often wheels are built around the tires. In this section, specify the 
//   properties of te o-rings you're using as tires. 

tireCSDiameter = 3.5;	// O-ring cross-sectional diameter (CS) -- How thick is the o-ring rubber?
tireID = 93;			// O-ring Internal diameter (ID) -- How wide is the inside opening? 
tireStretch = 1.00;		// O-ring circumferential stretch percentage (usually 0-5%) -- How much to 
					// 		you want to stretch it to get it on? 

// Other general wheel properties:
//      These properties define other general wheel metrics. Because I wrote this to build a number 
//   of different wheel types, you'll see properties like "numberOfSpokes." You can change the code 
//   in spoke() to create any spoke design you want. 

wheelWidth = 4.5;		// The width (or thickness) of the the wheel.
rimHeight = 7;		// The height of the rim portion of the wheel. (Must be greater than tire CS radius.) 
numberOfSpokes = 5;	// Number of "spokes." Leave this at three if you're doing the biohazard design

// Hub properties: 
//      These properties define the hub -- or how the wheel connects to the motor. The default values 
//   for the captive nut are precise for a M3 nut and will make the nut a very tight (if not impossible) 
//   fit. I prefer this because it allows you to "melt" the nut into place with a soldering iron. However, 
//   if you don't have a solder iron or prefer a looser fit, then just adjust the nut diameter and thickness.
//   Similarly, the holes for the motor shaft and grub screw are also precise. This allows the holes to 
//   be drilled out for a more precise fit. Again, you can adjust these to suit your needs. 
//      The hubZOffset can be used to "sink" the hub into the wheel, and it defaults to half the wheel 
//   thickness. For example, when the hubHeight is 10 and the hubZOffset is -2, then the hub will 
//   protrude 8mm from the wheel, but the shaft hole will be 10mm deep. The set screw will still be
//   positioned in the middle of the exposed vertical height, and the fillet/chamfer will also be rendered 
//   in the correct position. This property is also useful if you want to poke a hole entirely through the
//   wheel. (e.g. If the wheel is 6mm thick, set the hub height to 16 and the hubZOffset to -6, and 
//   you'll get a hub that protrudes 10mm from the wheel surface with a hole that extends all the way 
//   through the wheel.)

hubDiameter = 20;				// The diameter of the hub portion of the wheel
hubHeight = 13;				// The height of the hub
shaftDiameter = 4;				// The diameter of the motor shaft
setScrewDiameter = 3;			// The diameter of the set screw. 3 is the default for an M3 screw. 
setScrewNutDiameter = 5.4;		// The "diameter" of the captive nut, from flat to flat (the "in-diameter")
setScrewNutThickness=2.3;		// The thickness of the captive nut
setScrewCount=1;				// The number of set screws/nuts to render, spaced evenly around the shaft 
hubZOffset=-wheelWidth;		// The Z position of the hub, negative numbers from the surface of the wheel 
baseFilletRadius=0;				// The radius of the fillet (rounded part) between the hub and wheel. 
topFilletRadius=2;				// The radius of the fillet (rounded part) at the top of the hub. 
chamferOnly=false;				// Set to true to use chamfers (straight 45-degree angles) instead of fillets. 

$fn=50;						// Default quality for most circle parts. 


/////////////////////////////////////////////////////////////////////////////
// Calculated values... 
/////////////////////////////////////////////////////////////////////////////

// Let's get some basic math out of the way first.
// Not all of these are necessary, but many are helpful to know and will be echoed to the user. 

// Some basic tire geometry
innerDiameter = tireID; 
centerDiameter = tireID + tireCSDiameter;
outerDiameter = tireID + ( tireCSDiameter *2 );
innerCircumference = innerDiameter*PI;
centerCircumference = centerDiameter*PI;
outerCircumference = outerDiameter*PI;

// Stretched tire geometry
centerCircumferenceStretched = centerCircumference * tireStretch;
centerDiameterStretched = centerCircumferenceStretched/PI; 
innerDiameterStretched = centerDiameterStretched - tireCSDiameter;
outerDiameterStretched = centerDiameterStretched + tireCSDiameter;
innerCircumferenceStretched = innerDiameterStretched * PI;
outerCircumferenceStretched = outerDiameterStretched * PI;

// Wheel geometry.
wheelDiameter =  centerDiameterStretched;
wheelRadius = wheelDiameter / 2;
tireRadius = tireCSDiameter / 2;
hubRadius = hubDiameter / 2;


/////////////////////////////////////////////////////////////////////////////
// Report some basic information to the user...  
/////////////////////////////////////////////////////////////////////////////

// Some tire data, stretched and unstretched 
echo( str("Tire cross-sectional diameter is ", tireCSDiameter ) ); 
echo( str("Tire circumferential stretch is ", tireStretch ) ); 

echo( str("Tire (unstretched): [inner, center, outer]" ) ); 
echo( str("  * Diameter: ", innerDiameter, ", ", centerDiameter, ", ", outerDiameter ) ); 
echo( str("  * Circumference: ", round2(innerCircumference), ", ", round2(centerCircumference), 
	", ", round2(outerCircumference) ) ); 

echo( str("Tire Stretched: [inner, center, outer]" ) ); 
echo( str("  * Diameter: ", round2(innerDiameterStretched), ", ", round2(centerDiameterStretched), 
	", ", round2(outerDiameterStretched) ) ); 
echo( str("  * Circumference: ", round2(innerCircumferenceStretched), ", ", 
	round2(centerCircumferenceStretched), ", ", round2(outerCircumferenceStretched) ) ); 

echo( str("Wheel diameter will be ", wheelDiameter ) ); 

// Here's a helper function that will round a value to two decimal places. 
function round2( value ) = round(value * 100) / 100;


/////////////////////////////////////////////////////////////////////////////
// Render the wheel...  
/////////////////////////////////////////////////////////////////////////////

union() {
	rim(wheelWidth, rimHeight,wheelDiameter, tireCSDiameter);


	difference() {
		spokes(wheelDiameter - (rimHeight*2), wheelWidth, numberOfSpokes);
		
		// Carve a spot for an inset hub if necessary 
		translate( [0,0,hubHeight/2 + wheelWidth/2 + hubZOffset] )
			cylinder( h=hubHeight, r=hubDiameter/2, center=true );
	}	

	translate([0,0, hubHeight/2 + wheelWidth/2 + hubZOffset]) 
	hub(hubHeight, hubDiameter, shaftDiameter, 
		setScrewCount, setScrewNutDiameter, setScrewNutThickness, setScrewDiameter, 
		hubZOffset, baseFilletRadius, topFilletRadius, chamferOnly);
	
	// tire
	%color("black", 0.5) tire( wheelDiameter, tireCSDiameter ); 
}


/////////////////////////////////////////////////////////////////////////////
// Modules...  
/////////////////////////////////////////////////////////////////////////////

// The hub (the part that holds the wheel onto the motor
module hub( height, diameter, boreDiameter, 
	nuts, nutDiameter, nutThickness, setScrewDiameter, 
	hubZOffset=0, baseFilletRadius=0, topFilletRadius=0, chamferOnly=false) {

	hubWidth=(diameter-boreDiameter)/2;

	union() {	
		difference() {

			// Main hub shape
			union() {
				difference() {
					union() {
						cylinder( h=height, r=diameter/2, center=true );
			
						// First chamfer the base...
						rotate_extrude() 
							translate([diameter/2,-(height/2)-hubZOffset,0])
								polygon(points=[[0,0],[0,baseFilletRadius],[baseFilletRadius,0]]);
					}
			
					// Chamfer the top...
					rotate_extrude() 
						translate([diameter/2,height/2,0])				
							polygon(points=[[0.5,0.5],[-topFilletRadius-0.5,0.5],[0.5, -topFilletRadius-0.5]]);
			
					// Carve the bottom fillet from the chamfer
					if ( !chamferOnly ) { 
						rotate_extrude() {
							translate([(diameter/2)+baseFilletRadius,
								-(height-(2*baseFilletRadius))/2-hubZOffset,0]) {
								circle(r=baseFilletRadius);
							}
						}
					}
				}

				// Add the fillet back on top of the top chamfer 
				if (!chamferOnly) {
					rotate_extrude() {
						translate([
							(diameter/2)-topFilletRadius,
							(height-(2*topFilletRadius))/2,
							0])				
							circle(r=topFilletRadius);
					}
				}
			}
	
			// Remove the bore
			cylinder( h=height+1, r=boreDiameter/2, center=true ); 
	
			// Remove the captive nut
			for( i=[0:nuts-1] ) {
				rotate([ 0,0, (360/nuts)*i ])
				translate([diameter/4,0, height/2 - (height+hubZOffset)/2]) {
					rotate([0,-90,0]) { 
						captiveNut( nutDiameter, nutThickness, setScrewDiameter, 
							depth=height/2+1, holeLengthTop=hubWidth/2, 
							holeLengthBottom=hubWidth+baseFilletRadius );
					}
				}
			}
		}
	}
}

// The rim (the solid area between the spokes and tire)
module rim( width, height, diameter, tireDiameter ) {
	difference() { 
		// rim 
		cylinder( h=width, r=diameter/2, center=true );
	
		// punch out center
		cylinder(h=width+1, r=diameter/2 - height, center=true );

		// punch out tire
		tire( diameter, tireDiameter ); 
	}
}

// The tire, where "diameter" is the center-to-center diameter (not ID or OD)
module tire( diameter, tireDiameter ) {
	render() {
		rotate_extrude(convexity = 10)
			translate([diameter/2, 0, 0])
				circle(r = tireDiameter/2, $fn=20);
	}
}

// The spokes. This scales the design in spoke() to produce the spokes for the wheel. 
// Change this an the spoke() module in order to customize the spokes.  
module spokes( diameter, width, number ) {

	intersection() {
		cylinder( h=width, r= diameter/2, center = true ); 

		for (step = [0:number-1]) {
		    rotate( a = step*(360/number), v=[0, 0, 1])
			spoke( width );
		}
	}

}

// One spoke. I tinkered with the sizes to get the right look for the biohazard wheel, and then 
// used spokes() to scale it to the size of the wheel. Change both of these to customize the 
// wheel. Build the spoke in the negative direction along the X axis
module spoke( width ) {
	translate ( [-60/2, 0, 0] )
	cube( [60, width, width], center=true); 
}

// This is the captive nut module I use in several of my designs. 
module captiveNut( inDiameter=5.4, thickness=2.3, setScrewHoleDiameter=3, 
	depth=10, holeLengthTop=5, holeLengthBottom=5 )
{
	side = inDiameter * tan( 180/6 );

	render()
	union() {
		for ( i = [0 : 2] ) {
			rotate( i*120, [0, 0, 1]) 
				cube( [side, inDiameter, thickness], center=true );
		}
	
		translate([depth/2,0,0]) 
			cube( [depth, inDiameter, thickness], center=true );
	
		translate([0,0,-(thickness/2)-holeLengthBottom]) 
			cylinder(r=setScrewHoleDiameter/2, h=thickness+holeLengthTop+holeLengthBottom, $fn=15);
	}
}




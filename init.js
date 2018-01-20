// Robot dimensions in inches
// Note that width is from the driver's perspective on the left side of the field
robotWidth = toFeet(23.5); //33;
robotLength = toFeet(30.0); //28;

// Field dimensions in inches
/* Field is 27'x54' */
/* 324"x648" */
fieldWidth = toFeet(324);
fieldLength = toFeet(648);

// Names of relevant keys
posXkey = '/SmartDashboard/Robot X';
posYkey = '/SmartDashboard/Robot Y';
posTkey = '/SmartDashboard/Robot Heading';

// Sorted list of keys on SmartDashboard
sd = NetworkTables.getKeys().filter(function(key){return (key.indexOf('SmartDashboard') !==-1)?true:false;}).sort();

// Initial position of robot
Xinit = robotLength/2; // up against the alliance wall
Yinit = fieldWidth/2 - 1 + robotWidth/2; // next to the hole thing, which has an edge one foot north of the midline
Tinit = 0;

X = Xinit;
Y = Yinit;
T = Tinit;

// How many unique colors the points will be
var numColors = 8;

var traceCanvas = null;
var trace = null;
var pointsCanvas = null;
var points = null;

// True is field centric
// False is robot centric
// See keys.js
var fieldCentric = false;

$(function(){
	$('#robot').css('padding',toInches(robotWidth/2)+'px '+toInches(robotLength/2)+'px');
	$('.field').css('width',toInches(fieldLength)+'px');
	$('.field').css('height',toInches(fieldWidth)+'px');
	$('body').css('margin-top',toInches(fieldWidth)+'px');
	/* 
	$('#trace').css('width',fieldLength+'px');
	$('#trace').css('height',fieldWidth+'px');
	$('#points').css('width',fieldLength+'px');
	$('#points').css('height',fieldWidth+'px'); */
	
	traceCanvas = document.getElementById('trace');
	trace = traceCanvas.getContext('2d');
	setXYT();
	trace.beginPath();
	trace.moveTo(toInches(X),toInches(Y));
	trace.strokeStyle = '#2222FF';
	trace.lineWidth = 5;
	
	pointsCanvas = document.getElementById('points');
	points = pointsCanvas.getContext('2d');
});
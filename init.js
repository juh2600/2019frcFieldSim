// Robot dimensions in inches
// Note that width is from the driver's perspective on the left side of the field
robotWidth = toFeet(30.0); //33;
robotLength = toFeet(23.5); //28;

// Field dimensions in inches
/* Field is 27'x54' */
/* 324"x648" */
fieldWidth = toFeet(324);
fieldLength = toFeet(648);

// Names of relevant keys
posXkey = '/SmartDashboard/Robot X';
posYkey = '/SmartDashboard/Robot Y';
posTkey = '/SmartDashboard/Robot Heading';
pathFinKey = '/SmartDashboard/Auto';

// Sorted list of keys on SmartDashboard
sd = NetworkTables.getKeys().filter(function(key){return (key.indexOf('SmartDashboard') !==-1)?true:false;}).sort();

// Initial position of robot
Xinit = robotLength/2; // up against the alliance wall
Yinit = fieldWidth/2 - 1 + robotWidth/2; // next to the hole thing, which has an edge one foot north of the midline
Tinit = 0;

X = Xinit;
Y = Yinit;
T = Tinit;

// How many unique colors the shadowbots and paths will be
var numColors = 8;
// How thicc the paths should be
var thiccness = 3;

var traceAutoCanvas = null;
var traceAuto = null;
var traceTeleCanvas = null;
var traceTele = null;
var fieldImg = null;

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
	$('#traceAuto').css('width',fieldLength+'px');
	$('#traceAuto').css('height',fieldWidth+'px');
	$('#traceTele').css('width',fieldLength+'px');
	$('#traceTele').css('height',fieldWidth+'px'); */
	
	fieldImg = document.getElementById('fieldImg');
	traceAutoCanvas = document.getElementById('traceAuto');
	traceAuto = traceAutoCanvas.getContext('2d');
	setXYT();
	traceAuto.beginPath();
	traceAuto.moveTo(toInches(X),toInches(Y));
	traceAuto.strokeStyle = '#2222FF';
	traceAuto.lineWidth = thiccness;
	
	traceTeleCanvas = document.getElementById('traceTele');
	traceTele = traceTeleCanvas.getContext('2d');
	traceTele.strokeStyle = '#2222FF';
	traceTele.lineWidth = thiccness;
	// Disable context menu
	document.getElementById('traceTele').addEventListener('contextmenu',event=>event.preventDefault());
	
	clearTrace();
	NetworkTables.addKeyListener(pathFinKey,updateSaveButtons,true);
	
	$('#saveAuto').on('click',saveAutoPaths);
	$('#saveTele').on('click',saveTelePaths);
});
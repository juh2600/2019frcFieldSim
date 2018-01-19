// Robot dimensions in inches
robotWidth = 33;
robotLength = 28;
// Field dimensions in inches
/* Field is 27'x54' */
/* 324"x648" */
// Note that width is from the driver's perspective on the left side of the field
fieldWidth = 324;
fieldLength = 648;

var traceCanvas = null;
var trace = null;
var pointsCanvas = null;
var points = null;

$(function(){
	$('#robot').css('padding',robotWidth/2+'px '+robotLength/2+'px');
	$('.field').css('width',fieldLength+'px');
	$('.field').css('height',fieldWidth+'px');
	$('body').css('margin-top',fieldWidth+'px');
	/* 
	$('#trace').css('width',fieldLength+'px');
	$('#trace').css('height',fieldWidth+'px');
	$('#points').css('width',fieldLength+'px');
	$('#points').css('height',fieldWidth+'px'); */
	
	traceCanvas = document.getElementById('trace');
	trace = traceCanvas.getContext('2d');
	setXYT(null,X,Y,null);
	trace.beginPath();
	trace.moveTo(X,Y);
	trace.strokeStyle = '#2222FF';
	trace.lineWidth = 5;
	
	pointsCanvas = document.getElementById('points');
	points = pointsCanvas.getContext('2d');
});
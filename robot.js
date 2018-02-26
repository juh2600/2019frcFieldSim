var robot;
var robotTraceAuto;
var colors = 2.3;
var colorIndex = 0;
var scalingFactor = 1.75;

$(function(){
	$('.field').width($('.field').width()*scalingFactor);
	$('.field').height($('.field').height()*scalingFactor);
	$('.wall').each(function(e){$(this).css('top',parseFloat($(this).css('top'))*scalingFactor+"px");});
	$('#fieldImg').css('background-size',parseInt($('#fieldImg').css('background-size'))*scalingFactor+"px");
	$('body').css('margin-top',parseInt($('body').css('margin-top'))*scalingFactor+"px");
	
	mod3 = new Trackable(
		'mod3',
		1.5,
		4,
		sd('Module 3 X'),
		sd('Module 3 Y'),
		sd('Module 3 Angle'),
		'grey',
		true,
		scalingFactor
		);
	mod3Tracer = new Traceable(
		mod3,
		'mod3trace',
		function(){return true;},
		'grey',
		1
		);
	
	pathPoint = new Trackable(
		'pathHead',
		0,
		0,
		sd('Path X'),
		sd('Path Y'),
		null,
		'transparent',
		true,
		scalingFactor
		);

	pathTracer = new Traceable(
		pathPoint,
		'tracePath',
		function(){return true;},
		function(){return rainbow(colors,colorIndex++);},
		1
		);
	
	robot = new Trackable(
		'robot',
		39,
		34,
		sd('Robot X'),
		sd('Robot Y'),
		sd('Robot Heading'),
		'#2222FF',
		true,
		scalingFactor
		);
	robotTracerAuto = new Traceable(
		robot,
		'robotTraceAuto',
		function(){return NetworkTables.getValue(sd('Auto'));},
		function(){return rainbow(colors,colorIndex++);},
		1
		);
	robotTracerTele = new Traceable(
		robot,
		'traceTele',
		function(){return !NetworkTables.getValue(sd('Auto'));},
		function(){return rainbow(colors,colorIndex++);},
		1
		);
		
	$(robot.elem).append('<div id="frant">frant</div>');
	
});
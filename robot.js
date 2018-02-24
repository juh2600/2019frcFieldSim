var robot;
var robotTraceAuto;
var colors = 2.3;
var colorIndex = 0;

$(function(){
	mod3 = new Trackable(
		'mod3',
		1.5,
		4,
		sd('Module 3 X'),
		sd('Module 3 Y'),
		sd('Module 3 Angle'),
		'grey',
		true
		);
	mod3Trace = new Traceable(
		mod3,
		'mod3trace',
		function(){return true;},
		'grey',
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
		true
		);
	path = new Trackable(
		'pathHead',
		0,
		0,
		sd('Path X'),
		sd('Path Y'),
		null,
		'black',
		true
		);

	robotTracePath = new Traceable(
		path,
		'tracePath',
		function(){return true;},
		function(){return rainbow(colors,colorIndex++);},
		1
		);
	robotTraceAuto = new Traceable(
		robot,
		'traceAuto',
		function(){return NetworkTables.getValue(sd('Auto'));},
		function(){return rainbow(colors,colorIndex++);},
		1
		);
	robotTraceTele = new Traceable(
		robot,
		'traceTele',
		function(){return !NetworkTables.getValue(sd('Auto'));},
		function(){return rainbow(colors,colorIndex++);},
		1
		);
		
	$(robot.elem).append('<div id="frant">frant</div>');
	
});
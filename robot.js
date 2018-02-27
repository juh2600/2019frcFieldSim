var robot;
var robotTraceAuto;
var colors = 2.3;
var colorIndex = 0;
var scalingFactor = 1.75;
function scale(elem, attribs) {
	for(a of attribs) {
//		console.log(elem,a)
		$(elem).css(a,parseFloat($(elem).css(a))*scalingFactor+"px");
	}
}

$(function(){
	$('.field').width($('.field').width()*scalingFactor);
	$('.field').height($('.field').height()*scalingFactor);
	$('.wall').each(function(e){$(this).css('top',parseFloat($(this).css('top'))*scalingFactor+"px");});
	$('#fieldImg').css('background-size',parseInt($('#fieldImg').css('background-size'))*scalingFactor+"px");
	$('body').css('margin-top',parseInt($('body').css('margin-top'))*scalingFactor+"px");
	
	mod0 = new Trackable(
		'mod0',
		1.5,
		4,
		sd('Module 0 X'),
		sd('Module 0 Y'),
		sd('Module 0 Angle'),
		'grey',
		true,
		scalingFactor
		);
	mod0Tracer = new Traceable(
		mod0,
		'mod0Tracer',
		function(){return true;},
		'grey',
		1
		);
	mod1 = new Trackable(
		'mod1',
		1.5,
		4,
		sd('Module 1 X'),
		sd('Module 1 Y'),
		sd('Module 1 Angle'),
		'grey',
		true,
		scalingFactor
		);
	mod1Tracer = new Traceable(
		mod1,
		'mod1Tracer',
		function(){return true;},
		'grey',
		1
		);
	mod2 = new Trackable(
		'mod2',
		1.5,
		4,
		sd('Module 2 X'),
		sd('Module 2 Y'),
		sd('Module 2 Angle'),
		'grey',
		true,
		scalingFactor
		);
	mod2Tracer = new Traceable(
		mod2,
		'mod2Tracer',
		function(){return true;},
		'grey',
		1
		);
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
		'mod3Tracer',
		function(){return true;},
		'grey',
		1
		);
	
	pathHead = new Trackable(
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
		pathHead,
		'pathTracer',
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
	robotAutoTracer = new Traceable(
		robot,
		'robotAutoTracer',
		function(){return NetworkTables.getValue(sd('Auto'));},
		function(){return rainbow(colors,colorIndex++);},
		1
		);
	robotTeleTracer = new Traceable(
		robot,
		'robotTeleTracer',
		function(){return !NetworkTables.getValue(sd('Auto'));},
		function(){return rainbow(colors,colorIndex++);},
		1
		);
		
	$(robot.elem).append('<div class="frant">frant</div>');
	scale('#robot > .frant',['height','top']);
	scale('#robot',['border-width','border-radius']);
	scale('.field.overlay',['width','height']);
});


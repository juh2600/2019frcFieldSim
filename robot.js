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

function distLessThan(x, log = false) {
	return function(){
		var d = Math.sqrt(Math.pow(this.trackable.getFieldX()-this.x,2)+Math.pow(this.trackable.getFieldY()-this.y,2));
		if(log) console.log("d = "+d+" <= "+x);
		return d <= x;
	}
}

$(function(){
	$('.field').width($('.field').width()*scalingFactor);
	$('.field').height($('.field').height()*scalingFactor);
	$('.wall').each(function(e){$(this).css('top',parseFloat($(this).css('top'))*scalingFactor+"px");});
	$('#fieldImg').css('background-size',parseInt($('#fieldImg').css('background-size'))*scalingFactor+"px");
	$('body').css('margin-top',parseInt($('body').css('margin-top'))*scalingFactor+"px");
	/**/
	mod0 = new Trackable(
		'mod0',
		/*/'Module 0 X',
		'Module 0 Y',/*/
		null,null,
		'Module 0 Angle',
		{
			width: 1.5,
			height: 4,
			scalar: scalingFactor*8,
			convertAngleToField: function(x){return x;}
		}
		);/*/
	mod0Tracer = new Traceable(
		mod0,
		'mod0Tracer',
		function(){return true;},
		'grey',
		1
		);/*/
	mod1 = new Trackable(
		'mod1',
		/*/'Module 1 X',
		'Module 1 Y',/*/
		null,null,
		'Module 1 Angle',
		{
			width: 1.5,
			height: 4,
			scalar: scalingFactor*8,
			convertAngleToField: function(x){return x;}
		}
		);/*/
	mod1Tracer = new Traceable(
		mod1,
		'mod1Tracer',
		function(){return true;},
		'grey',
		1
		);/*/
	mod2 = new Trackable(
		'mod2',
		/*/'Module 2 X',
		'Module 2 Y',/*/
		null,null,
		'Module 2 Angle',
		{
			width: 1.5,
			height: 4,
			scalar: scalingFactor*8,
			convertAngleToField: function(x){return x;}
		}
		);/*/
	mod2Tracer = new Traceable(
		mod2,
		'mod2Tracer',
		function(){return true;},
		'grey',
		1
		);/*/
	mod3 = new Trackable(
		'mod3',
		/*/'Module 3 X',
		'Module 3 Y',/*/
		null,null,
		'Module 3 Angle',
		{
			width: 1.5,
			height: 4,
			scalar: scalingFactor*8,
			convertAngleToField: function(x){return x;}
		}
		);/*/
	mod3Tracer = new Traceable(
		mod3,
		'mod3Tracer',
		function(){return true;},
		'grey',
		1
		);
	/**/
	pathHead = new Trackable(
		'pathHead',
//		'Path X',
//		'Path Y',
//		'Robot Heading',
		null,
		null,
		null,
		{
			width: 39,
			height: 34,
			scalar: scalingFactor,
			log: function(){
				console.log(NetworkTables.getValue(sd('Path Pose')));
				},
			smoothing: true,
			pose: 'Path Pose'
		}
		);

	pathTracer = new Traceable(
		pathHead,
		'pathTracer',
		{
//			condition: function(){return true;},
			condition: distLessThan(64),
//			color: function(){return rainbow(colors,colorIndex++);},
//			color: function(){return rainbow(1.0,(2/3)*(1.0-NetworkTables.getValue(sd('Path Velocity'))));},
			color: function(){return rainbow(1.0,(2/3)*(1.0-NetworkTables.getValue(sd('Path Pose'))[3]));},
			thiccness: 1
		}
		);
	
	robot = new Trackable(
		'robot',
		//'Robot X',
		//'Robot Y',
		//'Robot Heading',
		null,
		null,
		null,
		{
			pose: 'Robot Pose',
			width: 39,
			height: 34,
			scalar: scalingFactor
		}
		);
	robotAutoTracer = new Traceable(
		robot,
		'robotAutoTracer',
		{
//			condition: function(){return NetworkTables.getValue(sd('Auto')) && distLessThan(64);},
//			color: function(){return rainbow(colors,1);},
			color: function(){return rainbow(1.0,(2/3)*(1.0-NetworkTables.getValue(sd('Robot Velocity'))));},
			thiccness: 1,
			smoothing: false
		}
		);
	robotTeleTracer = new Traceable(
		robot,
		'robotTeleTracer',
		{
//			condition: function(){return !NetworkTables.getValue(sd('Auto')) && distLessThan(64);},
//			color: function(){return rainbow(colors,colorIndex++);},
			color: function(){return rainbow(1.0,(2/3)*(1.0-NetworkTables.getValue(sd('Robot Velocity'))));},
			thiccness: 1,
			smoothing: false
		}
		);
		
	vector = new Trackable(
		'vector',
		'Robot X',
		'Robot Y',
		'Vector Direction',
		{
			width: 0,
			height: function(){return 24*NetworkTables.getValue(sd('Vector Magnitude'));},
			scalar: scalingFactor
		}
		);

		
	$(robot.elem).append('<div class="frant">frant</div>');
	scale('#robot > .frant',['height','top','font-size']);
	scale('#robot',['border-width','border-radius']);
	scale('.field.overlay',['width','height']);
	NetworkTables.addRobotConnectionListener(function(state){$('#robot').css({"border-color":((state)?'#2222FF77':'#FF2222')});})
	onoffline = function(){$('#robot').css({"border-color":"#FF2222"});};
	NetworkTables.addKeyListener(sd('Auto'),function(key,state){if(state){traceables.reset()};});
});


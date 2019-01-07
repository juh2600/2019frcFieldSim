var tracks = []; // things created by Trackable()
var trackables = {}; // for functions that act on tracks

function Trackable(
	id,
	posXkey=null,
	posYkey=null,
	posTkey=null,
	options={}
) {
	var defaults = {
		pose: null, // a string, like 'Robot Pose'
		width: toFunction(0),
		height: toFunction(0),
		smoothing: true,
		scalar: 1,
		convertUnitsToField: function(x){return /*12.0**/t.scalar*x;},
		convertAngleToField: function(x){return x+90.0;},
		convertPositionToField: function(x,y){return [x,y];}, // FIXME: Implement mirror coordinate system by default
		isFromSD: true,
		log: function(){}
	};
	var o = $.extend({}, defaults, options || {});

	var t = {};
	t.id = id;
	t.scalar = o.scalar;
	t.width = toScaledFunction(o.width,t.scalar);
	t.height = toScaledFunction(o.height,t.scalar);
	$('#trackables').append('<div id="'+t.id+'" class="trackable"></div>');
	t.elem = $('#'+t.id)[0];
	$(t.elem).css({
		"width":t.width(),
		"height":t.height(),
		"top":(-t.height())/2,
		"left":(-t.width())/2
		});
	
	t.eventUpdate = new Event(t.id);
	t.pose = (o.isFromSD)?sd(o.pose):o.pose;
	
	// a function returning...? the key for each value, I think, as a string?
	t.keyX = toFunction((o.isFromSD)?sd(posXkey):posXkey);
	t.keyY = toFunction((o.isFromSD)?sd(posYkey):posYkey);
	t.keyT = toFunction((o.isFromSD)?sd(posTkey):posTkey);
	// a function probably returning the value of each element of the pose
	if(t.pose === null) {
		t.X = function(){return NetworkTables.getValue(t.keyX());};
		t.Y = function(){return NetworkTables.getValue(t.keyY());};
		t.T = function(){return NetworkTables.getValue(t.keyT());};
	} else {
		t.Pose = function(){return NetworkTables.getValue(t.pose);};
		t.X = function(){return t.Pose()[0];};
		t.Y = function(){return t.Pose()[1];};
		t.T = function(){return t.Pose()[2];};
	}
	// a function returning CSS transforms as strings
	t.translateX = function() {return 'translateX('+t.getFieldX()+'px)';};
	t.translateY = function() {return ' translateY('+t.getFieldY()+'px)';};
	t.rotateT = function() {return ' rotate('+t.getFieldT()+'deg)';};
	
	t.getFieldX = function() {return o.convertUnitsToField(t.X());};
	t.getFieldY = function() {return o.convertUnitsToField(t.Y());};
	t.getFieldT = function() {return o.convertAngleToField(t.T());};
	
	if(posXkey === null && t.pose === null) {t.X = function(){return null;}; t.translateX = function(){return '';};}
	if(posYkey === null && t.pose === null) {t.Y = function(){return null;}; t.translateY = function(){return '';};}
	if(posTkey === null && t.pose === null) {t.T = function(){return null;}; t.rotateT = function(){return '';};}

	t.log = o.log;
	
	t.update = function() {
//		console.log(t.X(),t.Y(),t.T());
		$(t.elem).css({
			"width":t.width(),
			"height":t.height(),
			"top":(-t.height())/2,
			"left":(-t.width())/2
		});
//		console.log(t.translateX()+t.translateY()+t.rotateT());
		$(t.elem).css('transform',t.translateX()+t.translateY()+t.rotateT());
		t.log();
		t.elem.dispatchEvent(t.eventUpdate);
	}
	if(t.pose !== null) {
		NetworkTables.addKeyListener(t.pose,t.update,true);
	}
	else if(posXkey === null && posYkey === null && !(posTkey === null)) {
		NetworkTables.addKeyListener(t.keyT(),t.update,true);
	}
	else if(o.smoothing) {
		NetworkTables.addKeyListener((posYkey===null)?t.keyX():t.keyY(),t.update,true);
	} else {
		NetworkTables.addKeyListener(t.keyX(),t.update,true);
		NetworkTables.addKeyListener(t.keyY(),t.update,true);
		if(posTkey !== null) NetworkTables.addKeyListener(t.keyT(),t.update,true);
	}
	
	console.log(t);
	tracks.push(t);
	return t;
}

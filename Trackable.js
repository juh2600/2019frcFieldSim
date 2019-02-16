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
		transformPose: function(Pose) {return Pose;}, // Takes a Pose {X,Y,T} and returns a Pose {X',Y',T'}
// Deprecated, use transformPose
//		convertUnitsToField: function(x){return /*12.0**/t.scalar*x;},
//		convertAngleToField: function(x){return x+90.0;},
//		convertPositionToField: function(x,y){return [x,y];}, // FIXME: Implement mirror coordinate system by default
		isFromSD: true,
		log: function(){}
	};
	var o = $.extend({}, defaults, options || {});

	var t = {};
	t.id = id;
	t.scalar = o.scalar;
	t.width = toScaledFunction(o.width,t.scalar);
	t.height = toScaledFunction(o.height,t.scalar);
	t.transformPose = o.transformPose;
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
	
	// functions returning the given pose and its components
	if(t.pose === null || t.pose == sd('null')) {
		t.X = function(){return NetworkTables.getValue(t.keyX());};
		t.Y = function(){return NetworkTables.getValue(t.keyY());};
		t.T = function(){return NetworkTables.getValue(t.keyT());};
		t.Pose = function(){return {X: t.X(), Y: t.Y(), T: t.T()};};
	} else {
		t.Pose = function(){
			var _pose = NetworkTables.getValue(t.pose);
			return {X: _pose[0], Y: _pose[1], T: _pose[2]};
		};
		t.X = function(){return t.Pose().X;};
		t.Y = function(){return t.Pose().Y;};
		t.T = function(){return t.Pose().T;};
	}

	t.updatePose = function(){
		t.CurrentPose = t.Pose();
		//console.log(t.CurrentPose);
		t.CurrentPose = $.extend({}, {X:0,Y:0,T:0}, t.CurrentPose || {});
		t.CurrentFieldPose = t.transformPose(t.CurrentPose);
	};
	t.CurrentPose = {X: 0, Y: 0, T: 0};
	t.CurrentFieldPose = t.transformPose(t.CurrentPose);
	
	// functions returning the transformed pose and its components
	t.getFieldPose = function() {return t.CurrentFieldPose;};
	t.getFieldX    = function() {return t.CurrentFieldPose.X;};
	t.getFieldY    = function() {return t.CurrentFieldPose.Y;};
	t.getFieldT    = function() {return t.CurrentFieldPose.T;};

	// a function returning CSS transforms as strings
	t.translateX = function() {return  'translateX('+t.getFieldX()+'px)';};
	t.translateY = function() {return ' translateY('+t.getFieldY()+'px)';};
	t.rotateT =    function() {return     ' rotate('+t.getFieldT()+'deg)';};
	
	if(posXkey === null && t.pose === null) {t.X = function(){return null;}; t.translateX = function(){return '';};}
	if(posYkey === null && t.pose === null) {t.Y = function(){return null;}; t.translateY = function(){return '';};}
	if(posTkey === null && t.pose === null) {t.T = function(){return null;}; t.rotateT = function(){return '';};}

	t.log = o.log;
	
	t.update = function() {
		t.updatePose();
		//console.log(t.X(),t.Y(),t.T());
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
	if(t.pose !== null && t.pose != sd('null')) {
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

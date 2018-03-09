var tracks = []; // things created by Trackable()
var trackables = {}; // for functions that act on tracks

function Trackable(
	id,
	posXkey,
	posYkey,
	posTkey=null,
	options={}
) {
	var defaults = {
		width: 0,
		height: 0,
		smoothing: true,
		scalar: 1,
		convertUnitsToField: function(x){return 12.0*t.scalar*x;},
		isFromSD: true
	};
	var o = $.extend({}, defaults, options || {});

	var t = {};
	t.id = id;
	t.scalar = o.scalar;
	t.width = o.width*t.scalar;
	t.height = o.height*t.scalar;
	$('#trackables').append('<div id="'+t.id+'" class="trackable"></div>');
	t.elem = $('#'+t.id)[0];
	$(t.elem).css({
		"width":t.width,
		"height":t.height,
		"top":(-t.height)/2,
		"left":(-t.width)/2
		});
	
	t.eventUpdate = new Event(t.id);
	
	
	t.keyX = toFunction((o.isFromSD)?sd(posXkey):posXkey);
	t.keyY = toFunction((o.isFromSD)?sd(posYkey):posYkey);
	t.keyT = toFunction((o.isFromSD)?sd(posTkey):posTkey);

	t.X = function(){return NetworkTables.getValue(t.keyX());};
	t.Y = function(){return NetworkTables.getValue(t.keyY());};
	t.T = function(){return NetworkTables.getValue(t.keyT());};
	t.translateX = function() {return 'translateX('+t.getFieldX()+'px)';};
	t.translateY = function() {return ' translateY('+t.getFieldY()+'px)';};
	t.rotateT = function() {return ' rotate('+t.getFieldT()+'deg)';};
	
	t.getFieldX = function() {return o.convertUnitsToField(t.X());};
	t.getFieldY = function() {return o.convertUnitsToField(t.Y());};
	t.getFieldT = function() {return t.T()+90;};
	
	if(posTkey === null) {t.T = function(){return null;}; t.rotateT = function(){return '';};}

	t.update = function() {
//		console.log(t.X(),t.Y(),t.T());
		$(t.elem).css('transform',t.translateX()+t.translateY()+t.rotateT());
		t.elem.dispatchEvent(t.eventUpdate);
	}
	if(o.smoothing) {
		NetworkTables.addKeyListener(t.keyX(),t.update,true);
	} else {
		NetworkTables.addKeyListener(t.keyX(),t.update,true);
		NetworkTables.addKeyListener(t.keyY(),t.update,true);
		if(posTkey !== null) NetworkTables.addKeyListener(t.keyT(),t.update,true);
	}
	
	console.log(t);
	tracks.push(t);
	return t;
}

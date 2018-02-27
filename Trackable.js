var tracks = []; // things created by Trackable()
var trackables = {}; // for functions that act on tracks

function Trackable(
	id,
	width,
	height,
	posXkey,
	posYkey,
	posTkey=null,
	color='rgb(0,0,255)',
	smoothing=false,
	scalar=1,
	convertUnitsToField=function(x){return 12.0*scalar*x;}
) {
	var t = {};
	t.id = id;
	t.scalar = scalar;
	t.width = width*scalar;
	t.height = height*scalar;
	t.color = color;
	$('#trackables').append('<div id="'+id+'" class="trackable"></div>');
	t.elem = $('#'+id)[0];
	$(t.elem).css({
		"width":t.width,
		"height":t.height,
		"top":(-t.height)/2,
		"left":(-t.width)/2,
		"border-color":t.color
		});
	
	t.eventUpdate = new Event(id);
	
	
	t.keyX = toFunction(posXkey);
	t.keyY = toFunction(posYkey);
	t.keyT = toFunction(posTkey);

	t.X = function(){return NetworkTables.getValue(t.keyX());};
	t.Y = function(){return NetworkTables.getValue(t.keyY());};
	t.T = function(){return NetworkTables.getValue(t.keyT());};
	t.translateX = function() {return 'translateX('+t.getFieldX()+'px)';};
	t.translateY = function() {return ' translateY('+t.getFieldY()+'px)';};
	t.rotateT = function() {return ' rotate('+t.getFieldT()+'deg)';};
	
	t.getFieldX = function() {return convertUnitsToField(t.X());};
	t.getFieldY = function() {return convertUnitsToField(t.Y());};
	t.getFieldT = function() {return t.T()+90;};
	
	if(posTkey === null) {t.T = function(){return null;}; t.rotateT = function(){return '';};}

	t.update = function() {
		console.log(t.X(),t.Y(),t.T());
		$(t.elem).css('transform',t.translateX()+t.translateY()+t.rotateT());
		t.elem.dispatchEvent(t.eventUpdate);
	}
	if(smoothing) {
		NetworkTables.addKeyListener(t.keyY(),t.update,true);
	} else {
		NetworkTables.addKeyListener(t.keyX(),t.update,true);
		NetworkTables.addKeyListener(t.keyY(),t.update,true);
		if(posTkey !== null) NetworkTables.addKeyListener(t.keyT(),t.update,true);
	}
	// not sure about this stuff
//	this.state = null; // set to "auto" or "tele" for tracing?
	// actually this isn't where we should check this
	console.log(t);
	tracks.push(t);
	return t;
}

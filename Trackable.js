function Trackable(
	id,
	width,
	height,
	posXkey,
	posYkey,
	posTkey=null,
	color='rgb(0,0,255)',
	smoothing=false,
	convertUnitsToField=function(x){return 12.0*x;}
) {
	var t = {};
	t.id = id;
	t.width = width;
	t.height = height;
	t.color = color;
	$('#trackables').append('<div id="'+id+'" class="trackable"></div>');
	t.elem = $('#'+id)[0];
	$(t.elem).css({
		"width":t.width,
		"height":t.height,
		"top":(-t.height)/2,
		"left":(-t.width)/2,
		"transform-origin":"50% 50%",
		"padding":0,
		"margin":0,
		"box-sizing":"border-box",
		"position":"fixed",
		"border-color":t.color,
		"border":"1px solid",
		});
	
	t.eventUpdate = new Event(id);
	
	
	t.keyX = toFunction(posXkey);
	t.keyY = toFunction(posYkey);
	t.keyT = toFunction(posTkey);

	t.X = function(){return NetworkTables.getValue(t.keyX());};
	t.Y = function(){return NetworkTables.getValue(t.keyY());};
	t.T = function(){return NetworkTables.getValue(t.keyT());};
	t.translateX = function() {return 'translateX('+convertUnitsToField(t.X())+'px)';};
	t.translateY = function() {return ' translateY('+convertUnitsToField(t.Y())+'px)';};
	t.rotateT = function() {return ' rotate('+(t.T()+90)+'deg)';};
	
	t.getX = function() {return convertUnitsToField(t.X());};
	t.getY = function() {return convertUnitsToField(t.Y());};
	t.getT = function() {return t.T();};
	
	if(posTkey === null) {t.T = function(){return null;}; t.rotateT = function(){return '';};}

	t.update = function() {
		console.log(t.getX(),t.getY(),t.getT());
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
	return t;
}

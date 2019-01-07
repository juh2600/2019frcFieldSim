var traces = []; // things created by Traceable()
var traceables = {}; // for functions that act on traces
traceables.reset = function(){
	for(t of traces) {
		t.reset();
	}
}

function Traceable(
	trackable,
	canvas,
	options={}
) {
	var defaults = {
//		condition: function(){return true;}, // gonna use an event instead // maybe // nah
		condition: distLessThan(64),
		color: function(){return 'red';},
		thiccness: function(){return 3;},
		newPathTrigger: function(){return false;} // how to tie this in with a listener?
	};
	var o = $.extend({}, defaults, options || {});
	
	var t = {};
	t.id = canvas;
	t.trackable = trackable;
	var field = $('#field');
	t.width = field.width();
	t.height = field.height();
	$('#traceables').append('<canvas id="'+canvas+'" class="field overlay" width="'+t.width+'" height="'+t.height+'"></canvas>');
	t.canvas = document.getElementById(canvas).getContext('2d');
	$(t.canvas).css({"width":t.width,"height":t.height});
	
//	t.getX = t.trackable.getX;
//	t.getY = t.trackable.getY;
	
	t.condition = toFunction(o.condition);
	
	t.color = toFunction(o.color);
	t.thiccness = toFunction(o.thiccness);
	
	t.x = 0;
	t.y = 0;
	
	t.penState = "up";
	
	t.updateInternalPosition = function() {
		t.x = t.trackable.getFieldX();
		t.y = t.trackable.getFieldY();
	}
	
	t.jump = function() {
		t.canvas.moveTo(t.x,t.y);
	}
	
	t.penDown = function(){
		t.penState = "down";
		t.canvas.beginPath();
		t.jump();
	};
	t.penUp = function(){
		t.penState = "up";
		t.canvas.closePath();
	};
	t.update = function(e){
		if(t.condition()){
			t.penDown();
			t.updateInternalPosition();
			t.canvas.lineTo(t.x,t.y);
			t.canvas.strokeStyle = t.color();
			t.canvas.lineWidth = t.thiccness();
			t.canvas.stroke();
		} else {
			if(t.penState=="down") {t.penUp();}
			t.updateInternalPosition();
		}
	};
	
	t.reset = function(){
		console.log(t.id + " reset");
		t.penUp();
		t.canvas.clearRect(0,0,t.width,t.height);
	};
	t.updateInternalPosition();
	t.jump();
	t.trackable.elem.addEventListener(t.trackable.id, t.update);
	console.log(t);
	traces.push(t);
	return t;
}

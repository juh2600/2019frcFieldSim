function Traceable(
	trackable,
	canvas,
	condition=function(){return true;}, // gonna use an event instead // maybe
	color=function(){return 'red';},
	thiccness=function(){return 3;}
) {
	var t = {};
	t.trackable = trackable;
	var field = $('#field');
	t.width = field.width();
	t.height = field.height();
	$('#traceables').append('<canvas id="'+canvas+'" class="field overlay" width="'+t.width+'" height="'+t.height+'"></canvas>');
	t.canvas = document.getElementById(canvas).getContext('2d');
	
	t.getX = t.trackable.getX;
	t.getY = t.trackable.getY;
	
	t.condition = condition;
	
//	t.color = toFunction(color);
//	t.thiccness = toFunction(thiccness);
	t.color = color;
	t.thiccness = thiccness;
	
	t.penState = "up";
	
	t.penDown = function(){
		t.penState = "down";
		t.canvas.beginPath();
		t.canvas.moveTo(t.getX(),t.getY());
		t.canvas.strokeStyle = toFunction(t.color)();
		t.canvas.lineWidth = toFunction(t.thiccness)();
	};
	t.penUp = function(){
		t.penState = "up";
		t.canvas.closePath();
	};
	t.update = function(e){
		if(t.condition()){
			if(t.penState=="up") {t.penDown();}
			t.canvas.lineTo(t.getX(),t.getY());
			t.canvas.stroke();
		} else if(t.penState=="down") {t.penUp();}
	};
	
	t.reset = function(){
		t.penUp();
		t.canvas.clearRect(0,0,t.width,t.height);
	};
	
	t.trackable.elem.addEventListener(t.trackable.id, t.update);
	console.log(t);
	return t;
}

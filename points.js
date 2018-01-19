var numColors = 8;
var pointNum = 0;

function makePoint(e) {
	let x = e.x;
	let y = e.y;
	let color = rainbow(numColors, pointNum++);
	points.beginPath();
	points.arc(x,y,4,0,2*Math.PI);
	points.fillStyle = color;
	points.fill();
	points.closePath();
	$('#circles').append('<div class="point-data-container"><span class="circle" style="background-color: '+color+'"></span><span class="point-data">('+x+', '+y+')</span></div>');
}
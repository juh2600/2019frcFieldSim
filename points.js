var pointNum = 0;

function makePoint(e) {
	let x = e.x;
	let y = e.y;
	let color = rainbow(numColors, pointNum++);
	/*
	points.beginPath();
	points.arc(x,y,4,0,2*Math.PI);
	points.fillStyle = color;
	points.fill();
	points.closePath();
	/**/
	$('#circles').append('<div data-index="'+pointNum+'" class="point-data-container"></div>');
	$('div.point-data-container[data-index='+pointNum+']').append(
		'<span class="circle" style="background-color: '+color+'"></span>'
	);
	$('div.point-data-container[data-index='+pointNum+']').append(
		'<input type="number" class="point-data xval" data-index="'+pointNum+'" value="'+round(toFeet(x))+'">'
	);
	$('div.point-data-container[data-index='+pointNum+']').append(
		'<input type="number" class="point-data yval" data-index="'+pointNum+'" value="'+round(toFeet(y))+'">'
	);
	$('div.point-data-container[data-index='+pointNum+']').append(
		'<input type="number" class="point-data tval" data-index="'+pointNum+'" value="90">'
	);
	$('#shadowbot-container').append('<div class="shadowbot" data-index="'+pointNum+'" data-x="'+(x-toInches(robotLength/2))+'" data-y="'+(y-toInches(robotWidth/2))+'"></div>');
	$('.shadowbot[data-index='+pointNum+']').css(
		{	"width":toInches(robotLength)+"px",
			"height":toInches(robotWidth)+"px",
			"border":"2px solid "+color,
			"transform":"translate("+(x-toInches(robotLength/2))+"px, "+(y-toInches(robotWidth/2))+"px)"
		});
}

function updateShadowbots() {
	let i = 0;
	while(i++<pointNum) {
		let x = $('input.xval[data-index='+i+']')[0].value - robotLength/2;
		let y = $('input.yval[data-index='+i+']')[0].value - robotWidth/2;
		let t = $('input.tval[data-index='+i+']')[0].value - 90;
//		console.log(i,x,y,t);
		let transform = "translateX("+toInches(x)+"px)";
		transform += " translateY("+toInches(y)+"px)";
		transform += " rotate("+t+"deg)";
//		console.log(transform);
		$('div.shadowbot[data-index='+i+']').css({"transform":transform});
	}
}

onchange = updateShadowbots;
onmousedown = function(e){
	switch(e.target) {
		case document.getElementById('robot'):
			onmousemove = function(e){setXYT(null, e.x, e.y, null);}
			break;
		case document.getElementById('points'):
			makePoint(e);
			break;
		default:
			console.log(e);
			break;
	}
}

onmouseup = function() {
	onmousemove = null;
}
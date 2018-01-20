onmousedown = function(e){
	switch(e.target) {
		case document.getElementById('robot'):
			onmousemove = function(e){
				X = e.x;
				Y = e.y;
				setXYT();
			}
			break;
		case document.getElementById('points'):
			switch(e.which) {
				case 1:
					makePoint(e);
					break;
				case 3:
					clearTrace();
					break;
				default:
					break;
			}
			break;
		default:
	//		console.log(e);
			break;
	}
}

onmouseup = function() {
	onmousemove = null;
}
onmousedown = function(e){
	switch(e.target) {
		case document.getElementById('robot'):
			onmousemove = function(e){
				X = toFeet(e.x);
				Y = toFeet(e.y);
				setXYT();
			}
			break;
		case document.getElementById('traceTele'):
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
		case document.getElementById('data'):
			break;
		default:
	//		console.log(e);
			break;
	}
}

onmouseup = function() {
	onmousemove = null;
}
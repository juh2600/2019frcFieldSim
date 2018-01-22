onkeydown = function(e) {
	var dist = toFeet(6);
	switch(e.key) {
		case 'ArrowLeft':
			T -= 5;
			while(T<0) T+=360;
			T %= 360;
			setXYT();
			break;
		case 'ArrowRight':
			T += 5;
			T %= 360;
			setXYT();
			break;
		case 'w':
			if(fieldCentric) {
				X += dist;
				setXYT();
			} else {
				X += Math.cos(T*Math.PI/180)*dist;
				Y += Math.sin(T*Math.PI/180)*dist;
				setXYT();
			}
			break;
		case 'a':
			if(fieldCentric) {
				Y -= dist;
				setXYT();
			} else {
				X -= Math.sin(-T*Math.PI/180)*dist;
				Y -= Math.cos(-T*Math.PI/180)*dist;
				setXYT();
			}
			break;
		case 's':
			if(fieldCentric) {
				X -= dist;
				setXYT();
			} else {
				X -= Math.cos(T*Math.PI/180)*dist;
				Y -= Math.sin(T*Math.PI/180)*dist;
				setXYT();
			}
			break;
		case 'd':
			if(fieldCentric) {
				Y += dist;
				setXYT();
			} else {
				X += Math.sin(-T*Math.PI/180)*dist;
				Y += Math.cos(-T*Math.PI/180)*dist;
				setXYT();
			}
			break;
		default: break;
	}
}
onkeydown = function(e) {
	var i = 5;
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
				X += i;
				setXYT();
			} else {
				X += Math.cos(T*Math.PI/180)*5;
				Y += Math.sin(T*Math.PI/180)*5;
				setXYT();
			}
			break;
		case 'a':
			if(fieldCentric) {
				Y -= i;
				setXYT();
			} else {
				X -= Math.sin(-T*Math.PI/180)*5;
				Y -= Math.cos(-T*Math.PI/180)*5;
				setXYT();
			}
			break;
		case 's':
			if(fieldCentric) {
				X -= i;
				setXYT();
			} else {
				X -= Math.cos(T*Math.PI/180)*5;
				Y -= Math.sin(T*Math.PI/180)*5;
				setXYT();
			}
			break;
		case 'd':
			if(fieldCentric) {
				Y += i;
				setXYT();
			} else {
				X += Math.sin(-T*Math.PI/180)*5;
				Y += Math.cos(-T*Math.PI/180)*5;
				setXYT();
			}
			break;
		default: break;
	}
}
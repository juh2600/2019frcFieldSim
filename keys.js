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
			X += i;
			setXYT();
			break;
			X += Math.cos(T*Math.PI/180)*5;
			Y += Math.sin(T*Math.PI/180)*5;
			setXYT();
			break;
		case 'a':
			Y -= i;
			setXYT();
			break;
			X -= Math.sin(-T*Math.PI/180)*5;
			Y -= Math.cos(-T*Math.PI/180)*5;
			setXYT();
			break;
		case 's':
			X -= i;
			setXYT();
			break;
			X -= Math.cos(T*Math.PI/180)*5;
			Y -= Math.sin(T*Math.PI/180)*5;
			setXYT();
			break;
		case 'd':
			Y += i;
			setXYT();
			break;
			X += Math.sin(-T*Math.PI/180)*5;
			Y += Math.cos(-T*Math.PI/180)*5;
			setXYT();
			break;
		default: break;
	}
}
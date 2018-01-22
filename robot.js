function getX() {
	if(NetworkTables.isRobotConnected())
		X = NetworkTables.getValue(posXkey);
	return X;
}
function getY() {
	if(NetworkTables.isRobotConnected())
		Y = NetworkTables.getValue(posYkey);
	return Y;
}
function getT() {
	if(NetworkTables.isRobotConnected())
		T = (NetworkTables.getValue(posTkey) + 90) % 360;
	return T;
}
function transX(x) {
	return 'translateX('+(x-toInches(robotLength/2))+'px) ';
}
function transY(y) {
	return 'translateY('+(y-toInches(robotWidth/2))+'px) ';
}
function rotate(t) {
	return 'rotate('+t+'deg) ';
}
function refresh(thing = null) {
	X = getX();
	Y = getY();
	T = getT();
	setXYT();
}

pathColorIndex = 0;
zeroTol = 0.2;
function setXYT(thing = null) {
/*/		let x = getX();
		let y = getY();
		let t = getT();
	console.log([x,y,t]);
	X = x;
	Y = y;
	T = t;
/*/
// consider moving this to end of function, then using X-x et al. to determine whether we've jumped
	x = X;
	y = Y;
	t = T;
/**/
	transform = transX(toInches(x)) + transY(toInches(y)) + rotate(t);
	$('#robot').css('transform',transform);
	if(trace() !== null) {
		if((Math.abs(x-Xinit)<zeroTol && Math.abs(y-Yinit)<zeroTol && Math.abs(t-Tinit)<zeroTol) ||
			(x === 0 && y === 0 && t === 0)) {
			let s = trace.strokeStyle;
//			trace.strokeStyle = 'red';
//			trace.stroke();
			trace().closePath();
			let color = rainbow(numColors,pathColorIndex++);
			console.log('Robot zeroed\nClosed path '+s+'\nBeginning path '+color+'\n');
			trace().strokeStyle = color;
			trace().beginPath();
		}
		trace().lineTo(toInches(x),toInches(y));
		trace().stroke();
	}
	$('#posX').text(round(x));
	$('#posY').text(round(y));
	$('#posT').text(round(t));
}

// Listen for changes to relevant keys
/*/
NetworkTables.addKeyListener(posXkey,setXYT,true);
NetworkTables.addKeyListener(posYkey,setXYT,true);
NetworkTables.addKeyListener(posTkey,setXYT,true);
/*/
NetworkTables.addKeyListener(posXkey,refresh,true);
NetworkTables.addKeyListener(posYkey,refresh,true);
NetworkTables.addKeyListener(posTkey,refresh,true);
/**/

function clearTrace() {
	traceAuto.closePath();
	traceAuto.clearRect(0,0,toInches(fieldLength),toInches(fieldWidth));
	drawField(traceAuto);
	traceAuto.beginPath();
	traceTele.closePath();
	traceTele.clearRect(0,0,toInches(fieldLength),toInches(fieldWidth));
	drawField(traceTele);
	traceTele.beginPath();
}
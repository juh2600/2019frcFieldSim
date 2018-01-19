// Names of relevant keys
posXkey = '/SmartDashboard/Robot X';
posYkey = '/SmartDashboard/Robot Y';
posTkey = '/SmartDashboard/ Heading Angle ';

// Sorted list of keys on SmartDashboard
sd = NetworkTables.getKeys().filter(function(key){return (key.indexOf('SmartDashboard') !==-1)?true:false;}).sort();

// Initial position of robot
X = 14;
Y = 168;
T = 0;

function getX() {
	if(NetworkTables.isRobotConnected())
		X = NetworkTables.getValue(posXkey);
	return X;
}
function getY() {
	if(NetworkTables.isRobotConnected())
		Y = -NetworkTables.getValue(posYkey);
	return Y;
}
function getT() {
	if(NetworkTables.isRobotConnected())
		T = NetworkTables.getValue(posTkey);
	return T;
}
function transX(x) {
	return 'translateX('+(x-(robotLength/2))+'px) ';
}
function transY(y) {
	return 'translateY('+(y-(robotWidth/2))+'px) ';
}
function rotate(t) {
	return 'rotate('+t+'deg) ';
}
function setXYT(thing = null, x=getX(), y=getY(), t=getT()) {
/*			let x = getX();
	let y = getY();
	let t = getT();/**/
	console.log([x,y,t]);
	if(t===null) {
		t = T;
	}
	X = x;
	Y = y;
	T = t;
	transform = transX(x) + transY(y) + rotate(t);
	$('#robot').css('transform',transform);
	trace.lineTo(x,y);
	trace.stroke();
	$('#posX').text(x);
	$('#posY').text(y);
	$('#posT').text(t);
}

// Listen for changes to relevant keys
NetworkTables.addKeyListener(posXkey,setXYT,true);
NetworkTables.addKeyListener(posYkey,setXYT,true);
NetworkTables.addKeyListener(posTkey,setXYT,true);
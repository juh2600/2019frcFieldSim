function toFeet(x) {return x/12;}
function toInches(x) {return x*12;}
var roundTo = 3;
function round(x) {
	return Math.round(x*10**roundTo)/10**roundTo;
}

function trace() {
	return (NetworkTables.getValue(pathFinKey))?traceAuto:traceTele;
}

function drawField(canvas) {
	canvas.drawImage(fieldImg,0,0);
}

function saveAutoPaths() {
	Canvas2Image.saveAsPNG(traceAutoCanvas,traceAutoCanvas.width,traceAutoCanvas.height);
}

function saveTelePaths() {
	Canvas2Image.saveAsPNG(traceTeleCanvas,traceTeleCanvas.width,traceTeleCanvas.height);
}

function updateSaveButtons() {
	traceNow = (NetworkTables.getValue(pathFinKey))?$('#saveAuto'):$('#saveTele');
	$('#saveAuto').css('font-weight','normal');
	$('#saveTele').css('font-weight','normal');
	traceNow.css('font-weight','bold');
}
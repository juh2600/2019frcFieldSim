function toFeet(x) {return x/12;}
function toInches(x) {return x*12;}
var roundTo = 3;
function round(x) {
	return Math.round(x*10**roundTo)/10**roundTo;
}
function toFunction(f) {
	if(typeof(f)=="function") return f;
	return function(){return f;};
}
function toScaledFunction(f,scal) {
	if(typeof(f)=="function") return function(){return scal*f();};
	return function(){return scal*f;};
}
function sd(k) {return '/SmartDashboard/'+k}
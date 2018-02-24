function toFunction(f) {
	if(typeof(f)=="function") return f;
	return function(){return f;};
}
function sd(k) {return '/SmartDashboard/'+k}
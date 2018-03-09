

var Widget = {};
var Widget.Base;
var Widget.Bool;
var Widget.Num;
var Widget.Text;
var Widget.Graph;

Widget.Base = function(
	id,
	key,
	parent='body',
	cls='',
	refreshCondition=function(){return true;},
	isFromSD=true
) {
	var t = {};
	t.id = id;
	t.key = (isFromSD)?sd(key):key;
	t.eventUpdate = new Event(id);
	t.parent = $(parent)[0];
	$(t.parent).append('<div id="'+t.id+'" class="'+cls+'"></div>');

	t.elem = $('#'+t.id)[0];
	t.getValue = function() {return NetworkTables.getValue(t.key);};
	t.setValue = function(v) {return NetworkTables.setValue(t.key,v);};
	t.refreshCondition = toFunction(refreshCondition);
	t.update = function() {
		if(t.refreshCondition()) {
			t.elem.dispatchEvent(t.eventUpdate);
		}
	};
	NetworkTables.addKeyListener(t.key,t.update,true);
	
	console.log(t);
	return t;
}
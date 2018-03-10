function rollingArray(key,options={}) {
	var t = [];
	t.key = key;
	var defaults = {
		size: 10,
		values: [],
		puush: function(){
			t.shift();
//			console.log(t.key + ' : ' + NetworkTables.getValue(t.key));
			t.push(NetworkTables.getValue(t.key));
			return t;
			}
	};
	var o = $.extend({},defaults,options||{});
	t = o.values;
	t.key = key;
	t.length = o.size;
	t.puush = o.puush;
	t.pusher = function(){return t.puush();}
	NetworkTables.addKeyListener(t.key,t.pusher);
	console.log(t);
	return t;
}
//var array = [];
//array.length = 10;
//array.puush = function(x) {this.shift(); this.push(x); return this;};
var indices = new rollingArray(sd('Robot X'),
	{values: [-9,-8,-7,-6,-5,-4,-3,-2,-1,0]}
);
indices.puush = function(){
	var i = this.length + this.shift();
	this.push(i);
	console.log(this);
	};
indices.shift(); indices.unshift(0);
/*
var array = new rollingArray(sd('Robot X'));
/**/
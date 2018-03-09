function Module(options){
    var defaults = {
        color : 'red',
    };
    var actual = $.extend({}, defaults, options || {});
    console.info( actual.color );
}

var a = new Module();
// Red
var b = new Module( { color: 'blue' } );
// Blue
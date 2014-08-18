// object to store last event position
var touchMoveBase = {
	set: function(point) {
		this.x = point.x;
		this.y = point.y;
	}
};

// position - initialized with values before it has been animated
var position = {
	source1: {
		top: $.source1.top,
		left: $.source1.left
	},
	source2:{
		top: $.source2.top,
		left: $.source2.left
	}
 };

function withinTarget(source){
	var idx = source.id.replace(/source/, "");
	var target = $["target" + idx];
	// if source's top and left within target boundaries then snap it to the target
	var inside = position[source.id].top > target.top && position[source.id].top < (target.top + target.height) &&
					position[source.id].left > target.left && position[source.id].left < (target.left + target.width);
	if(inside){
		source.top = target.top;
		source.left = target.left;
	}
}

function touchHandler(e) {
		var source = e.source;

        if(e.type == "touchstart") {
			// get absolute position at start
			touchMoveBase.set(e);

        }else if(e.type == "touchmove") {
			// update the co-ordinates based on movement since last movement or touch start
			position[source.id].top += e.y - touchMoveBase.y;
			position[source.id].left += e.x - touchMoveBase.x;
			source.animate({
				top: position[source.id].top,
				left: position[source.id].left,
				duration: 200
			});
			// reset absolute position to current position so next event will be relative to current position
			touchMoveBase.set(e);
	    } else if(e.type == "touchend") {
			withinTarget(source);
        } else if(e.type == "touchcancel") {
			Titanium.API.info('cancel: ' + JSON.stringify(e));
        } else {
            Ti.API.info("Not a valid touch event");
        }
}


$.index.open();

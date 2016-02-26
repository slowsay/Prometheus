/**
 * @author slowsay
 */
Prometheus.Point = function(x, y) {
	/*
	 * @property x
	 * @type Number
	 * @property y
	 * @type Number
	 */
	this.x = x || 0;
	this.y = y || 0;
};
Prometheus.Point.prototype.constructor = Prometheus.Point;
/*
 * @methond clone
 * Class Point
 */
Prometheus.Point.prototype.clone = function() {
	return new Prometheus.Point(this.x, this.y);
};
/*
 * @method set
 */
Prometheus.Point.prototype.set = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};


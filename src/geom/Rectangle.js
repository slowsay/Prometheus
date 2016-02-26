/**
 * @author slowsay
 */
Prometheus.Rectangle = function(x, y, w, h) {
	Prometheus.DisplayObject.call(this);
	/*
	 * @property x,y,width,height
	 */
	this.width = w || 0;
	this.height = h || 0;
	this.x = x || 0;
	this.y = y || 0;
};
Prometheus.Rectangle.prototype = Object.create(Prometheus.DisplayObject.prototype);
Prometheus.Rectangle.prototype.constructor = Prometheus.Rectangle;

Prometheus.Rectangle.prototype.clone = function() {
	return new Prometheus.Rectangle(this.x, this.y, this.width, this.height);
};

Prometheus.Rectangle.prototype.contains = function(x, y) {
	if (this.width <= 0 || this.height <= 0)
		return false;
	if (x > this.x && x < this.x + this.width) {
		if (y > this.y && y < this.y + this.height) {
			return true;
		}
	}

	return false;
};

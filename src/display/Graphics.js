/**
 * @author slowsay
 */
/*
 * @method Graphics
 */
Prometheus.Graphics = function() {
	Prometheus.DisplayObjectContainer.call(this);
};
Prometheus.Graphics.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Graphics.prototype.constructor = Prometheus.Graphics;

/*
 * @method beginfill
 * @type
 */
Prometheus.Graphics.prototype.beginFill = function(color, alpha) {
	this.filling = true;
	this.fillcolor = color || 0x000000;
	this.fillalpha = alpha || 1;
	return this;
};
/*
 * @method endfill
 */
Prometheus.Graphics.prototype.endFill = function() {
	this.filling = false;
	this.fillcolor = null;
	this.fillalpha = 1;
	return this;
};

/*
 * @method drawRect
 *
 */
Prometheus.Graphics.prototype.drawRect = function(x, y, w, h) {
	this.rect = new Prometheus.Rectangle(x, y, w, h);
	return this;
};

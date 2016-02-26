/**
 * @author slowsay
 */
/*
 * @method stage
 */
Prometheus.Stage = function(bgcolor) {
	Prometheus.DisplayObjectContainer.call(this);
	this.stage = this;
	/*
	 *@property interactive
	 */
	this.interactive = true;
	/*
	 * @property stage clear
	 */
	this.dirty = true;
	/*
	 *@property hitarea
	 */
	this.stage.hitArea = new Prometheus.Rectangle(0, 0, 100, 100);
	/*
	 * setbackground
	 */
	this.setBgColor(bgcolor);
};
Prometheus.Stage.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Stage.prototype.constructor = Prometheus.Stage;
/*
 * @method setbgColor
 */
Prometheus.Stage.prototype.setBgColor = function(color) {
	this.backgroundcolor = color || 0x000000;
	this.backgroundColorSplit = Prometheus.hex2rgb(color);
	this.backgroundString = '#' + this.backgroundcolor.toString(16);
};
/*
 * @method updateTransform
 */
Prometheus.Stage.prototype.updateTransform = function() {
	var child;
	for (var i = 0, j = this.children.length; i < j; i++) {
		child = this.childrend[i];
		child.updateTransForm();
	};

};

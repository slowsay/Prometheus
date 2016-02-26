/**
 * @author slowsay
 */

/*
 * @method CanvasRender
 */

Prometheus.CanvasRender = function(w, h, view, transparent) {
	this.width = w || 550;
	this.height = h || 400;
	this.transparent = !!transparent;
	this.view = view || document.createElement('canvas');
	this.context = this.view.getContext('2d', {
		alpha : this.transparent
	});
	this.clearBeforeRender = true;
	this.view.width = this.width;
	this.view.height = this.height;

	/*
	 * @property image smoothing session
	 */
	this.renderSession = {
		context : this.context,
		session : null
	};
	if ('imageSmoothingEnabled' in this.context)
		this.renderSession.session = 'imageSmoothingEnabled';
	else if ('webkitImageSmoothingEnabled' in this.context)
		this.renderSession.session = 'webkitImageSmoothingEnabled';
	else if ('mozImageSmoothingEnabled' in this.context)
		this.renderSession.session = 'mozImageSmoothingEnabled';
	else if ('oImageSmoothingEnabled' in this.context)
		this.renderSession.session = 'oImageSmoothingEnabled';

};
Prometheus.CanvasRender.prototype.constructor = Prometheus.CanvasRender;
/*
 * @method render
 */
Prometheus.CanvasRender.prototype.render = function(stage) {

	/*
	 *@property fillstyle clearRect
	 */
	if (!this.transparent && this.clearBeforeRender)
		this.context.fillStyle = stage.backgroundString, this.context.fillRect(0, 0, this.width, this.height);
	else if (this.transparent && this.clearBeforeRender)
		this.context.clearRect(0, 0, this.width, this.height);
	/*
	 * @method renderDisplayObject
	 */
	this.renderDisplayObject(stage);
};
/*
 * @method renderDisplayObject
 */
Prometheus.CanvasRender.prototype.renderDisplayObject = function(disobj, context) {
	this.renderSession.context = context || this.context;
	disobj.renderCanvas(this.renderSession);
};
/*
 * @method timefp
 */
Prometheus.CanvasRender.prototype.returnfps = function() {
	this.now = new Date();
	this.fps = 1000 / (this.now - this.lastime || 0);
	this.lastime = this.now;
	return this.fps;
};
/*
 * @method resize
 */
Prometheus.CanvasRender.prototype.resize = function(w, h) {
	this.width = w || 550;
	this.height = h || 400;
	this.view.width = w;
	this.view.height = h;

};
/*
 * @method clear
 */
Prometheus.CanvasRender.prototype.clear = function() {
	this.context.clearRect(0, 0, this.width, this.height);
};

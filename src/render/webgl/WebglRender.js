/**
 * @author slowsay
 */
Prometheus.WebGlRender = function(w, h, view, transparent) {

	this.transparent = !!transparent;
	/*
	 * @property width
	 */
	this.width = w || 500;
	/*
	 * @property height
	 */
	this.height = h || 400;

	this.view = view || document.createElement('canvas');
	this.view.width = this.width;
	this.view.height = this.height;
	this.option = {
		alpha : this.transparent
	};
	this.context = null;
	['experimental-webgl', 'webgl'].forEach(function(e) {
		this.context = this.context || this.view.getContext(e, this.option);
	}, this);
	if (!this.context)
		this.context = this.view.getContext('2d', this.option);

};
Prometheus.WebGlRender.prototype.constructor = Prometheus.WebGlRender;

/*
 * @method render
 */
Prometheus.WebGlRender.prototype.render = function(stage) {

};
/*
 * @method resize
 */
Prometheus.WebGlRender.prototype.resize = function(w, h) {
	this.width = w;
	this.height = h;

	this.view.width = this.width;
	this.view.height = this.height;

	this.context.viewport(0, 0, this.width, this.height);
};


/**
 * @class Prometheus.WebGlRender
 * @param width
 * @param height
 * @param view
 * @param transparent
 * @constructor
 */
Prometheus.WebGlRender = function (width, height, view, transparent) {

    this.transparent = !!transparent;
    this.width = width || 500;
    this.height = height || 400;

    this.view = view || document.createElement('canvas');
    this.view.width = this.width;
    this.view.height = this.height;
    this.option = {
        alpha: this.transparent
    };
    this.context = null;
    //webgl
    ['experimental-webgl', 'webgl'].forEach(function (e) {
        this.context = this.context || this.view.getContext(e, this.option);
    }, this);
    if (!this.context)
        this.context = this.view.getContext('2d', this.option);

};
Prometheus.WebGlRender.prototype.constructor = Prometheus.WebGlRender;

/**
 * @method render
 * @param stage
 */
Prometheus.WebGlRender.prototype.render = function (stage) {

};
/**
 * @method resize
 * @param w
 * @param h
 */
Prometheus.WebGlRender.prototype.resize = function (w, h) {
    this.width = w;
    this.height = h;

    this.view.width = this.width;
    this.view.height = this.height;

    this.context.viewport(0, 0, this.width, this.height);
};


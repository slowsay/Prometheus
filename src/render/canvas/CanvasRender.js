/**
 * @method CanvasRender
 */
Prometheus.CanvasRender = function (w, h, view, transparent) {
    this.width = w || 550;
    this.height = h || 400;
    this.transparent = !!transparent;
    this.view = view || document.createElement('canvas');
    this.context = this.view.getContext('2d', {
        alpha: this.transparent
    });
    this.clearBeforeRender = true;
    this.view.width = this.width;
    this.view.height = this.height;
    /**
     * fps
     * @type {number}
     */
    this.lastime = 0;
    this.lastupdate = 0;
    this.lastfps = 0;
    /**
     * @property image smoothing session
     */
    this.renderSession = {
        context: this.context,
        session: null
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
/**
 * @method render
 */
Prometheus.CanvasRender.prototype.render = function (stage) {
    stage.updateTransform();
    /**
     * @property fillstyle clearRect
     */
    if (!this.transparent && this.clearBeforeRender)
        this.context.fillStyle = stage.backgroundString, this.context.fillRect(0, 0, this.width, this.height);
    else if (this.transparent && this.clearBeforeRender)
        this.context.clearRect(0, 0, this.width, this.height);

    /**
     * @method renderDisplayObject
     */
    this.renderDisplayObject(stage);
};
/**
 * @method renderDisplayObject
 */
Prometheus.CanvasRender.prototype.renderDisplayObject = function (obj, context) {
    this.renderSession.context = context || this.context;
    obj.renderCanvas(this.renderSession);
};
/**
 * @method timefp
 */
Prometheus.CanvasRender.prototype.returnfps = function () {
    var _now = +new Date();
    var fps = 1000 / (_now - this.lastime);
    this.lastime = _now;
    return fps;
};
Prometheus.CanvasRender.prototype.status = function () {
    var _fps = 0;
    var _now = +new Date();
    _fps = this.returnfps();
    if (_now - this.lastupdate > 1000) {
        this.lastupdate = _now;
        this.lastfps = _fps;
    }
    return this.lastfps.toFixed();
}

/**
 * @method resize
 * @params {Number} w
 * @params {Number} h
 */
Prometheus.CanvasRender.prototype.resize = function (w, h) {
    this.width = w || 550;
    this.height = h || 400;
    this.view.width = w;
    this.view.height = h;
};
/**
 * @method clear
 */
Prometheus.CanvasRender.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

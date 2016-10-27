/**
 * @method Prometheus.CanvasRender
 * @param width
 * @param height
 * @param view
 * @param transparent
 * @constructor
 */
Prometheus.CanvasRender = function (width, height, view, transparent) {
    this.width = width || 550;
    this.height = height || 400;
    this.transparent = !!transparent;
    this.view = view || document.createElement('canvas');
    this.offview = document.createElement('canvas');
    this.offcontext = this.offview.getContext('2d');
    this.context = this.view.getContext('2d', {
        alpha: this.transparent
    });
    this.clearBeforeRender = true;
    this.view.width = this.width;
    this.view.height = this.height;
    this.offview.width = this.width;
    this.offview.height = this.height;
    this.lastime = 0;
    this.lastupdate = 0;
    this.lastfps = 0;
    this.renderSession = {
        offview: this.offview,
        offcontext: this.offcontext,
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
 * @param stage
 */
Prometheus.CanvasRender.prototype.render = function (stage) {
    stage.width=this.width,stage.height=this.height;
    if (!this.transparent && this.clearBeforeRender)
        this.context.fillStyle = stage.backgroundString, this.context.fillRect(0, 0, this.width, this.height);
    else if (this.transparent && this.clearBeforeRender)
        this.context.clearRect(0, 0, this.width, this.height);
    stage.updateTransform();
    this.renderDisplayObject(stage);
};
/**
 * @method renderDisplayObject
 * @param obj
 * @param context
 */
Prometheus.CanvasRender.prototype.renderDisplayObject = function (obj, context) {
    this.renderSession.context = context || this.context;
    obj.renderCanvas(this.renderSession);
};
/**
 * @method timefp
 * @returns {number}
 */
Prometheus.CanvasRender.prototype.returnfps = function () {
    var _now = +new Date();
    var fps = 1000 / (_now - this.lastime);
    this.lastime = _now;
    return fps;
};
/**
 * @method status
 * @returns {string}
 */
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
 * @param width
 * @param height
 */
Prometheus.CanvasRender.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;
    this.view.width = this.width;
    this.view.height = this.height;
    this.offview.width = this.width;
    this.offview.height = this.height;
};
/**
 * @method clear
 */
Prometheus.CanvasRender.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

/**
 * @method clear
 */
Prometheus.CanvasRender.prototype.offclear = function () {
    this.offcontext.clearRect(0, 0, this.width, this.height);
};
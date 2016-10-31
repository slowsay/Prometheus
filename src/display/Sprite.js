/**
 * @method sprite
 */
Prometheus.Sprite = function () {
    Prometheus.DisplayObjectContainer.call(this);
    /**
     * @property texture
     */
    this.textureSprite = [];

};
Prometheus.Sprite.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Sprite.prototype.constructor = Prometheus.Sprite;
/**
 * @method setTexture
 */

Prometheus.Sprite.prototype.setTexture = function (texture) {
    var _img = new Image(), _this = this;
    _img.src = texture;
    _img.onload = function (e) {
        _this.width = e.target.width, _this.height = e.target.height;
        _this.swidth = e.target.width, _this.sheight = e.target.height;
    };
    this.textureSprite.push({
        path: texture,
        sx: this.sx, sy: this.sy,
        swidth: this.swidth, sheight: this.sheight,
        x: this.x, y: this.y,
        img: _img
    })
    return this;
};
/**
 *@method updateTransform
 */
Prometheus.Sprite.prototype.updateTransform = function () {
    for (var i = 0, arr = this.textureSprite; i < arr.length; i++) {
        arr[i].x = this.x, arr[i].y = this.y, arr[i].width = this.width, arr[i].height = this.height;
        arr[i].sx = this.sx, arr[i].sy = this.sy, arr[i].swidth = this.swidth, arr[i].sheight = this.sheight;
    }
};

/**
 * @method rendercanvas
 * rect设置区域
 * clip剪切区域
 */
Prometheus.Sprite.prototype.renderCanvas = function (session) {
    var ctx2d = session.context;
    var off2d = session.offcontext;
    var offview = session.offview;
    if (this.visible === false || this.alpha === 0)
        return;

    var _wid = this.stage.width, _hei = this.stage.height;
    for (var i = 0, arr = this.textureSprite; i < arr.length; i++) {
        var sx = arr[i].sx, sy = arr[i].sy, dx = arr[i].x, dy = arr[i].y, sw = arr[i].swidth, sh = arr[i].sheight, WW = arr[i].width, HH = arr[i].height;
        var _img = arr[i].img;
        var w = _img.width || 0, h = _img.height || 0;
        //off2d.setTransform(1, 0, 0, 1, 0, 0);
        off2d.clearRect(0, 0, _wid, _hei);
        off2d.drawImage(_img, sx, sy, sw, sh, dx, dy, WW, HH);
    }
    ctx2d.drawImage(offview, 0, 0);
};

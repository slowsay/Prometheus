/**
 * Created by slowsay on 16/10/26.
 */
'use sturct';
Prometheus.Spritemap = function () {
    Prometheus.DisplayObjectContainer.call(this);
    /**
     * @property texture
     */
    this.textureSprite = [];

};

Prometheus.Spritemap.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Spritemap.prototype.constructor = Prometheus.Spritemap;
/**
 * @method setTexture
 */

Prometheus.Spritemap.prototype.setTexture = function (texture) {
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
Prometheus.Spritemap.prototype.updateTransform = function () {
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
Prometheus.Spritemap.prototype.renderCanvas = function (session) {
    var ctx2d = session.context;
    var off2d = session.offcontext;
    var offview = session.offview;
    var _wid = this.stage.width, _hei = this.stage.height;
    if (this.visible === false || this.alpha === 0)
        return;
    ctx2d.save();
    for (var i = 0, arr = this.textureSprite; i < arr.length; i++) {
        var sx = arr[i].sx, sy = arr[i].sy, dx = arr[i].x, dy = arr[i].y, sw = arr[i].swidth, sh = arr[i].sheight, WW = arr[i].width, HH = arr[i].height;
        var _img = arr[i].img;
        var w = _img.width || 0, h = _img.height || 0;
        var row = Math.ceil(_hei / h);
        var offsetx = 0, offsety = 0;
        off2d.clearRect(0, 0, _wid, _hei);
        off2d.beginPath();
        off2d.rect(0, 0, w, _hei);
        off2d.clip();
        offsetx = .1 + dx % w, offsety = .1 + dy % h;
        if (dx > 0)
            offsetx -= w;
        if (dy > 0)
            offsety -= h;
        off2d.drawImage(_img, sx, sy, w, h, 0, offsety, w, h);
        off2d.drawImage(_img, sx, sy, w, h, 0, row * h + offsety, w, h);
    }
    ctx2d.drawImage(offview, 0, 0);
    ctx2d.restore();
};

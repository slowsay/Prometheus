/**
 * @method sprite
 */
Prometheus.Sprite = function () {
    Prometheus.DisplayObjectContainer.call(this);
    this.sx = 0, this.sy = 0;
    this.swidth = 0, this.sheight = 0;
    /**
     * @property texture
     */
    this.textureSprite = [];

};
Prometheus.Sprite.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Sprite.prototype.constructor = Prometheus.Sprite;

Object.defineProperty(Prometheus.DisplayObject, 'sx', {
    set: function (v) {
        this.sx = v;
    },
    get: function () {
        return this.sx;
    }
});
Object.defineProperty(Prometheus.DisplayObject, 'sy', {
    set: function (v) {
        this.sy = v;
    },
    get: function () {
        return this.sy;
    }
});
Object.defineProperty(Prometheus.DisplayObject, 'swidth', {
    set: function (v) {
        this.swidth = v;
    },
    get: function () {
        return this.swidth;
    }
});
Object.defineProperty(Prometheus.DisplayObject, 'sheight', {
    set: function (v) {
        this.sheight = v;
    },
    get: function () {
        return this.sheight;
    }
});
/**
 * @method setTexture
 */

Prometheus.Sprite.prototype.drawImages = function (texture) {
    this.textureSprite.push({
        path: texture,
        sx: this.sx, sy: this.sy,
        swidth: this.swidth, sheight: this.sheight,
        x: this.x, y: this.y
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
 */
Prometheus.Sprite.prototype.renderCanvas = function (session) {
    var _this = this;
    if (this.visible === false || this.alpha === 0)
        return;
    for (var i = 0, arr = this.textureSprite; i < arr.length; i++) {
        var _img = new Image();
        _img.src = arr[i].path;
        _img.onload = function (e) {
            _this.width = e.target.width, _this.height = e.target.height;
            _this.swidth = e.target.width, _this.sheight = e.target.height;
        };
        session.context.drawImage(_img, arr[i].sx, arr[i].sy, arr[i].swidth, arr[i].sheight, arr[i].x, arr[i].y, arr[i].width, arr[i].height);
    }
};

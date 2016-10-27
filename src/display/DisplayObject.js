/**
 * @method Prometheus.DisplayObject
 * @constructor
 */
Prometheus.DisplayObject = function () {
    this.name = '';
    this.x = 0;
    this.y = 0;
    this.sx = 0;
    this.sy = 0;
    this.swidth = 0;
    this.sheight = 0;
    this.width = 0;
    this.height = 0;
    /**
     * @description 缩放
     * @type {Prometheus.Point}
     */
    this.scale = new Prometheus.Point(1, 1);
    /**
     * @description 轴中心点
     * @type {Prometheus.Point}
     */
    this.pivot = new Prometheus.Point(0, 0);
    /**
     * @description 旋转
     * @type {number}
     */
    this.rotation = 0;
    /**
     * @type {null}
     */
    this.mask = null;
    /**
     *
     * @type {null}
     */
    this.parent = null;
    /**
     * @descripton 透明度
     * @type {number}
     */
    this.alpha = 1;
    /**
     *
     * @type {number}
     */
    this.autoAlpha = 1;
    /**
     *
     * @type {boolean}
     */
    this.visible = true;
    /**
     *
     * @type {null}
     */
    this.stage = null;
    /**
     *
     * @type {boolean}
     */
    this.animate = false;
    /**
     *
     * @type {boolean}
     */
    this.buttonMode = false;
    /**
     *
     * @type {Array}
     */
    this.children = [];
    /**
     *
     * @type {Array}
     */
    this.numChildren = [];
};
Prometheus.DisplayObject.prototype.constructor = Prometheus.DisplayObject;
/**
 * @method interactive
 */
Object.defineProperty(Prometheus.DisplayObject, 'interactive', {});
/**
 * @parms {Number} x
 */
Object.defineProperty(Prometheus.DisplayObject, 'x', {
    set: function (v) {
        this.position.x = v;
    },
    get: function () {
        return this.position.x;
    }
});
Object.defineProperty(Prometheus.DisplayObject, 'y', {
    set: function (v) {
        this.position.y = v;
    },
    get: function () {
        return this.position.y;
    }
});
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
Object.defineProperty(Prometheus.DisplayObject, 'width', {
    set: function (v) {
        this.width = v;
    },
    get: function () {
        return this.width;
    }
});
Object.defineProperty(Prometheus.DisplayObject, 'height', {
    set: function (v) {
        this.height = v;
    },
    get: function () {
        return this.height;
    }
});
/**
 * @method updateTransform
 */
Prometheus.DisplayObject.prototype.updateTransform = function () {
};
/**
 * @method renderCacheSprite
 * @param session
 */
Prometheus.DisplayObject.prototype.renderCacheSprite = function (session) {
    if (session.gl)
        return;
    else
        Prometheus.Sprite.prototype.renderCanvas.call(this, session);
};
Prometheus.DisplayObject.prototype.renderCanvas = function (session) {
}
/**
 * @author slowsay
 */
Prometheus.DisplayObject = function () {
    /**
     * @property name
     */
    this.name = '';
    /**
     *@property position
     * this.position.x,this.position.y
     *@type Point
     */
    this.position = new Prometheus.Point();
    this.x = this.position.x;
    this.y = this.position.y;
    /**
     * @property rectangle
     */
    this.rectangle = new Prometheus.Rectangle();
    this.width = this.rectangle.width;
    this.height = this.rectangle.height;
    /**
     * 缩放
     * @property scale
     * @type point
     */
    this.scale = new Prometheus.Point(1, 1);
    /**
     * 轴中心点
     * @property pivot
     * @type point
     */
    this.pivot = new Prometheus.Point(0, 0);
    /**
     * 旋转
     * @property rotation
     * @type number
     */
    this.rotation = 0;
    /**
     * @property mask
     */
    this.mask = null;
    /**
     * @property parent
     */
    this.parent = null;
    /**
     * 透明度
     * @property alpha(0-1)
     * @type number
     */
    this.alpha = 1;
    /**
     * with visible
     * @property autoAlpha
     *
     */
    this.autoAlpha = 1;
    /**
     *
     */
    this.visible = true;
    /**
     * @property parent
     */
    this.parent = null;
    /**
     * @property stage
     */
    this.stage = null;
    /**
     * @discription 是否需要动画
     * @type {boolean}
     */
    this.animate=false;
    /**
     * @property buttonMode
     */
    this.buttonMode = false;

    /**
     * @property children
     * @type array
     */
    this.children = [];
    /**
     * @property numchildren
     * @type number
     */
    this.numChildren = [];
};
Prometheus.DisplayObject.prototype.constructor = Prometheus.DisplayObject;
/**
 * @method interactive
 */
Object.defineProperty(Prometheus.DisplayObject, 'interactive', {});

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
/**
 * @method updateTransform
 */
Prometheus.DisplayObject.prototype.updateTransform = function () {

};

/**
 * @mthod renderCacheSprite
 */
Prometheus.DisplayObject.prototype.renderCacheSprite = function (session) {
    if (session.gl)
        return;
    else
        Prometheus.Sprite.prototype.renderCanvas.call(this, session);
};
Prometheus.DisplayObject.prototype.renderCanvas = function (session) {

}
/**
 * @author slowsay
 */
Prometheus.DisplayObjectContainer = function () {
    Prometheus.DisplayObject.call(this);
    /**
     *@protery children
     */
    this.children = [];
};
Prometheus.DisplayObjectContainer.prototype = Object.create(Prometheus.DisplayObject.prototype);
Prometheus.DisplayObjectContainer.prototype.constructor = Prometheus.DisplayObjectContainer;
/**
 * @property width
 * @type number
 */
Object.defineProperty(Prometheus.DisplayObjectContainer.prototype, 'width', {
    get: function () {
        return this.rectangle.width;
    },
    set: function (v) {
        this.rectangle.width = v;
    }
});
/**
 * @property height
 * @type number
 */
Object.defineProperty(Prometheus.DisplayObjectContainer.prototype, 'height', {
    get: function () {
        return this.rectangle.height;
    },
    set: function (v) {
        this.rectangle.height = v;
    }
});
/**
 * @method addChild
 */
Prometheus.DisplayObjectContainer.prototype.addChild = function (obj) {
    return this.addChildAt(obj, this.children.length);
};

/**
 *@method addChildAt
 */
Prometheus.DisplayObjectContainer.prototype.addChildAt = function (obj, index) {
    if (index >= 0 && index <= this.children.length) {
        if (obj.parent)
            obj.parent.removeChild(obj);
        obj.parent = this;
        this.children.splice(index, 0, obj);
        if (this.stage)
            obj.setStageReference(this.stage);
        return obj;
    }
};
/**
 * @method getchildAt
 */
Prometheus.DisplayObjectContainer.prototype.getChildAt = function (index) {
    if (index >= 0 && index <= this.children.length)
        return this.children[index];
};
/**
 * @method getChildindex
 */
Prometheus.DisplayObjectContainer.prototype.getChildIndex = function (obj) {

};
/**
 * @method removeChild
 */
Prometheus.DisplayObjectContainer.prototype.removeChild = function (obj) {
    return this.removeChildAt(this.children.indexOf(obj));
};
/**
 * @method removeChildAt
 */
Prometheus.DisplayObjectContainer.prototype.removeChildAt = function (index) {
    var child = this.getChildAt(index);
    if (this.stage)
        child.removeStageReference();

    child.parent = undefined;
    this.children.splice(index, 1);
    return child;
};
/**
 *@method setStageReference
 */
Prometheus.DisplayObjectContainer.prototype.setStageReference = function (o) {
    this.stage = o;
    for (var i = 0, j = this.children.length; i < j; i++) {
        var child = this.children[i];
        child.setStageReference(o);
    }

};
/**
 *@method removeStageReference
 */
Prometheus.DisplayObjectContainer.prototype.removeStageReference = function () {
    for (var i = 0, j = this.children.length; i < j; i++) {
        var child = this.children[i];
        child.removeStageReference();
    }

    this.stage = null;
};
/**
 * @method renderCanvas
 */
Prometheus.DisplayObjectContainer.prototype.renderCanvas = function (session) {
    if (this.visible == false || this.alpha == 0)
        return;
    /**
     *@method rendercacheSprite;
     */
    //if (this.cacheAsBitmap)
    //    this.renderCacheSprite(session);
    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].renderCanvas(session);
    }
};
/**
 * @method updateTransform children for rendering
 */
Prometheus.DisplayObjectContainer.prototype.updateTransform = function () {
    Prometheus.DisplayObject.prototype.updateTransform.call(this);
    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].updateTransform();
    }
    ;
};

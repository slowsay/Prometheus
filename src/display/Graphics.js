/**
 * @method 多边形图形集合
 */
Prometheus.Graphics = function () {
    Prometheus.DisplayObjectContainer.call(this);
    /**
     * @description 当前数据
     * @type {{point: Array}}
     */
    this.currentPath = {
        point: []
    }
    /**
     * @property graphicsData
     * @type {Array}
     */
    this.graphicsData = [];
};
Prometheus.Graphics.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Graphics.prototype.constructor = Prometheus.Graphics;

/**
 * @method beginfill
 * @type
 */
Prometheus.Graphics.prototype.beginPath = function (color, alpha) {
    this.filling = true;
    this.fillcolor = color || 0;
    this.fillalpha = alpha || 1;
    return this;
};
/**
 * @method endfill
 */
Prometheus.Graphics.prototype.endFill = function () {
    this.filling = false;
    this.fillcolor = null;
    this.fillalpha = 1;
    return this;
};

/**
 * @method drawRect
 * toString(基数) 基数是多少进制
 */
Prometheus.Graphics.prototype.drawRect = function (color, x, y, w, h) {
    this.x = x, this.y = y, this.width = w, this.height = h;
    this.currentPath = {
        bgcolor: Prometheus.hex16rgb(color),
        x: x, y: y, w: w, h: h
    };
    this.graphicsData.push(this.currentPath);
    return this;
};

/**
 *@method updateTransform
 */
Prometheus.Graphics.prototype.updateTransform = function () {
    for (var i = 0, arr = this.graphicsData; i < arr.length; i++) {
        arr[i].x = this.x, arr[i].y = this.y;
    }

};
/**
 * @desription 图形渲染
 * @method renderCanvas
 * @param session
 */
Prometheus.Graphics.prototype.renderCanvas = function (session) {
    var ctx2d = session.context;
    for (var i = 0, arr = this.graphicsData; i < arr.length; i++) {
        ctx2d.beginPath();
        ctx2d.fillStyle = arr[i].bgcolor;
        ctx2d.fillRect(arr[i].x, arr[i].y, arr[i].w, arr[i].h);
    }
}
/**
 * @method 多边形图形集合
 */
Prometheus.Graphics = function () {
    Prometheus.DisplayObjectContainer.call(this);
    /**
     * @property graphicsData
     * @type {Array}
     */
    this.graphicsData = [];
};
Prometheus.Graphics.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Graphics.prototype.constructor = Prometheus.Graphics;

/**
 * @method drawRect
 * toString(基数) 基数是多少进制
 */
Prometheus.Graphics.prototype.drawRect = function (color, x, y, w, h) {
    this.x = x, this.y = y, this.width = w, this.height = h;
    this.graphicsData[this.graphicsData.length] = {
        bgcolor: Prometheus.hex16rgb(color),
        x: x, y: y, w: w, h: h
    };
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
        ctx2d.closePath();
    }
}
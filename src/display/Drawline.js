/**
 * @method 多边形图形集合
 */
Prometheus.Drawline = function () {
    Prometheus.DisplayObjectContainer.call(this);
    /**
     * @property graphicsData
     * @type {Array}
     */
    this.graphicsData = [];
};
Prometheus.Drawline.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Drawline.prototype.constructor = Prometheus.Graphics;

Prometheus.Drawline.prototype.draw = function (color, linewidth, sx, sy, x, y) {
    this.x = x, this.y = y, this.sx = sx, this.sy = sy;
    this.graphicsData[this.graphicsData.length] = {
        color: color,
        line: linewidth,
        x: x, y: y,
        sx: sx, sy: sy
    };
    return this;
}

/**
 *@method updateTransform
 */
Prometheus.Drawline.prototype.updateTransform = function () {
    for (var i = 0, arr = this.graphicsData; i < arr.length; i++) {
        arr[i].x = this.x, arr[i].y = this.y, arr[i].sx = this.sx, arr[i].sy = this.sy;
    }
};
/**
 * @desription 画线渲染
 * @method renderCanvas
 * @param session
 */
Prometheus.Drawline.prototype.renderCanvas = function (session) {
    var ctx2d = session.context;
    for (var i = 0, arr = this.graphicsData; i < arr.length; i++) {
        ctx2d.beginPath(),
            ctx2d.strokeStyle = arr[i].color,
            ctx2d.lineWidth = arr[i].line,
            ctx2d.moveTo(arr[i].sx, arr[i].sy),
            ctx2d.lineTo(arr[i].x, arr[i].y),
            ctx2d.stroke();
        ctx2d.closePath();
    }
}
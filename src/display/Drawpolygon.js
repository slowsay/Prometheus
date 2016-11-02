/**
 * @method 多边形图形集合
 */
Prometheus.Drawpolygon = function () {
    Prometheus.DisplayObjectContainer.call(this);
    /**
     * @property graphicsData
     * @type {Array}
     */
    this.graphicsData = [];
};
Prometheus.Drawpolygon.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Drawpolygon.prototype.constructor = Prometheus.Graphics;

Prometheus.Drawpolygon.prototype.draw = function (color, colors, linewidth, x, y, pointbox, flag) {
    this.x = x, this.y = y;
    this.graphicsData[this.graphicsData.length] = {
        color: color,
        colors: colors,
        line: linewidth || 0,
        x: x, y: y,
        point: pointbox || [],
        flag: flag || false
    };
    return this;
}
/**
 * @description 添加点坐标
 * @param index
 * @param x
 * @param y
 */
Prometheus.Drawpolygon.prototype.addPoint = function (index, x, y) {
    this.graphicsData[index].point[this.graphicsData[index].point.length] = {x: x, y: y};
}

/**
 *@method updateTransform
 */
Prometheus.Drawpolygon.prototype.updateTransform = function () {
    for (var i = 0, arr = this.graphicsData; i < arr.length; i++) {
        arr[i].x = this.x, arr[i].y = this.y;
    }
};
/**
 * @desription 画线渲染
 * @method renderCanvas
 * @param session
 */
Prometheus.Drawpolygon.prototype.renderCanvas = function (session) {
    var ctx2d = session.context, defaultcolor = 'rgba(0,0,0,0,1)';
    for (var i = 0, arr = this.graphicsData; i < arr.length; i++) {
        ctx2d.beginPath();
        ctx2d.lineWidth = arr[i].line;
        ctx2d.moveTo(arr[i].x, arr[i].y);
        for (var k = 0, parr = arr[i].point; k < parr.length; k++) {
            ctx2d.lineTo(parr[k].x + arr[i].x, parr[k].y + arr[i].y);
        }
        if (arr[i].line > 0)
            ctx2d.strokeStyle = arr[i].colors || defaultcolor, ctx2d.stroke();
        if (arr[i].flag)
            ctx2d.fillStyle = arr[i].color || defaultcolor, ctx2d.fill();
        ctx2d.closePath();
    }
}
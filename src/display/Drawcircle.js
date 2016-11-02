/**
 * @method 圆形图形集合
 */
Prometheus.Drawcircle = function () {
    Prometheus.DisplayObjectContainer.call(this);
    /**
     * @property graphicsData
     * @type {Array}
     */
    this.graphicsData = [];
};
Prometheus.Drawcircle.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Drawcircle.prototype.constructor = Prometheus.Graphics;

Prometheus.Drawcircle.prototype.draw = function (color, colors, linewidth, x, y, rangle, flag) {
    this.x = x, this.y = y;
    this.graphicsData[this.graphicsData.length] = {
        color: color,
        colors: colors,
        line: linewidth,
        x: x, y: y,
        alpha: 1,
        rangle: rangle,
        flag: flag || false
    };
    return this;
}

/**
 *@method updateTransform
 */
Prometheus.Drawcircle.prototype.updateTransform = function () {
    for (var i = 0, arr = this.graphicsData; i < arr.length; i++) {
        arr[i].x = this.x, arr[i].y = this.y, arr[i].alpha = this.alpha;
    }
};
/**
 * @desription 画圆渲染
 * @method renderCanvas
 * @param session
 */
Prometheus.Drawcircle.prototype.renderCanvas = function (session) {
    var ctx2d = session.context, defaultcolor = 'rgba(0,0,0,0,1)';
    ;
    for (var i = 0, arr = this.graphicsData; i < arr.length; i++) {
        var _obj = arr[i];
        ctx2d.beginPath();
        ctx2d.lineWidth = _obj.line;
        ctx2d.arc(_obj.x, _obj.y, _obj.rangle, 0, 2 * Math.PI);
        ctx2d.globalAlpha = _obj.alpha;
        if (arr[i].line > 0)
            ctx2d.strokeStyle = _obj.colors || defaultcolor, ctx2d.stroke();
        if (_obj.flag)
            ctx2d.fillStyle = _obj.color || defaultcolor, ctx2d.fill();
        ctx2d.closePath();
    }
}
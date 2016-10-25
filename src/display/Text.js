/**
 * Created by slowsay on 16/10/24.
 */
'use sturct';

Prometheus.Text = function (txt, style) {
    Prometheus.DisplayObjectContainer.call(this);
    this.content = txt || '';
    this.style = style || {font: '20px 宋体', color: '#000000'};
    this.currentText = [];
    this.setText();
}
Prometheus.Text.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Text.prototype.constructor = Prometheus.Text;

Prometheus.Text.prototype.setText = function () {
    this.currentText.push({
        t: this.content,
        txtwidth: 0,
        color: this.style.color || '#000000',
        font: this.style.font || '18px 宋体'
    })
    return this;
}
/**
 * @description 文本更新坐标
 * @method updateTransform
 */
Prometheus.Text.prototype.updateTransform = function () {
    for (var i = 0, arr = this.currentText; i < arr.length; i++) {
        arr[i].x = this.x, arr[i].y = this.y;
    }
}
/**
 * @description 文本渲染
 * @renderCanvas
 * @param session
 */
Prometheus.Text.prototype.renderCanvas = function (session) {
    var ctx2d = session.context;
    for (var i = 0, arr = this.currentText; i < arr.length; i++) {
        ctx2d.font = arr[i].font;
        ctx2d.fillStyle = arr[i].color;
        ctx2d.fillText(arr[i].t, arr[i].x, arr[i].y);
        arr[i].txtwidth = ctx2d.measureText(arr[i].t).width;
    }
}
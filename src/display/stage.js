/**
 * @method stage
 * @author slowsay
 */
Prometheus.Stage = function (bgcolor) {
    Prometheus.DisplayObjectContainer.call(this);
    this.stage = this;
    /**
     *@property interactive
     */
    this.interactive = true;
    /**
     * @property stage clear
     */
    this.dirty = true;
    /**
     *@property hitarea
     */
    this.stage.hitArea = new Prometheus.Rectangle(0, 0, 100, 100);
    /**
     * setbackground
     */
    this.setBgColor(bgcolor);
};
Prometheus.Stage.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Stage.prototype.constructor = Prometheus.Stage;
/**
 * @method setbgColor
 */
Prometheus.Stage.prototype.setBgColor = function (color) {
    this.backgroundcolor = color || 0x000000;
    this.backgroundColorSplit = Prometheus.hex2rgb(color);
    var _bgcolor = this.backgroundcolor.toString(16);
    _bgcolor = '000000'.substr(0, 6 - _bgcolor.length) + _bgcolor;
    this.backgroundString = '#' + _bgcolor;
};
/**
 * @method updateTransform
 */
Prometheus.Stage.prototype.updateTransform = function () {
    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].updateTransform();
    }
};
Prometheus.Stage.prototype.renderCanvas = function (session) {
    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].renderCanvas(session);
    }
}
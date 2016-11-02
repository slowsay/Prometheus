/**
 * @author slowsay
 */
var _render, _stage, _scene;
var speeds = .01, _wid = 1024, _hei = 600, _i = 0;
var _centerx = _wid / 2, _centery = _hei / 2;
var game = {
    init: function () {
        _stage = new Prometheus.Stage(0x000000);
        _render = new Prometheus.CanvasRender();
        document.body.appendChild(_render.view);
        //
        _scene = new Prometheus.DisplayObjectContainer();
        _stage.addChild(_scene);
        var _rangle = 100;
        for (var i = 0, len = 20; i < len; i++) {
            var _pp = new Prometheus.Drawcircle().draw('rgba(240,50,20,1)', 'rgba(255,255,20,1)', 0, 20, 20, 10,true);
            _scene.addChild(_pp);
            var _radian = 2 * Math.PI / len * i;
            _pp.x = _wid / 2 + _rangle * (i + 1) * Math.sin(_radian) , _pp.y = _hei / 2 + _rangle * (i + 1) * Math.cos(_radian);
            _pp.alpha = Math.abs(1 - .05 * i);
        }
        //size
        this.Size();
        this.render();
        window.addEventListener('resize', game.Size, !1);
    },
    update: function () {
        _i < 360 ? _i += speeds : _i = 0;
        for (var i = 0, arr = _scene.children; i < arr.length; i++) {
            var _dx = arr[i].x, _dy = arr[i].y;
            var _r = Math.sqrt(Math.pow(_centerx - _dx, 2) + Math.pow(_centery - _dy, 2));
            var _radian = (2 * Math.PI / arr.length) * i;
            arr[i].x = _centerx + _r * Math.sin(_radian + _i), arr[i].y = _centery + _r * Math.cos(_radian + _i);
        }

        $('.fps').html(_render.status());
    },
    render: function () {
        _render.render(_stage);

        game.update();

        requestRender(game.render);
    },
    Size: function () {
        _wid = $(window).width(), _hei = $(window).height();
        _render.resize(_wid, _hei);
    }
};
$(function () {
    game.init();
});

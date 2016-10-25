/**
 * @author slowsay
 */
var _render, _stage, _wid, _hei, _scene, _i = 0, _graphics, _graphics0;
var game = {
    init: function () {
        _stage = new Prometheus.Stage(0x000000);
        _render = new Prometheus.CanvasRender();
        document.body.appendChild(_render.view);
        //
        _scene = new Prometheus.DisplayObjectContainer();
        _stage.addChild(_scene);
        _graphics = new Prometheus.Graphics().drawRect(0x00ff00, 10, 30, 100, 100);
        _graphics0 = new Prometheus.Graphics().drawRect(0x00ff00, 300, 300, 20, 20);
        _scene.addChild(_graphics);
        _scene.addChild(_graphics0);
        console.log(_graphics);
        //size
        this.Size();
        this.render();
        window.addEventListener('resize', game.Size, !1);
    },
    update: function () {
    },
    Size: function () {
        _wid = $(window).width(), _hei = $(window).height();
        _render.resize(_wid, _hei);
    },
    render: function () {
        requestRender(game.render);
        _render.returnfps();
        _render.render(_stage);
        var _r = 100;
        var _centerx = _wid / 2, _centery = _hei / 2;
        if (_i > 360)
            _i = 0;
        else
            _i += .1;
        _graphics.x = _centerx + _r * Math.sin(_i), _graphics.y = _centery + _r * Math.cos(_i);
        _graphics0.x = _centerx - _r * Math.sin(_i), _graphics0.y = _centery - _r * Math.cos(_i);
    }
};
$(function () {
    game.init();
});

/**
 * @author slowsay
 */
var _render, _stage, _wid, _hei, _scene, _i = 0, dx = 0, dy = 0, _sprite, _plane, speeds = .1, _dis = 3;
var game = {
    init: function () {
        _stage = new Prometheus.Stage(0x000000);
        _render = new Prometheus.CanvasRender();
        document.body.appendChild(_render.view);
        _scene = new Prometheus.DisplayObjectContainer();
        _stage.addChild(_scene);
        _sprite = new Prometheus.Sprite().drawImages('../images/0.jpg');
        _plane = new Prometheus.Sprite().drawImages('../images/1.png');
        _scene.addChild(_sprite);
        _scene.addChild(_plane);
        //size
        this.Size();
        this.render();
        window.addEventListener('resize', game.Size, !1);

    },
    Size: function () {
        _wid = $(window).width(), _hei = $(window).height();
        _stage.width = _wid, _stage.height = _hei;
        _render.resize(_wid, _hei);
    },
    render: function () {
        var _r = 100;
        var _centerx = 400 / 2, _centery = 100;
        _i -= speeds;
        dy -= _dis;
        if (_plane.y < 0) {
            dy = _hei;
        }
        _plane.x = _centerx + _r * Math.sin(_i), _plane.y = dy;
        //render
        requestRender(game.render);
        _render.render(_stage);
    }
};
$(function () {
    game.init();
});

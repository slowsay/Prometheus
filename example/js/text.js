/**
 * @author slowsay
 */
var _render, _stage, _wid, _hei, _scene, _i = 0, _txt, _fps;
var game = {
    init: function () {
        _stage = new Prometheus.Stage(0x000000);
        _render = new Prometheus.CanvasRender();
        document.body.appendChild(_render.view);
        //
        _scene = new Prometheus.DisplayObjectContainer();
        _stage.addChild(_scene);
        _txt = new Prometheus.Text('test', {color: '#ffffff'});
        _scene.addChild(_txt);
        //size
        this.Size();
        this.render();
        window.addEventListener('resize', game.Size, !1);
        console.log(_txt);
    },
    update: function () {
    },
    Size: function () {
        _wid = $(window).width(), _hei = $(window).height();
        _render.resize(_wid, _hei);
    },
    render: function () {
        requestRender(game.render);
        _render.render(_stage);
        var _r = 100;
        var _centerx = _wid / 2, _centery = _hei/2;
        _i -= .1;
        _txt.x = _centerx + _r * Math.sin(_i), _txt.y = _centery + _r * Math.cos(_i);
    }
};
$(function () {
    game.init();
});

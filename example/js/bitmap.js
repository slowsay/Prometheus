/**
 * @author slowsay
 */
var _render, _stage, _wid = 0, _hei = 0, _scene, _i = 0, dx = 0, dy = 0, speeds = .5, ballspeed = 3, _speeds = 1;
var _map, _cloud, _cloud0;
var tmx = tmy = initmx = initmy = 0, mx, my, flag, offlag = !0;
var honorball = [];
var enemyball = [];
var enemybox = [];
function ball() {
    return {
        target: null,
        dead: false,
        speeds: 15,
        level: 1
    };
}
function enemy() {
    return {
        level: 1,
        target: null,
        dead: false,
        speeds: 1,
        heath: 1
    }
}
var honor = {
    level: 1,
    target: null,
    dead: false,
    speeds: 1,
    heath: 3,
    head:3
}
var game = {
    init: function () {
        _stage = new Prometheus.Stage(0x000000);
        _render = new Prometheus.CanvasRender();
        document.body.appendChild(_render.view);
        //document.getElementById('fuck').appendChild(_render.offview);
        _scene = new Prometheus.DisplayObjectContainer();
        _stage.addChild(_scene);
        _map = new Prometheus.Spritemap().setTexture('../images/map/2.jpg');
        _cloud = new Prometheus.Sprite().setTexture('../images/img_cloud_1.png');
        _cloud0 = new Prometheus.Sprite().setTexture('../images/img_cloud_1.png');
        honor.target = new Prometheus.Sprite().setTexture('../images/plane/0d.png');
        _scene.addChild(_map);
        _scene.addChild(_cloud);
        _scene.addChild(_cloud0);
        _scene.addChild(honor.target);
        game.enemyCreatePlane();
        //size
        this.Size();
        _cloud.x = -200, _cloud0.x = 300, _cloud0.y = 200, mx = 500 >> 1, my = _hei - 50;
        this.render();
        window.addEventListener('resize', game.Size);
        //document.addEventListener('mousedown', function (e) {
        //    var e = e || window.event;
        //    dx = e.clientX, dy = e.clientY;
        //})
        $('.ctr').on('click', function (e) {
            if (offlag) {
                $('.ctr').html('开始')
                offlag = !1;
            }
            else {
                $('.ctr').html('暂停');
                offlag = !0
            }
        });
        document.addEventListener('mouseup', game.mouseHandle, !1);
        document.addEventListener('mousedown', game.mouseHandle, !1);
        document.addEventListener('mousemove', game.mouseHandle, !1);
        document.addEventListener('mouseout', game.mouseHandle, !1);
        document.addEventListener('keypress', function (e) {
            e.preventDefault();
            switch (e.keyCode) {
                case 32:
                    game.addBall();
                    break;
            }
        })
    },
    enemyaddBall: function (x, y) {
        var _obj = new ball();
        _obj.target = new Prometheus.Sprite().setTexture('../images/ball0.png');
        _obj.target.x = x, _obj.target.y = y;
        _scene.addChild(_obj.target);
        enemyball.push(_obj);
    }
    ,
    addBall: function () {
        var _obj = new ball();
        _obj.target = new Prometheus.Sprite().setTexture('../images/ball.png');
        _obj.target.x = honor.target.x + honor.target.width / 2 - 10, _obj.target.y = honor.target.y;
        _scene.addChild(_obj.target);
        honorball.push(_obj);
    },
    processBallBox: function (box, direct) {
        if (box.length > 0)
            for (var i = 0, arr = box; i < arr.length; i++) {
                if (direct) {
                    arr[i].target.y += arr[i].level * arr[i].speeds;
                }
                else {
                    arr[i].target.y -= arr[i].level * arr[i].speeds;
                }
                if (arr[i].target.x > _wid || arr[i].target.x < 0 || arr[i].target.y < 0 || arr[i].target.y > _hei) {
                    arr[i].dead = !0;
                }
                if (arr[i].dead) {
                    game.removeEnemy(arr, i);
                }
            }
    },
    mouseHandle: function (e) {
        var e = e || window.event;
        e.preventDefault();
        switch (e.type) {
            case 'mouseup':
                flag = !1;
                break;
            case 'mousedown':
                flag = !0;
                break;
            case 'mousemove':
                if (flag) {
                    initmx = e.movementX || e.mozMovementX || e.webkitMovementX || 0, initmy = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
                    mx += initmx * speeds, my += initmy * speeds;
                }
                break;
            case 'touchend':
                flag = !1;
                break;
            case 'touchstart':
                flag = !0;
                tmx = e.touches[0].clientX, tmy = e.touches[0].clientY;
                break;
            case 'touchmove':
                if (flag) {
                    mx += (e.touches[0].clientX - tmx) * speeds, my += (e.touches[0].clientY - tmy) * speeds;
                    tmx = e.touches[0].clientX, tmy = e.touches[0].clientY;
                }
                break;
        }

    },
    update: function () {
        _i++;
        if (_cloud.y < 0 - _cloud.height) {
            _cloud.y = _hei;
        }
        if (_cloud0.y < 0 - _cloud0.height) {
            _cloud0.y = _hei;
        }
        _map.y += _speeds;
        _cloud.y -= _speeds;
        _cloud0.y -= _speeds;
        //var ab = Math.sqrt(Math.pow(dx - _plane.x, 2) + Math.pow(dy - _plane.y, 2));
        //var mx = _plane.x, my = _plane.y;
        //if (Math.ceil(ab)!= 0) {
        //    mx += ab * speeds, my += ab * speeds;
        //}
        honor.target.x = mx, honor.target.y = my;
        $('.health').html(honor.heath);
        game.processBallBox(enemyball, true);
        game.processBallBox(honorball, false);
        game.enemyMove();
        game.checkDistance();
    },
    addSpeeds: function (arr, i) {
        switch (arr[i].level) {
            case 1:
                arr[i].speeds = 1;
                if (_i > 100) {
                    _i = 0, game.enemyaddBall(arr[i].target.x + arr[i].target.width / 2 - 10, arr[i].target.y+arr[i].target.height);
                }
                break;
            case 2:
                arr[i].speeds = 2;
                break;
            case 3:
                arr[i].speeds = 3;
                break;
            case 4:
                arr[i].speeds = 4;
                break;
            case 5:
                arr[i].speeds = 5;
                break;
            case 6:
                arr[i].speeds = 6;
                break;
            case 7:
                arr[i].speeds = 7;
                break;
        }
    },
    removeEnemy: function (element, id) {
        _scene.removeChild(element[id].target);
        element.splice(id, 1);
    },
    checkDistance: function () {
        for (var i = 0, arr = enemyball; i < arr.length; i++) {
            var ebx = arr[i].target.x, eby = arr[i].target.y;
            var _dx = honor.target.x + honor.target.width / 2, _dy = honor.target.y;
            var ab = Math.sqrt(Math.pow(ebx - _dx, 2) + Math.pow(eby - _dy, 2));
            if (ab < 20) {
                honor.heath--;
                $('.health').html(honor.heath);
                game.removeEnemy(arr, i);
            }
            if (honor.heath == 0) {
                honor.head--;
                honor.heath=3;
                $('.ctr').click();
            }
        }
    },
    enemyMove: function () {
        for (var i = 0, arr = enemybox; i < arr.length; i++) {
            game.addSpeeds(arr, i);
            //arr[i].target.x =  Math.random();
        }
    },
    levelenemybox: function () {

    },
    enemyCreatePlane: function () {
        var _obj = new enemy();
        _obj.target = new Prometheus.Sprite().setTexture('../images/plane/1d.png');
        _obj.target.x = 500 / 2;
        _scene.addChild(_obj.target);
        enemybox.push(_obj);
    },
    render: function () {
        _render.clear();
        _render.render(_stage);
        $('.fps').html(_render.status());
        if (offlag) {
            game.update();
        }
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

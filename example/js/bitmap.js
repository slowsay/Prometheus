/**
 * @author slowsay
 */
var _render, _stage, _wid = 0, _hei = 0, _scene, _i = 0, dx = 0, dy = 0;
var speeds = .5, _speeds = 1;
var _map, _cloud, _cloud0;
var tmx = tmy = initmx = initmy = 0, mx, my, flag, offlag = !0;
var enemyball = [];
var enemybox = [];
function ball() {
    return {
        level: 1,
        target: null,
        dead: false,
        speeds: 15,
        direct: 0
    };
}
function enemy() {
    return {
        level: 1,
        target: null,
        dead: false,
        heath: 1
    }
}
var honor = {
    level: 1,
    target: null,
    kill: 0,
    dead: false,
    ball: [],
    heath: 3,
    head: 3
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
        _cloud.x = -200, _cloud0.x = 300, _cloud0.y = 200, mx = 200 >> 1, my = _hei - 50;
        this.render();
        //listener
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
        document.addEventListener('touchstart', game.mouseHandle, !1);
        document.addEventListener('touchmove', game.mouseHandle, !1);
        document.addEventListener('touchend', game.mouseHandle, !1);
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
    /**
     * @description 添加子弹
     */
    addBall: function () {
        var _obj = new ball();
        _obj.target = new Prometheus.Sprite().setTexture('../images/ball.png');
        _obj.target.x = honor.target.x + honor.target.width / 2 - 10, _obj.target.y = honor.target.y;
        _scene.addChild(_obj.target);
        honor.ball.push(_obj);
    },
    /**
     * @description
     * @param box
     * @param direct 敌机与英难机子弹的移动方向
     */
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
                    game.removeBall(arr, i);
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
    /**
     * @description 移除子弹
     * @param element
     * @param id
     */
    removeBall: function (element, id) {
        _scene.removeChild(element[id].target);
        element.splice(id, 1);
    },
    /**
     * @description 碰撞检测
     *
     */
    checkDistance: function () {
        for (var i = 0, arr = enemyball; i < arr.length; i++) {
            var ebx = arr[i].target.x, eby = arr[i].target.y;
            var _dx = honor.target.x + honor.target.width / 2, _dy = honor.target.y;
            var ab = Math.sqrt(Math.pow(ebx - _dx, 2) + Math.pow(eby - _dy, 2));
            if (ab < honor.target.width / 2) {
                honor.heath--;
                $('.health').html(honor.heath);
                game.removeBall(arr, i);
            }
            if (honor.heath == 0) {
                honor.head--;
                honor.heath = 3;
                $('.ctr').click();
            }
        }
        for (var k = 0, harr = honor.ball; k < harr.length; k++) {
            var tbx = harr[i].target.x, tby = harr[i].target.y;
            for (var p = 0, barr = enemybox; p < barr.length; p++) {
                var tdx = barr[p].target.x + barr[p].target.width / 2, tdy = barr[p].target.y + barr[p].target.height;
                var _ab = Math.sqrt(Math.pow(tbx - tdx, 2) + Math.pow(tby - tdy, 2));
                if (_ab < barr[p].target.width / 2) {
                    game.removeBall(harr, k);
                    game.removeBall(barr, p);
                    honor.kill++;
                    game.enemyCreatePlane();
                }
            }
        }
    },
    /**
     * @descripton 敌机移动状态
     */
    enemyMove: function () {
        for (var i = 0, arr = enemybox; i < arr.length; i++) {
            if (_i % (111 - arr[i].level) == 0) {
                game.enemyaddBall(arr[i].target.x + arr[i].target.width / 2 - 10, arr[i].target.y + arr[i].target.height)
            }
            //arr[i].target.x =  Math.random();
        }
    },
    /**
     * @description 子弹等级,处理事件
     * 最高10级
     */
    levelBall: function () {
        var _honorlevel = honor.ball.length > 0 ? honor.ball[0].level : 1;
        if (_i % (11 - _honorlevel) == 0) {
            game.addBall();
        }

    },
    /**
     * @description 创建敌机
     */
    enemyCreatePlane: function () {
        var _obj = new enemy();
        _obj.target = new Prometheus.Sprite().setTexture('../images/plane/1d.png');
        _obj.target.x = Math.random() * 500 / 2;
        _scene.addChild(_obj.target);
        enemybox.push(_obj);
    },
    /**
     * @deccription 更新元素
     * @method update
     */
    update: function () {
        _i > 100 ? _i = 0 : _i++;
        if (_cloud.y < 0 - _cloud.height) {
            _cloud.y = _hei;
        }
        if (_cloud0.y < 0 - _cloud0.height) {
            _cloud0.y = _hei;
        }
        _speeds = honor.level / _speeds;
        _map.y += _speeds;
        _cloud.y -= _speeds;
        _cloud0.y -= _speeds;
        //var ab = Math.sqrt(Math.pow(dx - _plane.x, 2) + Math.pow(dy - _plane.y, 2));
        //var mx = _plane.x, my = _plane.y;
        //if (Math.ceil(ab)!= 0) {
        //    mx += ab * speeds, my += ab * speeds;
        //}
        honor.target.x = mx, honor.target.y = my;

        game.processBallBox(enemyball, true);
        game.processBallBox(honor.ball, false);
        game.enemyMove();
        game.checkDistance();
        game.levelBall();
        //output message
        if (honor.head == 0) {
            $('.mes').html('GAME OVER').style.display='block';
        }
        $('.health').html(honor.heath);
        $('.fps').html('F:' + _render.status() + ' H:' + honor.head + ' L:' + honor.level + ' K:' + honor.kill);
    },
    /**
     * @descripton 渲染canvas舞台
     *
     */
    render: function () {
        _render.clear();
        _render.render(_stage);
        //是否暂停游戏,默认开启true
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

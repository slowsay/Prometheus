# Prometheus
普罗米修斯，canvas渲染动画平台库，使用flash as3模式构建的，利用canvas这一特性，
作为motion场景，类似 flashplayer平台，进行舞台渲染动画，可以放入外部图片，内置多边形，矩形，圆形，三角形等对象
目前是初始版本

<pre>
_stage = new Prometheus.Stage(0x000000);
_render = new Prometheus.CanvasRender();
document.body.appendChild(_render.view);
</pre>

<pre>
var disobj = new Prometheus.DisplayObjectContainer();
        disobj.name = 'disobj';
        _stage.addChild(disobj);
        var _graphics = new Prometheus.Graphics();
        _graphics.name = 'g0';
        with (_graphics) {
            beginFill(0xff0000);
            drawRect(0, 0, 100, 100);
            endFill();
        }
        disobj.addChild(_graphics);
</pre>

model
----------------------------------------------
*舞台渲染
*图形渲染
*example

version
----------------------------------------------
v1.0.0 create up 

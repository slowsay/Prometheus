# Prometheus
> 普罗米修斯，canvas渲染动画平台库，使用flash as3模式构建的，利用canvas这一特性，
作为motion场景，类似 flashplayer平台，进行舞台渲染动画，可以放入外部图片，内置多边形，矩形，圆形，三角形等对象
目前是初始版本

[![NPM](https://nodei.co/npm/Prometheus.png)](https://nodei.co/npm/Prometheus/)

### View

![](./images/0.gif)

### Install

```
$ npm install Prometheus
```

### Example

```
_stage = new Prometheus.Stage(0x000000);
_render = new Prometheus.CanvasRender();
document.body.appendChild(_render.view);
//建立displayobject
var disobj = new Prometheus.DisplayObjectContainer();
disobj.name = 'disobj';
_stage.addChild(disobj);
_graphics = new Prometheus.Graphics().drawRect(0x00ff00, 10, 30, 100, 100);
_scene.addChild(_graphics);
```

### Feature
* 舞台渲染
* 图形渲染
* 图像渲染
* 添加map渲染功能
* 添加example
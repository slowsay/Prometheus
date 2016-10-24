/*! prometheus 2016-10-24 */
"use sturct";var Prometheus=Prometheus||{};Prometheus.blendModes={NORMAL:0},Prometheus.hitTest=function(){},Prometheus.isBallInBucket=function(a,b){var c={x:a.x+a.RADIUS,y:a.y+a.RADIUS},d={x:b.x+b.RADIUS,y:b.y+b.RADIUS},e=Math.sqrt(d.x-c.x,2)+Math.sqrt(d.y-c.y,2);return e<a.RADIUS+b.RADIUS},Prometheus.errorcode={e404:"not find object",e405:"current object have children,do not operation"},Prometheus.Point=function(a,b){this.x=a||0,this.y=b||0},Prometheus.Point.prototype.constructor=Prometheus.Point,Prometheus.Point.prototype.clone=function(){return new Prometheus.Point(this.x,this.y)},Prometheus.Point.prototype.set=function(a,b){this.x=a||0,this.y=b||0},Prometheus.DisplayObject=function(){this.name="",this.position=new Prometheus.Point,this.x=this.position.x,this.y=this.position.y,this.rectangle=new Prometheus.Rectangle,this.width=this.rectangle.width,this.height=this.rectangle.height,this.scale=new Prometheus.Point(1,1),this.pivot=new Prometheus.Point(0,0),this.rotation=0,this.mask=null,this.parent=null,this.alpha=1,this.autoAlpha=1,this.visible=!0,this.parent=null,this.stage=null,this.buttonMode=!1,this.children=[],this.numChildren=[]},Prometheus.DisplayObject.prototype.constructor=Prometheus.DisplayObject,Object.defineProperty(Prometheus.DisplayObject,"interactive",{}),Object.defineProperty(Prometheus.DisplayObject,"x",{set:function(a){this.position.x=a},get:function(){return this.position.x}}),Object.defineProperty(Prometheus.DisplayObject,"y",{set:function(a){this.position.y=a},get:function(){return this.position.y}}),Prometheus.DisplayObject.prototype.updateTransform=function(){},Prometheus.DisplayObject.prototype.renderCacheSprite=function(a){a.gl||Prometheus.Sprite.prototype.renderCanvas.call(this,a)},Prometheus.DisplayObject.prototype.renderCanvas=function(){},Prometheus.DisplayObjectContainer=function(){Prometheus.DisplayObject.call(this),this.children=[]},Prometheus.DisplayObjectContainer.prototype=Object.create(Prometheus.DisplayObject.prototype),Prometheus.DisplayObjectContainer.prototype.constructor=Prometheus.DisplayObjectContainer,Object.defineProperty(Prometheus.DisplayObjectContainer.prototype,"width",{get:function(){return this.rectangle.width},set:function(a){this.rectangle.width=a}}),Object.defineProperty(Prometheus.DisplayObjectContainer.prototype,"height",{get:function(){return this.rectangle.height},set:function(a){this.rectangle.height=a}}),Prometheus.DisplayObjectContainer.prototype.addChild=function(a){return this.addChildAt(a,this.children.length)},Prometheus.DisplayObjectContainer.prototype.addChildAt=function(a,b){return b>=0&&b<=this.children.length?(a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),this.stage&&a.setStageReference(this.stage),a):void 0},Prometheus.DisplayObjectContainer.prototype.getChildAt=function(a){return a>=0&&a<=this.children.length?this.children[a]:void 0},Prometheus.DisplayObjectContainer.prototype.getChildIndex=function(){},Prometheus.DisplayObjectContainer.prototype.removeChild=function(a){return this.removeChildAt(this.children.indexOf(a))},Prometheus.DisplayObjectContainer.prototype.removeChildAt=function(a){var b=this.getChildAt(a);return this.stage&&b.removeStageReference(),b.parent=void 0,this.children.splice(a,1),b},Prometheus.DisplayObjectContainer.prototype.setStageReference=function(a){this.stage=a;for(var b=0,c=this.children.length;c>b;b++){var d=this.children[b];d.setStageReference(a)}},Prometheus.DisplayObjectContainer.prototype.removeStageReference=function(){for(var a=0,b=this.children.length;b>a;a++){var c=this.children[a];c.removeStageReference()}this.stage=null},Prometheus.DisplayObjectContainer.prototype.renderCanvas=function(a){if(0!=this.visible&&0!=this.alpha){this.cacheAsBitmap&&this.renderCacheSprite(a);for(var b=0,c=this.children.length;c>b;b++)this.children[b].renderCanvas(a)}},Prometheus.DisplayObjectContainer.prototype.updateTransform=function(){Prometheus.DisplayObject.prototype.updateTransform.call(this);for(var a=0,b=this.children.length;b>a;a++)this.children[a].updateTransform()},Prometheus.Graphics=function(){Prometheus.DisplayObjectContainer.call(this),this.currentPath={point:[]},this.graphicsData=[]},Prometheus.Graphics.prototype=Object.create(Prometheus.DisplayObjectContainer.prototype),Prometheus.Graphics.prototype.constructor=Prometheus.Graphics,Prometheus.Graphics.prototype.beginPath=function(a,b){return this.filling=!0,this.fillcolor=a||0,this.fillalpha=b||1,this},Prometheus.Graphics.prototype.endFill=function(){return this.filling=!1,this.fillcolor=null,this.fillalpha=1,this},Prometheus.Graphics.prototype.drawRect=function(a,b,c,d,e){return this.x=b,this.y=c,this.width=d,this.height=e,this.currentPath={bgcolor:Prometheus.hex16rgb(a),x:b,y:c,w:d,h:e},this.graphicsData.push(this.currentPath),this},Prometheus.Graphics.prototype.updateTransform=function(){for(var a=0,b=this.graphicsData;a<b.length;a++)b[a].x=this.x,b[a].y=this.y},Prometheus.Graphics.prototype.renderCanvas=function(a){for(var b=a.context,c=0,d=this.graphicsData;c<d.length;c++)b.fillStyle=d[c].bgcolor,b.fillRect(d[c].x,d[c].y,d[c].w,d[c].h)},Prometheus.Sprite=function(a){Prometheus.DisplayObjectContainer.call(this),this.texture=a||null},Prometheus.Sprite.prototype=Object.create(Prometheus.DisplayObjectContainer.prototype),Prometheus.Sprite.prototype.constructor=Prometheus.Sprite,Prometheus.Sprite.prototype.setTexture=function(a){this.texture=a},Prometheus.Sprite.prototype.renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha){var b=new Image;b.src=this.texture,b.addEventListener("load",function(b){this.texture=b.target,a.context.drawImage(this.texture,0,0,this.texture.width,this.texture.height,0,0,this.texture.width,this.texture.height)});for(var c=0,d=this.children.length;d>c;c++)this.children[c].renderCanvas(a)}},Prometheus.Stage=function(a){Prometheus.DisplayObjectContainer.call(this),this.stage=this,this.interactive=!0,this.dirty=!0,this.stage.hitArea=new Prometheus.Rectangle(0,0,100,100),this.setBgColor(a)},Prometheus.Stage.prototype=Object.create(Prometheus.DisplayObjectContainer.prototype),Prometheus.Stage.prototype.constructor=Prometheus.Stage,Prometheus.Stage.prototype.setBgColor=function(a){this.backgroundcolor=a||0,this.backgroundColorSplit=Prometheus.hex2rgb(a);var b=this.backgroundcolor.toString(16);b="000000".substr(0,6-b.length)+b,this.backgroundString="#"+b},Prometheus.Stage.prototype.updateTransform=function(){for(var a=0,b=this.children.length;b>a;a++)this.children[a].updateTransform()},Prometheus.Stage.prototype.renderCanvas=function(a){for(var b=0,c=this.children.length;c>b;b++)this.children[b].renderCanvas(a)},Prometheus.Text=function(){Prometheus.DisplayObjectContainer.call(this)},Prometheus.Text.prototype=Object.create(Prometheus.DisplayObjectContainer.prototype),Prometheus.Events=function(){this.addEventListener=this.on=function(){},this.dispatchEvent=this.emit=function(){},this.removeEventListener=this.off=function(){},this.removeEventsListener=function(){}},Prometheus.Rectangle=function(a,b,c,d){this.width=c||0,this.height=d||0,this.x=a||0,this.y=b||0},Prometheus.Rectangle.prototype.clone=function(){return new Prometheus.Rectangle(this.x,this.y,this.width,this.height)},Prometheus.Rectangle.prototype.contains=function(a,b){return this.width<=0||this.height<=0?!1:a>this.x&&a<this.x+this.width&&b>this.y&&b<this.y+this.height?!0:!1},Prometheus.AssetsLoader=function(a,b){Prometheus.Events.call(this),this.assetsURLs=a||"",this.across=b,this.arraylength=0},Prometheus.AssetsLoader.prototype.constructor=Prometheus.AssetsLoader,Prometheus.AssetsLoader.loadjs=function(){},Prometheus.AssetsLoader.loadjs.prototype=Object.create(Prometheus.AssetsLoader.prototype),Prometheus.AssetsLoader.loadjs.prototype.constructor=Prometheus.AssetsLoader.loadjs,Prometheus.CanvasRender=function(a,b,c,d){this.width=a||550,this.height=b||400,this.transparent=!!d,this.view=c||document.createElement("canvas"),this.context=this.view.getContext("2d",{alpha:this.transparent}),this.clearBeforeRender=!0,this.view.width=this.width,this.view.height=this.height,this.renderSession={context:this.context,session:null},"imageSmoothingEnabled"in this.context?this.renderSession.session="imageSmoothingEnabled":"webkitImageSmoothingEnabled"in this.context?this.renderSession.session="webkitImageSmoothingEnabled":"mozImageSmoothingEnabled"in this.context?this.renderSession.session="mozImageSmoothingEnabled":"oImageSmoothingEnabled"in this.context&&(this.renderSession.session="oImageSmoothingEnabled")},Prometheus.CanvasRender.prototype.constructor=Prometheus.CanvasRender,Prometheus.CanvasRender.prototype.render=function(a){a.updateTransform(),!this.transparent&&this.clearBeforeRender?(this.context.fillStyle=a.backgroundString,this.context.fillRect(0,0,this.width,this.height)):this.transparent&&this.clearBeforeRender&&this.context.clearRect(0,0,this.width,this.height),this.renderDisplayObject(a)},Prometheus.CanvasRender.prototype.renderDisplayObject=function(a,b){this.renderSession.context=b||this.context,a.renderCanvas(this.renderSession)},Prometheus.CanvasRender.prototype.returnfps=function(){return this.now=new Date,this.fps=1e3/(this.now-this.lastime||0),this.lastime=this.now,this.fps},Prometheus.CanvasRender.prototype.resize=function(a,b){this.width=a||550,this.height=b||400,this.view.width=a,this.view.height=b},Prometheus.CanvasRender.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)},Prometheus.WebGlRender=function(a,b,c,d){this.transparent=!!d,this.width=a||500,this.height=b||400,this.view=c||document.createElement("canvas"),this.view.width=this.width,this.view.height=this.height,this.option={alpha:this.transparent},this.context=null,["experimental-webgl","webgl"].forEach(function(a){this.context=this.context||this.view.getContext(a,this.option)},this),this.context||(this.context=this.view.getContext("2d",this.option))},Prometheus.WebGlRender.prototype.constructor=Prometheus.WebGlRender,Prometheus.WebGlRender.prototype.render=function(){},Prometheus.WebGlRender.prototype.resize=function(a,b){this.width=a,this.height=b,this.view.width=this.width,this.view.height=this.height,this.context.viewport(0,0,this.width,this.height)},window.requestRender=function(){var a,b,c,d,e=navigator.userAgent,f=this;return window.webkitRequestAnimationFrame&&(b=function(a){void 0===a&&(a=(new Date).getTime()),f.callback(a)},a=window.webkitRequestAnimationFrame,window.webkitRequestAnimationFrame=function(c,d){f.callback=c,a(b,d)}),window.mozRequestAnimationFrame&&(d=e.indexOf("rv:"),-1!=e.indexOf("Gecko")&&(c=e.substr(d+3,3),"2.0"===c&&(window.mozRequestAnimationFrame=void 0))),window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){var b,c;window.setTimeout(function(){b=(new Date).getTime(),a(b),c=(new Date).getTime(),f.timeout=1e3/60-(c-b)},f.timeout)}}();var _lastime=0,_txt,_frame,lastFpsUpdateTime=0,lastFpsUpdate=0,Timefps={init:function(){_txt=new PIXI.Text("",{font:"bold 15px arial",fill:"#ffffff",align:"center"}),_frame=new PIXI.Text("",{font:"bold 15px arial",fill:"#ffffff",align:"center"}),_txt.y=10,_frame.y=40,scene.addChild(_txt),scene.addChild(_frame),Comm.buttonmode(_txt,!0),window.requestNextAnimationFrame(Timefps.animate)},calculateFps:function(){var a=+new Date,b=1e3/(a-_lastime);return _lastime=a,b},animate:function(a){var b=0;"undefinded"==a&&(a=+new Date),b=Timefps.calculateFps(),a-lastFpsUpdateTime>1e3&&(lastFpsUpdateTime=a,lastFpsUpdate=b),_txt.setText("  "+lastFpsUpdate.toFixed()+"fps"),window.requestNextAnimationFrame(Timefps.animate)}};Prometheus.hex2rgb=function(a){return[(a>>16&255)/255,(a>>8&255)/255,(255&a)/255]},Prometheus.hex16rgb=function(a){return"#"+"000000".substr(0,6-a.toString(16).length)+a.toString(16)};
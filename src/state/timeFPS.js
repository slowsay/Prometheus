/**
 * @author slowsay
 */
var _lastime = 0, _txt, _frame, lastFpsUpdateTime = 0, lastFpsUpdate = 0;
var Timefps = {
	init : function() {
		_txt = new PIXI.Text('', {
			font : 'bold 15px arial',
			fill : '#ffffff',
			align : 'center'
		});
		_frame = new PIXI.Text('', {
			font : 'bold 15px arial',
			fill : '#ffffff',
			align : 'center'
		});
		_txt.y = 10;
		_frame.y = 40;
		scene.addChild(_txt);
		scene.addChild(_frame);
		Comm.buttonmode(_txt, true);
		window.requestNextAnimationFrame(Timefps.animate);
	},
	calculateFps : function() {
		var _now = +new Date();
		var fps = 1000 / (_now - _lastime);
		_lastime = _now;
		return fps;
	},
	animate : function(time) {
		var fps = 0;
		if (time == 'undefinded')
			time = +new Date();
		fps = Timefps.calculateFps();
		if (time - lastFpsUpdateTime > 1000) {
			lastFpsUpdateTime = time;
			lastFpsUpdate = fps;
		}
		_txt.setText('  ' + lastFpsUpdate.toFixed() + 'fps');
		// _frame.setText('  ' + Timefps.calculateFps().toFixed() + 'fps');
		window.requestNextAnimationFrame(Timefps.animate);
	}
};


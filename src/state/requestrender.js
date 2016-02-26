/**
 * @author slowsay
 */
/*
 * @method requestRender
 */
window.requestRender = (function() {
	var originawebkitReqAnimate, web, callback, geckoVersion, userAgent = navigator.userAgent, index, self = this;
	if (window.webkitRequestAnimationFrame) {
		web = function(time) {
			if (time === undefined)
				time = new Date().getTime();
			self.callback(time);
		};
		originawebkitReqAnimate = window.webkitRequestAnimationFrame;
		window.webkitRequestAnimationFrame = function(callback, element) {
			self.callback = callback;
			originawebkitReqAnimate(web, element);
		};
	}
	if (window.mozRequestAnimationFrame) {
		index = userAgent.indexOf('rv:');
		if (userAgent.indexOf('Gecko') != -1) {
			geckoVersion = userAgent.substr(index + 3, 3);
			if (geckoVersion === '2.0') {
				window.mozRequestAnimationFrame = undefined;
			}
		}
	}
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback, element) {
		var start, finish;
		window.setTimeout(function() {
			start = new Date().getTime();
			callback(start);
			finish = new Date().getTime();
			self.timeout = 1000 / 60 - (finish - start);
		}, self.timeout);
	};
})();

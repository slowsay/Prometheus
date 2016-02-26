/**
 * @author slowsay
 * engineer struct
 */
var Prometheus = Prometheus || {};

Prometheus.blendModes = {
	NORMAL : 0
};

Prometheus.hitTest = function(obj) {
	// var ballright=obj.left+obj.width,;

};
/*
 * @method isBallInBucket
 * @parmas Object,Object
 */
Prometheus.isBallInBucket = function(obj, obj2) {
	var ballcenter = {
		x : obj.x + obj.RADIUS,
		y : obj.y + obj.RADIUS
	}, bucketHitcenter = {
		x : obj2.x + obj2.RADIUS,
		y : obj2.y + obj2.RADIUS
	}, distance = Math.sqrt(bucketHitcenter.x - ballcenter.x, 2) + Math.sqrt(bucketHitcenter.y - ballcenter.y, 2);
	return distance < obj.RADIUS + obj2.RADIUS;
};
Prometheus.errorcode = {
	e404 : 'not find object',
	e405 : 'current object have children,do not operation'
};

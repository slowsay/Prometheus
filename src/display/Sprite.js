/**
 * @author slowsay
 */
/*
 * @method sprite
 */
Prometheus.Sprite = function(texture) {
	Prometheus.DisplayObjectContainer.call(this);
	/*
	 * @property texture
	 */
	this.texture = texture || null;

};
//constructor ,extend DisplayObjectcontainer;
Prometheus.Sprite.prototype = Object.create(Prometheus.DisplayObjectContainer.prototype);
Prometheus.Sprite.prototype.constructor = Prometheus.Sprite;

/*
 * @method setTexture
 */
Prometheus.Sprite.prototype.setTexture = function(texture) {
	this.texture = texture;
};

/*
 * @method rendercanvas
 */
Prometheus.Sprite.prototype.renderCanvas = function(session) {
	if (this.visible === false || this.alpha === 0)
		return;
	var textureimg = new Image();
	textureimg.src = this.texture;
	textureimg.addEventListener('load', function(e) {
		this.texture = e.target;
		session.context.drawImage(this.texture, 0, 0, this.texture.width, this.texture.height, 0, 0, this.texture.width, this.texture.height);
	});

	//overrite
	for (var i = 0, j = this.children.length; i < j; i++) {
		this.children[i].renderCanvas(session);
	}
	;
};

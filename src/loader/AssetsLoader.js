/**
 * @method AssetsLoader
 * @param {string} urls
 * @param {Object} acrossorigin
 */

Prometheus.AssetsLoader = function(urls, acrossorigin) {
    Prometheus.Events.call(this);
    /*
     * assetsurls
     * @params Array
     */
    this.assetsURLs = urls || '';
    /*
     *across origin domain
     */
    this.across = acrossorigin;
    this.arraylength = 0;
};
Prometheus.AssetsLoader.prototype.constructor = Prometheus.AssetsLoader;

// load
Prometheus.AssetsLoader.loadjs = function(arr, fun) {
};
Prometheus.AssetsLoader.loadjs.prototype = Object.create(Prometheus.AssetsLoader.prototype);
Prometheus.AssetsLoader.loadjs.prototype.constructor = Prometheus.AssetsLoader.loadjs; 
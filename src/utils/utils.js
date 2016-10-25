/**
 * @author slowsay
 */
/*
 * untils
 * @hex2rgb
 */
Prometheus.hex2rgb = function (color) {
    return [(color >> 16 & 0xff) / 255, (color >> 8 & 0xff) / 255, (color & 0xff) / 255];
};

Prometheus.hex16rgb = function (color) {
    return '#' + '000000'.substr(0, 6 - color.toString(16).length) + color.toString(16);
};
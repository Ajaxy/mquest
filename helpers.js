var helpers = {
        formatTime: function (ms) {
            var min = Math.floor(ms / 1000 / 60),
                sec = Math.floor(ms / 1000) - min * 60;

            return min + ':' + (sec < 10 ? '0' + sec : sec);
        },

        rand: function (from, to) {
            return Math.floor(Math.random() * (to - from + 1)) + from;
        }
    };

helpers.object = {
    find: function (obj, callback) {
        return obj[this.findKey(obj, callback)] || null;
    },

    findKey: function (obj, callback) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i) && callback(obj[i], i)) {
                return i;
            }
        }

        return null;
    },

    all: function (obj, callback) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i) && !callback(obj[i], i)) {
                return false;
            }
        }

        return true;
    },

    clone: function (obj) {
        return Object.prototype.toString.call(obj) == '[object Array]' ? obj.slice() : $.extend({}, obj);
    },

    keys: Object.keys || function (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys[keys.length] = key;
            }
        }
        return keys;
    },

    values: function (obj) {
        var values = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                values[values.length] = obj[key];
            }
        }
        return values;
    }
};

helpers.array = {
    rand: function (arr) {
        return arr[helpers.rand(0, arr.length - 1)];
    },

    shuffle: function (arr) {
        return helpers.object.clone(arr).sort(function () {
            return Math.random() > 0.5 ? 1 : -1;
        });
    }
};

helpers.string = {
    capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
};

exports.helpers = helpers;
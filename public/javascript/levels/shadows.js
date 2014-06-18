$(window).on('mapready', function (e, map) {
    map.setCenter([41.025630710243334, 28.978808826683615]);
    map.setZoom(14);
    map.options.set({
        maxZoom: 14,
        minZoom: 14
    });

    var b = map.balloon.open(
        map.getCenter(),
        ':(',
        { shadowOffset: [-310388, -128795] }
    );

    window.checkAnswer = function (code) {
        eval(code);
    }
});
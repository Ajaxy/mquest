var lines = [
    [[55.8,37.4], [55.73841227752704,37.39781494140622],[55.69999999999378,37.39837646484374],[55.70155105213947,37.49887695312498],[55.754865791509125,37.49923722607181],[55.755640231640264,37.401733563962445]],
    [[55.69844888599878,37.54694213867185],[55.75951220065742,37.54592912060306]],
    [[55.72930060289584,37.64617936474367],[55.698448885992576,37.58951416015621],[55.76183519676546,37.58300797802492],[55.829141651126335,37.58300797802492]],
    [[55.78737898305897,37.618713544431195],[55.78815277476886,37.541809247556195]]
];

$(window).on('mapready', function (e, map) {
    map.setCenter([55.72, 37.64]);
    map.setZoom(9);
    map.behaviors
        .disable('multiTouch')
        .disable('dblClickZoom')
        .disable('scrollZoom');

    var c = new ymaps.GeoObjectCollection({}, {
        strokeWidth: 50,
        strokeColor: '#ff0000'
    });

    lines.forEach(function (path) {
        c.add(
            new ymaps.Polyline(path)
        );
    });

    map.geoObjects.add(c);

    window.checkAnswer = function (code) {
        eval(code);
    }
});
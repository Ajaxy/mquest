var lines = [
    [[59.97056,30.08310],[59.97056,30.02268],[59.94680,30.00483],[59.92302,30.02268],[59.92302,30.08997]],
    [[59.97125,30.12842],[59.94680,30.10645],[59.92233,30.12842],[59.92233,30.18610]],
    [[59.96987,30.22593],[59.94611,30.20533],[59.92233,30.22318],[59.92233,30.28361],[59.94508,30.3097],[59.96918,30.28361]],
    [[59.96987,30.33304],[59.94473,30.34746],[59.92233,30.32892],[59.92233,30.38935]],
    [[59.94508,30.37424],[59.94508,30.34952]],
    [[59.96943,30.38935],[59.97012,30.33442]]
];

$(window).on('mapready', function (e, map) {
    map.setCenter([59.92233,30.12842]);
    map.setZoom(9);

    var c = new ymaps.GeoObjectCollection({}, {
        opacity: 0,
        strokeWidth: 7,
        strokeColor: '#FF3BE0'
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
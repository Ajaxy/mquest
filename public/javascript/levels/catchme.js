var placemark,
    i = 0;

$(window).on('mapready', function (e, map) {
    var msk = [55.75, 37.62];

    placemark = new ymaps.Placemark(msk, {
        balloonContent: 'Отлично.<br/>Держите курс на /severe.'
    }, {
        iconImageHref: '/images/levels/di_caprio.png',
        iconImageSize: [85, 200],
        hideIconOnBalloonOpen: false,
        balloonOffset: [40, -40],
        balloonAutoPan: false
    });

    map.controls.add('smallZoomControl');
    map.behaviors.enable('multiTouch');
    map.setCenter(msk, 3);
    map.setZoom(5);
    map.geoObjects.add(placemark);

    tick();
});

function tick () {
    if (i >= 360) i = 0;

    var angle = Math.PI * 2 * i / 360,
        cords = ymaps.coordSystem.geo.solveDirectProblem([0, 0], [Math.cos(angle), Math.sin(angle)], 7000000).endPoint;

    placemark.geometry.setCoordinates(cords);

    i += 3;
    setTimeout(tick, 50);
}
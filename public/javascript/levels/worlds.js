$(window).on('mapready', function (e, map) {
    map.setZoom(0);

    var globalPixels = map.options.get('projection').toGlobalPixels([-66.53, 53.65], 0);

    map.setType('yandex#hybrid');
    map.setGlobalPixelCenter([globalPixels[0] + 256, globalPixels[1]]);
    map.setZoom(7);

    map.geoObjects.add(new ymaps.Rectangle([[-66.53, 53.65], [-66.73, 54.2]], {}, {
        pixelRendering: 'static',
        stroke: false,
        fillColor: 'ff0000',
        fillImageHref: 'http://quest-api.maps.yandex.net/images/solutions/api.png'
    }));

    map.controls.add('smallZoomControl');
    map.behaviors
        .enable('scrollZoom')
        .enable('multiTouch');
});
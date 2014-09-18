$(window).on('mapready', function (e, map) {
    map.setCenter([55.8003, 37.673], 12);
    map.setType('yandex#publicMap');
    map.options.set({
        searchControlProvider: ymaps.yandex.geocodeProvider.publicMap,
        searchControlNoPlacemark: true
    });
    map.controls.add(new ymaps.control.SearchControl({
        noPlacemark: true,
        noPopup: true
    }), {
        left: 5,
        top: 5
    });
    map.geoObjects.add(window.x = new ymaps.Rectangle([[48.8606, 2.3362], [48.86, 2.3374]], {
    }, {
        stroke: false,
        fillColor: 'ff0000',
        fillImageHref: 'images/solutions/coldwar.png'
    }));
});
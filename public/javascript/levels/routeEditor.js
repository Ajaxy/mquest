$(window).on('mapready', function (e, map) {
    map.setCenter([49.27514171057955, 13.439085828806927], 3);
    map.options.set('maxZoom', 7);

    var button = new ymaps.control.Button('Сохранить маршрут', {
        selectOnClick: false
    });

    button.events.add('click', function () {
        map.geoObjects.add(map.controls.get('routeEditor').getRoute());
    });

    map.controls
        .add('smallZoomControl')
        .add('routeEditor', { left: 5 })
        .add(button, { left: 40, top: 5 })
        .add(new ymaps.control.SearchControl({
            noPlacemark: true,
            noPopup: true,
            boundedBy: [[40.0867, -49.8421], [57.0160, 76.7203]]
        }), { left: 10, bottom: 30 });

    map.behaviors.enable('multiTouch');
});
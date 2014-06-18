$(window).on('mapready', function (e, map) {
    map.setCenter([50, 0], 2);
    map.controls
        .add('smallZoomControl')
        .add(new ymaps.control.MapTools({ items: ['ruler'] }));
    map.behaviors
        .enable('scrollZoom')
        .enable('multiTouch');
});
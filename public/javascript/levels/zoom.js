$(window).on('mapready', function (e, map) {
    map.setCenter([54.96, 60.32], 0);
    map.options.set('maxZoom', 12);
    map.controls.add('smallZoomControl');
    map.behaviors
        .disable('drag')
        .disable('multiTouch')
        .disable('dblClickZoom')
        .disable('scrollZoom');
});
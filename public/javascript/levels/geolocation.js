$(window).on('mapready', function (e, map) {
    var button = new GeolocationButton({
        data : {
            image : 'images/icon-geolocation.png',
            title : 'Определить местоположение'
        },
        geolocationOptions: {
            enableHighAccuracy : true, // Режим получения наиболее точных данных,
            noAccuracy: true,
            noPlacemark: true
        }
    }, {
        // Зададим опции для кнопки.
        selectOnClick: false
    });

    button.events.add('click', function (e) {
        e.stopImmediatePropagation();

        setTimeout(function () {
            map.setCenter([55.798, 37.675], 14, { duration: 500 });
        }, 200);
    });

    map.controls.add(button, { top : 5, left : 5 });
    map.geoObjects.add(new ymaps.Rectangle([[55.8003, 37.673], [55.8000, 37.6755]], {}, {
        stroke: false,
        fillColor: 'ff0000',
        fillImageHref: 'images/solutions/monalisa.png'
    }));
    map.setCenter([55.75, 37.62], 15);
});
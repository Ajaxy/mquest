$(window).on('mapready', function (e, map) {
    var msk = [55.75, 37.62];
    map.setCenter(msk, 3);
    map.balloon.open(msk, 'А теперь посмотрите на URL страницы<br/>и перейдите на уровень 2!');
});
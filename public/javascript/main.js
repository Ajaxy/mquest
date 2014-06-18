function setupUsername () {
    $('#username').text($.cookie('username'));
}

function setupMap () {
    var $container = $('#map'),
        mapReady = false;

    if (!$container.length) {
        return;
    }

    $(window).on('mapready', function () {
        mapReady = true;
    });

    setTimeout(function () {
        if (!mapReady) location.reload();
    }, 3000);

    window.map = new ymaps.Map($container[0], {
        center: [40, 0],
        zoom: 0,
        maxZoom: 3,
        minZoom: 0,
        behaviors: ['drag', 'scrollZoom', 'dblClickZoom', 'multitouch']
    });

    var evalFunc = function (e) {
            e.preventDefault();

            var input = $('#user-js')[0];

            input.blur();

            window.checkAnswer(input.value);

            return false;
        };

    $(window).trigger('mapready', [map]);

    $('#eval-form').on('submit', evalFunc);
    $('#footer').on('transitionend webkitTransitionEnd', function () {
        map.container.fitToViewport();
    });
    $('.footer-toggle').on('vclick', function (e) {
        e.preventDefault();
        $('#footer').toolbar('toggle');
    });
}

function setupUserJS () {
    $('#user-js').on('keyup', function () {
        var value = $(this).val();

        if (value.length == 1) {
            $(this).val(value.toLowerCase());
        }
    });
}

function setupFooter () {
    $('#footer')
        .toolbar('option', 'hideDuringFocus', 'textarea')
        .toolbar('option', 'tapToggle', false);
}

function onAjaxError (e, res) {
    var json = res.responseJSON || (res.responseText && JSON.parse(res.responseText));

    alert('Ошибка: ' + json && json.error || res);
}

$(function () {
    setupUsername();
    setupFooter();
    setupUserJS();

    $.ajaxSetup({ dataType: 'json' });
    $(document).ajaxError(onAjaxError);

    ymaps.ready(function () {
        setTimeout(setupMap, 1000);
    });
});

// Handle remote (ajax) forms.
$(function () {
    $('form[data-remote=true]').on('submit', function (e) {
        var $form = $(this),
            $action = $(this).attr('action') || location.href,
            ajax;

        if ($form.attr('method') == 'post') {
            ajax = $.post($action, $form.serialize());
        } else {
            ajax = $.get($action + '?' + $form.serialize());
        }

        ajax
            .complete(function () { $form.trigger('ajax:complete', arguments); })
            .success(function () { $form.trigger('ajax:success', arguments); })
            .error(function () { $form.trigger('ajax:error', arguments); });

        e.preventDefault();

        return false;
    });
});
$(window).on('mapready', function (e, map) {
    map.setCenter([26.03616667751742, 7.057927409523885], 7);
    map.setType('yandex#satellite');

    var n = 5, links = [], listBox;

    function onButtonClick (e) {
        var button = e.get('target'),
            i = button.data.get('i'),
            j = button.data.get('j'),
            siblings = [links[i][j - 1], links[i][j + 1]]

        if (links[i - 1]) {
            siblings = siblings.concat([links[i - 1][j - 1], links[i - 1][j], links[i - 1][j + 1]])
        }

        if (links[i + 1]) {
            siblings = siblings.concat([links[i + 1][j - 1], links[i + 1][j], links[i + 1][j + 1]])
        }

        siblings.forEach(function (sibling) {
            if (sibling) {
                sibling.state.set('selected', !sibling.state.get('selected'));
            }
        });
    }

    function onListItemClick () {
        var itemN = this - 1,
            states = [
                ['0-2', '0-3', '0-4', '1-2', '1-4', '2-2', '2-3', '4-3', '4-4'],
                ['0-3', '0-4', '3-1', '3-2', '3-4', '4-0', '4-1', '4-2', '4-3', '4-4'],
                ['1-1', '2-0', '2-4', '3-1', '3-3', '3-4', '4-1', '4-4'],
                ['0-0', '0-4', '1-0', '1-1', '1-4', '2-0', '3-1', '3-4']
            ];
        
        links.forEach(function (row, i) {
            row.forEach(function (button, j) {
                button.state.set('selected', states[itemN].indexOf(i + '-' + j) > -1);
            });
        });

        listBox.data.set('title', listBox.get(itemN).data.get('content'));
        listBox.collapse();
    }

    for (var i = 0; i < n; i++) {
        links.push([]);
        for (var j = 0; j < n; j++) {
            var b = new ymaps.control.Button({
                data: {
//                    content: '&nbsp;&nbsp;&nbsp;&nbsp;',
                    image: 'images/levels/pill_blue.png',
                    imageSelected: 'images/levels/pill_red.png',
                    i: i,
                    j: j
                }
            });
            b.events.add('click', onButtonClick);
            links[links.length - 1].push(b);
            map.controls.add(b, { top: 5 + 30 * i, left: 5 + 30 * j});
        }
    }

    listBox = new ymaps.control.ListBox({
        data: {
            title: '_ _ _ _'
        },
        items: [
            new ymaps.control.ListBoxItem({data: {content: '(3,3)(4,2)(3,5)(1,1)'}}),
            new ymaps.control.ListBoxItem({data: {content: '(3,2)(2,5)(5,3)(2,3)'}}),
            new ymaps.control.ListBoxItem({data: {content: '(1,3)(2,2)(1,5)(4,1)'}}),
            new ymaps.control.ListBoxItem({data: {content: '(1,3)(5,2)(3,4)(5,5)'}})
        ]
    });

    listBox.get(0).events.add('click', onListItemClick, 1);
    listBox.get(1).events.add('click', onListItemClick, 2);
    listBox.get(2).events.add('click', onListItemClick, 3);
    listBox.get(3).events.add('click', onListItemClick, 4);

    map.controls.add(listBox, { top: 5, right: 5 });
});
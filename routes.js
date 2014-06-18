var url = require('url'),
    helpers = require('./helpers').helpers,
    User = require('./models').User;

module.exports = function (app) {
    var levelNames = {
            level1: 'level1',
            level2: 'catchme',
            severe: 'zoom',
            chebarkul: 'geolocation',
            monalisa: 'louvre',
            coldwar: 'ruler',
            reykjavik: 'morze',
            matrix: 'buttons',
            gang: 'routeEditor',
            nuremberg: 'worlds',
            api: 'strokeWidth',
            bit: 'opacity',
            clue: 'shadows',
            seine: 'end'
        },
        levelRegex = {
            reykjavik: /re[yj]k[yj]av[ií][ck]/i,
            nuremberg: /n[üu]re?[mn]berg/i
        },
        levelRegexValues = helpers.object.values(levelRegex),
        levels = helpers.object.keys(levelNames),
        tips = {
            level3: 'Это было бы слишком просто.',
            chelyabinsk: 'Говорят, это было озеро.',
            cheliabinsk: 'Говорят, это было озеро.',
            meteor: 'Да, метеорит! Но в этот раз вы ищете географическое название.',
            meteorite: 'Да, метеорит! Но в этот раз вы ищете географическое название.',
            iceland: 'Будьте точнее.',
            louvre: 'Да. Ищите её там.',
            antarctica: 'Ищите её в параллельном мире.',
            cite: 'Salut! Quelle est cette rivière?',
            notredame: 'Salut! Quelle est cette rivière?',
            notredamedeparis: 'Salut! Quelle est cette rivière?'
        },
        ajaxActions = {
            'save-username': function (req, res) {
                var name = req.query.username;

                if (name && name.length) {
                    User.findOne({ name: name }, function (err, existingUser) {
                        if (handleError(err, res)) return;

                        if (!existingUser) {
                            (new User({
                                name: name,
                                level: levels.indexOf(req.query.level) + 1,
                                reached_at: Date.now()
                            })).save(function (err) {
                                if (handleError(err, res)) return;

                                res.json({ status: 'ok' });
                            });
                        } else {
                            res.json(500, { error: 'Это имя уже занято.' });
                        }
                    });
                } else {
                    res.json(500, { error: 'Введите имя.' });
                }
            }
        };

    function handleError (err, res) {
        if (err) {
            if (app.get('env') == 'development') {
                res.json(500, { error: err });
            } else {
                res.end(500);
            }
        }
        return err;
    }

    function all (req, res) {
        var levelUrl = decodeURI(req.url).replace('/', '').toLowerCase();

        if (levelUrl == 'admin-users') {
            User.find({}).sort({ level: -1, reached_at: 1 }).execFind(function (err, users) {
                res.render('admin-users', { users: users });
            });

            return;
        }

        if (!levelUrl.length) {
            if (req.cookies.username) {
                res.writeHead(302, { 'Location': 'level1' });
                res.end();
            } else {
                res.render('index');
            }

            return;
        } else if (!req.cookies.username) {
            res.writeHead(302, { 'Location': '/' });
            res.end();

            return;
        }

        var levelNumber = levels.indexOf(levelUrl) + 1;

        if (levelNumber) {
            function doRender () {
                User.getToplist(function (err, toplist) {
                    if (handleError(err, res)) return;

                    res.render(levelNames[levelUrl], { levelNumber: levelNumber, toplist: toplist });
                });
            }

            if (req.cookies.username) {
                User.findOne({ name: req.cookies.username, level: { $lt: levelNumber } }, function (err, user) {
                    if (err || !user) return doRender();

                    user.level = Math.max(user.level, levelNumber);
                    user.reached_at = Date.now();
                    user.save(doRender);
                });
            }
        } else {
            var matchIndex = -1;

            levelRegexValues.forEach(function (regex, i) {
                if (levelUrl.match(regex)) {
                    matchIndex = i;
                    return false;
                }
            });

            if (matchIndex >= 0) {
                res.writeHead(302, { 'Location': helpers.object.keys(levelRegex)[matchIndex] });
                res.end();

                return;
            }

            var tip = tips[levelUrl] ? '<div id="puzzle-text">' + tips[levelUrl] + '</div>' : '<div class="error">Такого уровня нет.</div>',
                title = tips[levelUrl] ? 'Продолжайте искать' : 'Ошибка';

            res.render('miss', { title: title, tip: tip });
        }
    }

    function ajax (req, res) {
        var action = ajaxActions[url.parse(req.url).pathname.replace('/ajax/', '')];

        if (action) {
            action(req, res);
        } else {
            res.writeHead(404);
            res.end();
        }
    }

    return {
        all: all,
        ajax: ajax
    }
};


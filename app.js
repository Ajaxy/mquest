var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var app = express();
var routes = require('./routes')(app);
var minify = require('express-minify');

mongoose.connect('mongodb://localhost/quest-users');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(app.router);
if ('development' != app.get('env')) {
    app.use(express.compress());
    app.use(minify());
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.locals.pretty = true;
}

app.get(/^\/ajax/, routes.ajax);
app.get(/^\/[\w\d\-\_\%]*$/i, routes.all);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port') + ' with ' + app.get('env') + ' env.');
});

function errorHandler(req, res, next) {
    res.writeHead(404, { 'Content-Type': 'text/event-stream' });
    res.end();
}
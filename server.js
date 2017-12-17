var express         = require('express');
var path            = require('path');
var log             = require('./libs/log')(module);
var config          = require('./libs/config');
var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

app.get('/contact', function(req, res) {
    res.send('This is not implemented now');
});

app.post('/contact', function(req, res) {
    res.send('This is not implemented now');
});

app.get('/contact/:id', function(req, res) {
    res.send('This is not implemented now');
});

app.put('/contact/:id', function (req, res){
    res.send('This is not implemented now');
});

app.delete('/contact/:id', function (req, res){
    res.send('This is not implemented now');
});


//Error Handler 404 and 500
app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});

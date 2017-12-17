var express         = require('express');
var path            = require('path');

var app = express();

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.listen(8080, function(){ //plz edit this
    console.log('Express server listening on port 8080');
});

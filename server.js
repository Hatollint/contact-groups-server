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

app.get('/group', function(req, res) {
  return GroupModel.find(function (err, group) {
      if (!err) {
          return res.send(group);
      } else {
          res.statusCode = 500;
          log.error('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
      }
  });
});

app.post('/group', function(req, res) {
  var group = new GroupModel({
      name: req.body.name,
      number: req.body.number,
  });

  group.save(function (err) {
      if (!err) {
          log.info("group created");
          return res.send({ status: 'OK', group:group });
      } else {
          console.log(err);
          if(err.name == 'ValidationError') {
              res.statusCode = 400;
              res.send({ error: 'Validation error' });
          } else {
              res.statusCode = 500;
              res.send({ error: 'Server error' });
          }
          log.error('Internal error(%d): %s',res.statusCode,err.message);
      }
  });
});

app.get('/group/:id', function(req, res) {
  return GroupModel.findById(req.params.id, function (err, group) {
      if(!group) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
      }
      if (!err) {
          return res.send({ status: 'OK', group:group });
      } else {
          res.statusCode = 500;
          log.error('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
      }
  });
});

app.put('/group/:id', function (req, res){
  return GroupModel.findById(req.params.id, function (err, group) {
      if(!group) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
      }

      group.name = req.body.name;
      group.number = req.body.number;
      return group.save(function (err) {
          if (!err) {
              log.info("group updated");
              return res.send({ status: 'OK', group:group });
          } else {
              if(err.name == 'ValidationError') {
                  res.statusCode = 400;
                  res.send({ error: 'Validation error' });
              } else {
                  res.statusCode = 500;
                  res.send({ error: 'Server error' });
              }
              log.error('Internal error(%d): %s',res.statusCode,err.message);
          }
      });
  });
});

app.delete('/group/:id', function (req, res){
  return GroupModel.findById(req.params.id, function (err, group) {
      if(!group) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
      }
      return group.remove(function (err) {
          if (!err) {
              log.info("group removed");
              return res.send({ status: 'OK' });
          } else {
              res.statusCode = 500;
              log.error('Internal error(%d): %s',res.statusCode,err.message);
              return res.send({ error: 'Server error' });
          }
      });
  });
});

app.get('/contact', function(req, res) {
  return ContactModel.find(function (err, contact) {
      if (!err) {
          return res.send(contacts);
      } else {
          res.statusCode = 500;
          log.error('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
      }
  });
});

app.post('/contact', function(req, res) {
  var contact = new ContactModel({
      name: req.body.name,
      number: req.body.number,
  });

  contact.save(function (err) {
      if (!err) {
          log.info("contact created");
          return res.send({ status: 'OK', contact:contact });
      } else {
          console.log(err);
          if(err.name == 'ValidationError') {
              res.statusCode = 400;
              res.send({ error: 'Validation error' });
          } else {
              res.statusCode = 500;
              res.send({ error: 'Server error' });
          }
          log.error('Internal error(%d): %s',res.statusCode,err.message);
      }
  });
});

app.get('/contact/:id', function(req, res) {
  return ContactModel.findById(req.params.id, function (err, contact) {
      if(!contact) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
      }
      if (!err) {
          return res.send({ status: 'OK', contact:contact });
      } else {
          res.statusCode = 500;
          log.error('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
      }
  });
});

app.put('/contact/:id', function (req, res){
  return ContactModel.findById(req.params.id, function (err, contact) {
      if(!contact) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
      }

      contact.name = req.body.name;
      contact.number = req.body.number;
      return contact.save(function (err) {
          if (!err) {
              log.info("contact updated");
              return res.send({ status: 'OK', contact:contact });
          } else {
              if(err.name == 'ValidationError') {
                  res.statusCode = 400;
                  res.send({ error: 'Validation error' });
              } else {
                  res.statusCode = 500;
                  res.send({ error: 'Server error' });
              }
              log.error('Internal error(%d): %s',res.statusCode,err.message);
          }
      });
  });
});

app.delete('/contact/:id', function (req, res){
  return ContactModel.findById(req.params.id, function (err, contact) {
      if(!contact) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
      }
      return contact.remove(function (err) {
          if (!err) {
              log.info("contact removed");
              return res.send({ status: 'OK' });
          } else {
              res.statusCode = 500;
              log.error('Internal error(%d): %s',res.statusCode,err.message);
              return res.send({ error: 'Server error' });
          }
      });
  });
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

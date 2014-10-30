var express = require('express');
var http = require('http');
var routes = require('./routes');
var path = require('path');


var app = express();
var server = http.createServer(app);


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('env', env);
app.set('port', process.env.PORT || 3888);

if ('dev' == app.get('env')) {
  app.use(express.errorHandler());
}


routes(app);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ', app.get('port'));
});

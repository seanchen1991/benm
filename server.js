var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./app/routes');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var seeder = require('./app/seeder');
var app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: app.get('views') + '/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some-secret-value-here'));
app.use('app.router');
app.use('/', express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect('mongodb://localhost/Benm');
mongoose.connection.on('open', function() {
  console.log('Connected to Mongoose...');
  seeder.check();
});

routes.initialize(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Server up: http://localhost:' + app.get('port'));
});

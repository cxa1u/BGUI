// load the things we need
var express = require('express'),
	app = express(),
	path = require('path'),
  http = require('http'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
	server;


app.use(cookieParser());

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// set the view engine to ejs
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'public/views'));
// app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.render('index.html');
});



server = http.createServer(app).listen(5555, function() {
    console.log("Express server listening on port " + 5555);
});

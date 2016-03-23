// load the things we need
var express = require('express'),
	app = express(),
	path = require('path'),
  http = require('http'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
	server;

var storeLocations = require('./data/storeLocations.json');
var storeInfo = require('./data/storeInfo.json');


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


//Initial map search api response

app.get('/getStoreLocations', function(req, res) {
	res.json(storeLocations);
});


app.get('/getStoreInfo/:storeId', function(req, res) {
	console.log("Requested store :", req.params.storeId);
	res.json(storeInfo);

});

var appPort = process.env.PORT || 5000;
server = http.createServer(app).listen(appPort, function() {
    console.log("BGUI app listening on port " + appPort);
});
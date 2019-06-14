const express = require('express');
const path = require('path');

var app = express();
var route = express.Router();
var baseUrl = '/node/exodus/';
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(baseUrl, express.static(path.join(__dirname, 'public')));

route.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).render('_layout.ejs', {
		page: 'pages/_home.ejs',
		body: '',
		base: baseUrl
	});
});

route.get('/about', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).render('_layout.ejs', {
		page: 'pages/_about.ejs',
		body: '',
		base: baseUrl
	});
});

route.get('/music', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).render('_layout.ejs', {
		page: 'pages/_music.ejs',
		body: '',
		base: baseUrl
	});
});

route.get('/contact', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).render('_layout.ejs', {
		page: 'pages/_contact.ejs',
		body: 'darkNav',
		base: baseUrl
	});
});

route.get('/gallery', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).render('_layout.ejs', {
		page: 'pages/_gallery.ejs',
		body: 'darkNav',
		base: baseUrl
	});
});

app.use(baseUrl, route);
app.listen(process.env.PORT);
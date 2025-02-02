'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const serverless = require('serverless-http');

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Strona główna', message: 'Witaj w mojej aplikacji!' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Kontakt' });
});

app.post('/submit-form', (req, res) => {
  console.log(req.body);
  res.send('Formularz został wysłany!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Błąd serwera', error: err });
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Nie znaleziono' });
});

module.exports.handler = serverless(app);

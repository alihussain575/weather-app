const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { errorLog, successLog, serverLog } = require('./colors/colors');
const getWeatherForcast = require('./utils/getWeatherForcast');
const geocode = require('./utils/geocode');

const app = express();

const staticPage = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setip static directory to serve
app.use(express.static(staticPage));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ali hussain',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Andrew Mead',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ali hussain',
    errorMessage: 'Help article not found.',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ali hussain',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      getWeatherForcast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: data.weather_descriptions[0],
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ali hussain',
    errorMessage: 'Page not found.',
  });
});

app.listen(4000, () => {
  serverLog('Server is up on port 4000');
});

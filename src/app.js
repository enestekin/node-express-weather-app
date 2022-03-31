import express from 'express';
import path from 'path';
import hbs from 'hbs';
import getGeocode from './utils/geocode.js';
import getForecast from './utils/forecast.js';

const __dirname = path.resolve();

const partialsPath = path.join(__dirname, 'partials');
const publicDirectoryPath = express.static(path.join(__dirname, 'public'));

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(publicDirectoryPath);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Enes Tekin',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Enes Tekin',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Enes Tekin',
  });
});

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address',
    });
  }

  const { latitude, longitude, location, error } = await getGeocode(
    req.query.address
  );
  const forecastData = await getForecast(latitude, longitude);

  if (error) {
    res.send({ error });
  }

  res.send({
    forecast: forecastData,
    location,
    address: req.query.address,
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: '404 Not Found',
    name: 'Enes Tekin',
  });
});

app.listen(port, () => {
  console.log(`App is up and running on port ${port}`);
});

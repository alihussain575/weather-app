const request = require('request');

const getWeatherForcast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d2885f4a8bc0eb56db34ec7e2fae0ada&query=${latitude},${longitude}&units=f`;

  request({ url: url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback('Unable to connect to service', undefined);
    }
    if (response.body.error) {
      callback('Unable to find location. try another search', undefined);
    } else {
      const data = body.current;
      callback(undefined, data);
    }
  });
};

module.exports = getWeatherForcast;

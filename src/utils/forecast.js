import axios from 'axios';

const getForecast = async (latitude, longitude) => {
  const URL = `http://api.weatherstack.com/current?access_key=7d600791a07f49d72ae4eb5befd44f2f&query=${latitude},${longitude}`;
  try {
    const response = await axios.get(URL);

    return `${response.data.current.weather_descriptions[0]}. It is currently ${response.data.current.temperature} degrees`;
  } catch (error) {
    return error;
  }
};

export default getForecast;

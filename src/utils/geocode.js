import axios from 'axios';

const getGeocode = async (address) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZW5lc3Rla2luIiwiYSI6ImNrbTdzbTh4YTExMHIyb210dGJqZzMzMGYifQ.vus_vquqc-Yqz0HOO-NMTw`;

  try {
    const response = await axios.get(geocodeURL);

    const latitude = response.data.features[0].center[1];
    const longitude = response.data.features[0].center[0];
    const location = response.data.features[0].place_name;

    return { latitude, longitude, location };
  } catch (error) {
    return error;
  }
};

export default getGeocode;

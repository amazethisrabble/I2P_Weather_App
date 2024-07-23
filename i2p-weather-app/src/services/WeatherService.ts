import axios from 'axios';

export const getWeatherForecastUrl = async (lat: number, lng: number): Promise<string> => {
  const response = await axios.get(`https://api.weather.gov/points/${lat},${lng}`);
  return response.data.properties.forecast;
};

export const getWeatherForecast = async (forecastUrl: string): Promise<any> => {
  const response = await axios.get(forecastUrl);
  return response.data;
};

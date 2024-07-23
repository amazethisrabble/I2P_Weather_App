import React, { useState } from 'react';
import AddressInput from './components/AddressInput';
import WeatherForecast from './components/WeatherForecast';
import { getWeatherForecastUrl, getWeatherForecast } from './services/WeatherService';

/////////   CHOOSE WHICH GEOCODE SERVICE TO USE /////////
//import { geocodeAddress } from './services/GoogleGeocodeService'  
import { geocodeAddress } from './services/CensusGeocodeService'



const App: React.FC = () => {
  const [forecast, setForecast] = useState<any>(null);
  const [city, setCity] = useState<string>('');

  const handleAddress = async (address: string) => {
    try {
      const { lat, lng, city} = await geocodeAddress(address);
      const forecastUrl = await getWeatherForecastUrl(lat, lng);
      const weatherForecast = await getWeatherForecast(forecastUrl);
      setForecast(weatherForecast);
      setCity(city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
  <div className='app'>
    <AddressInput onAddress={handleAddress} />
    <div className='forecast'>
      {forecast && <WeatherForecast forecast={forecast} city={city}/>}
    </div>
  </div>

  );
};

export default App;

import React, { useState } from 'react';
import './WeatherForecast.css'

interface WeatherForecastProps {
  forecast: {
    properties: {
      periods: {
        number: number;
        name: string;
        temperature: number;
        shortForecast: string;
      }[]
    }
  }
  city: string;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, city}) => {

  const showDetailed = "Show detailed weather";
  const showSimplified = "Show simplified weather";
  
  const [buttonText, setButtonText] = useState(showDetailed);
  const [simplified, setSimplified] = useState(true)
 
  const handleClick = () => {
      setButtonText(buttonText === showDetailed ? showSimplified : showDetailed);
      setSimplified(simplified === true ? false : true);
  };

  const weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="weather-forecast">
      <h1>7-Day Weather Forecast for {city}</h1>
      <button onClick={handleClick}>{buttonText}</button>

      {simplified && 
      <div className="simplified-weather-cards">
        {forecast.properties.periods
          .filter((period) => (period.number === 1 || weekdays.includes(period.name)))
          .map((period: any) => (
            <div className="simplified-weather-card" key={period.number}>
              <h3>{period.name}</h3>
              <h2>{period.temperature}°F</h2>
              <p>{period.shortForecast}</p>
            </div>
          ))
        }
      </div>
      } 
      
      {!simplified && 
      <div className="detailed-weather-cards">
        {forecast.properties.periods
          .map((period: any) => (
            <div className="detailed-weather-card" key={period.number}>
              <h3>{period.name}</h3>
              <p>{period.detailedForecast}</p>
            </div>
          ))
        }
      </div>
      }
    </div>
  );
};

export default WeatherForecast;

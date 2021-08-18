import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = (props) => {
  const { city } = props;
  const [cityWeather, setCityWeather] = useState();
  console.log(city);

  useEffect(() => {
    axios
      .get(
        `https://www.metaweather.com/api/location/search/?query=${city.toLowerCase()}`
      )
      .then((res) => {
        console.log(res);
        const cityInfo = res.data[0];
        console.log(cityInfo);
        axios
          .get(`https://www.metaweather.com/api/location/${cityInfo.woeid}/`)
          .then((res) => {
            const newCityWeather = res.data;
            setCityWeather(newCityWeather);
          });
      });
  }, [city]);

  return (
    <div>
      {cityWeather &&
      cityWeather.consolidated_weather &&
      cityWeather.consolidated_weather.length > 0 ? (
        <ul>
          {cityWeather.consolidated_weather.map((weather) => {
            return (
              <li key={weather.id}>
                <strong>{weather.applicable_date}</strong>
                {"  "}
                <span>
                  {weather.min_temp} to {weather.max_temp}
                </span>
                {"  "}
                <em>{weather.weather_state_name}</em>
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;

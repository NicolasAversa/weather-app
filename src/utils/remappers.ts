import {
  CurrentWeatherApiResponse,
  ForecastApiResponse,
  Weather,
  WeatherForecast,
} from "@/types";
import { parse } from "date-fns";

const remapWeatherInformation = (
  weather: CurrentWeatherApiResponse
): Weather => {
  return {
    cloudPercentage: weather.current.cloud,
    humidity: weather.current.humidity,
    temperature: {
      celsius: weather.current.temp_c,
      fahrenheit: weather.current.feelslike_f,
    },
    windSpeed: {
      kilometersPerHour: weather.current.wind_kph,
      metersPerSecond: weather.current.wind_mph,
    },
    windDirection: weather.current.wind_degree,
  };
};

const remapForecast = (weather: ForecastApiResponse): WeatherForecast[] => {
  const forecast: WeatherForecast[] = weather.forecast.forecastday.map(
    ({ date, day }) => ({
      date: parse(date, "yyyy-MM-dd", new Date()),
      cloudPercentage: day.daily_chance_of_rain,
      humidity: day.avghumidity,
      temperature: {
        celsius: day.avgtemp_c,
        fahrenheit: day.avgtemp_f,
      },
      windSpeed: {
        kilometersPerHour: day.maxwind_kph,
        metersPerSecond: day.maxwind_mph,
      },
    })
  );

  return forecast;
};

export { remapWeatherInformation, remapForecast };

import { dateFormats } from "@/constants";
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
    city: weather.location.name,
    localTime: weather.location.localtime,
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
    uv: weather.current.uv,
  };
};

const remapForecast = (weather: ForecastApiResponse): WeatherForecast[] => {
  const forecast: WeatherForecast[] = weather.forecast.forecastday.map(
    ({ date, day }) => ({
      date: parse(date, dateFormats.yearMonthDay, new Date()),
      humidity: day.avghumidity,
      maximumTemperature: {
        celsius: day.maxtemp_c,
        fahrenheit: day.maxtemp_f,
      },
      minimumTemperature: {
        celsius: day.mintemp_c,
        fahrenheit: day.mintemp_f,
      },
      maximumWindSpeed: {
        kilometersPerHour: day.maxwind_kph,
        metersPerSecond: day.maxwind_mph,
      },
      chancesOfRain: day.daily_chance_of_rain,
      uv: day.uv,
    })
  );

  return forecast;
};

export { remapWeatherInformation, remapForecast };

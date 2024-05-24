import { dateFormats } from "@/constants";
import {
  AutocompleteApiOption,
  CityDetails,
  RealTimeWeatherApiResponse,
  ForecastApiResponse,
  Weather,
  WeatherForecast,
} from "@/types";
import { parse } from "date-fns";
import { locationToLocationId, buildLocationLabel } from "./textFormatters";

const remapLocation = (
  location: RealTimeWeatherApiResponse["location"]
): Weather["location"] => {
  const { name, region, localtime, country } = location;

  const locationLabel = buildLocationLabel(name, region, country);
  const locationId = locationToLocationId(locationLabel);

  return {
    name,
    region,
    localTime: localtime,
    label: locationLabel,
    id: locationId,
  };
};

const remapRealTimeWeatherResponse = (
  weather: RealTimeWeatherApiResponse
): Weather => {
  return {
    location: remapLocation(weather.location),
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

const remapForecastResponse = (
  weather: ForecastApiResponse
): WeatherForecast[] => {
  const forecast: WeatherForecast[] = weather.forecast.forecastday.map(
    ({ date, day }) => ({
      location: remapLocation(weather.location),
      city: weather.location.name,
      region: weather.location.region,
      localTime: weather.location.localtime,
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

const remapCityDetails = (cityDetails: AutocompleteApiOption): CityDetails => {
  return {
    id: cityDetails.id,
    name: cityDetails.name,
    region: cityDetails.region,
    country: cityDetails.country,
  };
};

export {
  remapRealTimeWeatherResponse,
  remapForecastResponse,
  remapCityDetails,
};

import { Weather, WeatherTypes } from "@/types";

const getWeatherTypeFromWeather = (weather: Weather): WeatherTypes => {
  const { cloudPercentage, humidity } = weather;
  if (humidity >= 70 && cloudPercentage >= 75) return WeatherTypes.RAIN;
  if (cloudPercentage >= 75) return WeatherTypes.CLOUDS;
  if (cloudPercentage >= 25) return WeatherTypes.CLOUDY;
  return WeatherTypes.SUNNY;
};

export { getWeatherTypeFromWeather };

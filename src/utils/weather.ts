import { WeatherInformation } from "@/context/weatherContext/WeatherContext";
import { WeatherTypes } from "@/types";

const getWeatherTypeFromWeather = (
  weather: WeatherInformation
): WeatherTypes => {
  const { cloudPercentage, humidity } = weather;
  if (humidity >= 70 && cloudPercentage >= 75) return WeatherTypes.RAIN;
  if (cloudPercentage >= 75) return WeatherTypes.CLOUDS;
  if (cloudPercentage >= 25) return WeatherTypes.CLOUDY;
  return WeatherTypes.SUNNY;
};

export { getWeatherTypeFromWeather };

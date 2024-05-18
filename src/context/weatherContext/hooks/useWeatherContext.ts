import { useContext } from "react";
import {
  WeatherContext,
  WeatherForecast,
  WeatherInformation,
} from "../WeatherContext";
import { ActionTypes } from "../weatherReducer";
import { useLocalStorage } from "@/hooks";

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  const [_, setFavoriteCities] = useLocalStorage("favoriteCities", []);

  if (context === undefined) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  const { state, dispatch } = context;

  const dispatchers = {
    setLocationWeather: (location: string, value: WeatherInformation): void =>
      dispatch({
        type: ActionTypes.SET_LOCATION_WEATHER,
        value: { location, weather: value },
      }),
    setLocationForecast: (location: string, value: WeatherForecast[]): void =>
      dispatch({
        type: ActionTypes.SET_LOCATION_FORECAST,
        value: { location, forecast: value },
      }),
    saveLocationToFavorites: (location: string): void => {
      dispatch({
        type: ActionTypes.ADD_LOCATION_TO_FAVORITES,
        value: { location },
      });
      setFavoriteCities([...context.state.favoriteCities, location]);
    },
    removeLocationToFavorites: (location: string): void => {
      dispatch({
        type: ActionTypes.REMOVE_LOCATION_TO_FAVORITES,
        value: { location },
      });
      setFavoriteCities(
        context.state.favoriteCities.filter((city) => city !== location)
      );
    },
  };

  const helpers = {
    isCityWeatherCached: (city: string): boolean => !!state.locations[city],
    isCityForecastCached: (city: string): boolean =>
      !!state.locationForecasts[city],
    getCurrentCityWeather: (city?: string): WeatherInformation | undefined =>
      city ? state.locations[city] : undefined,
    isFavoriteCity: (city: string): boolean =>
      state.favoriteCities.includes(city),
  };

  return {
    state,
    dispatchers,
    helpers,
  };
};

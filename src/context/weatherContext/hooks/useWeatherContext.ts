import { useContext } from "react";
import { WeatherContext } from "../WeatherContext";
import { ActionTypes } from "../weatherReducer";
import { useLocalStorage } from "@/hooks";
import { Weather, WeatherForecast } from "@/types";
import { FAVORITE_CITIES_LOCAL_STORAGE_ID } from "@/constants/ids";

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  const [_, setFavoriteCities] = useLocalStorage(
    FAVORITE_CITIES_LOCAL_STORAGE_ID,
    []
  );

  if (context === undefined) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  const { state, dispatch } = context;

  const dispatchers = {
    setLocationWeather: (location: string, value: Weather): void =>
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
    setClientCity: (city: string): void => {
      dispatch({
        type: ActionTypes.SET_CLIENT_CITY,
        value: city,
      });
    },
  };

  const helpers = {
    isCityWeatherCached: (city: string): boolean => !!state.locations[city],
    isCityForecastCached: (city: string): boolean =>
      !!state.locationForecasts[city],
    getCityRealTimeWeather: (city?: string): Weather | undefined =>
      city ? state.locations[city] : undefined,
    getCityWeatherForecast: (city?: string): WeatherForecast[] | undefined =>
      city ? state.locationForecasts[city] : undefined,
    isFavoriteCity: (city: string): boolean =>
      state.favoriteCities.includes(city),
  };

  return {
    state,
    dispatchers,
    helpers,
  };
};

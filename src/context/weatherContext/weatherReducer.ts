import { Weather, WeatherForecast } from "@/types";
import { WeatherState } from "./WeatherContext";

enum ActionTypes {
  SET_LOCATION_WEATHER,
  SET_LOCATION_FORECAST,
  ADD_LOCATION_TO_FAVORITES,
  REMOVE_LOCATION_TO_FAVORITES,
  SET_CLIENT_CITY,
}

type SetLocationWeatherValue = {
  location: string;
  weather: Weather;
};

type SetLocationForecastValue = {
  location: string;
  forecast: WeatherForecast[];
};

type Action =
  | {
      type: ActionTypes.SET_LOCATION_WEATHER;
      value: SetLocationWeatherValue;
    }
  | {
      type: ActionTypes.SET_LOCATION_FORECAST;
      value: SetLocationForecastValue;
    }
  | {
      type:
        | ActionTypes.ADD_LOCATION_TO_FAVORITES
        | ActionTypes.REMOVE_LOCATION_TO_FAVORITES;
      value: { location: string };
    }
  | {
      type: ActionTypes.SET_CLIENT_CITY;
      value: string;
    };

const weatherReducer = (state: WeatherState, action: Action): WeatherState => {
  switch (action.type) {
    case ActionTypes.SET_CLIENT_CITY: {
      return {
        ...state,
        clientCity: action.value,
      };
    }
    case ActionTypes.SET_LOCATION_WEATHER: {
      return {
        ...state,
        locations: {
          ...state.locations,
          [action.value.location]: action.value.weather,
        },
      };
    }
    case ActionTypes.SET_LOCATION_FORECAST: {
      return {
        ...state,
        locationForecasts: {
          ...state.locationForecasts,
          [action.value.location]: action.value.forecast,
        },
      };
    }
    case ActionTypes.ADD_LOCATION_TO_FAVORITES: {
      return {
        ...state,
        favoriteCities: [
          ...(state.favoriteCities ? state.favoriteCities : []),
          action.value.location,
        ],
      };
    }
    case ActionTypes.REMOVE_LOCATION_TO_FAVORITES: {
      return {
        ...state,
        favoriteCities: state.favoriteCities?.filter(
          (city) => city !== action.value.location
        ),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

export { ActionTypes, weatherReducer };
export type { Action };

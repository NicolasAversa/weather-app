import { ReactNode, useReducer } from "react";
import { WeatherContext, WeatherState } from "./WeatherContext";
import { weatherReducer } from "./weatherReducer";

interface NavigationProviderProps {
  initialValues?: WeatherState;
  children: ReactNode;
}

const initialValues: WeatherState = {
  favoriteCities: [],
  locationForecasts: {},
  locations: {},
};

const WeatherProvider = ({
  initialValues: initialValuesProp,
  children,
}: NavigationProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(weatherReducer, {
    ...initialValues,
    ...initialValuesProp,
  });

  const value = {
    state,
    dispatch,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export { WeatherProvider, initialValues };

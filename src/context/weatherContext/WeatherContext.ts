import { createContext } from "react";
import { Action } from "./weatherReducer";
import { Weather, WeatherForecast } from "@/types";

type Dispatch = (action: Action) => void;

interface WeatherState {
  locations: Record<string, Weather>;
  locationForecasts: Record<string, WeatherForecast[]>;
  favoriteCities: string[];
}

const WeatherContext = createContext<
  { state: WeatherState; dispatch: Dispatch } | undefined
>(undefined);

export type { WeatherState };
export { WeatherContext };

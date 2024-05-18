import { createContext } from "react";
import { Action } from "./weatherReducer";

type Dispatch = (action: Action) => void;

type WeatherInformation = {
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  humidity: number;
  windSpeed: {
    metersPerSecond: number;
    kilometersPerHour: number;
  };
  windDirection: number;
  cloudPercentage: number;
};

type WeatherForecast = Pick<
  WeatherInformation,
  "temperature" | "windSpeed" | "cloudPercentage" | "humidity"
> & {
  date: Date;
};

interface WeatherState {
  locations: Record<string, WeatherInformation>;
  locationForecasts: Record<string, WeatherForecast[]>;
  favoriteCities: string[];
}

const WeatherContext = createContext<
  { state: WeatherState; dispatch: Dispatch } | undefined
>(undefined);

export type { WeatherState, WeatherInformation, WeatherForecast };
export { WeatherContext };

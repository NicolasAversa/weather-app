interface Weather {
  city: string;
  region: string;
  localTime: string;
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
  uv: number;
}

type WeatherForecast = Pick<
  Weather,
  "city" | "region" | "localTime" | "humidity" | "uv"
> & {
  maximumTemperature: Weather["temperature"];
  minimumTemperature: Weather["temperature"];
  maximumWindSpeed: Weather["windSpeed"];
  date: Date;
};

enum WeatherTypes {
  SUNNY = "sunny",
  CLOUDY = "cloudy",
  CLOUDS = "clouds",
  RAIN = "rain",
}

export type { Weather, WeatherForecast };
export { WeatherTypes };

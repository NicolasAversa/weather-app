interface Weather {
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
}

type WeatherForecast = Pick<
  Weather,
  "temperature" | "windSpeed" | "cloudPercentage" | "humidity"
> & {
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

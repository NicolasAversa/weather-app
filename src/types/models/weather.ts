interface Weather {
  location: {
    name: string;
    region: string;
    id: string;
    label: string;
    localTime: string;
  };
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

type WeatherForecast = Pick<Weather, "location" | "humidity" | "uv"> & {
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

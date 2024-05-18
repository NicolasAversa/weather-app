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

enum WeatherTypes {
  SUNNY = "sunny",
  CLOUDY = "cloudy",
  CLOUDS = "clouds",
  RAIN = "rain",
}

export type { Weather };
export { WeatherTypes };

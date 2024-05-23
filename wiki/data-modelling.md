- [Data Modelling](#data-modelling)
  - [Remappers](#remappers)

# Data Modelling

I have analyzed the requirements and gathered all the necessary data to build a comprehensive data model for the application. To ensure future scalability and extendability of the functionality, I have incorporated additional data points into the structure.

Below is the primary data structure I designed for weather information:

```tsx
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
```

This structure has essential weather attributes, including temperature (in both Celsius and Fahrenheit), humidity, wind speed (in meters per second and kilometres per hour), wind direction, and cloud coverage percentage. By organizing the data in this manner, we can efficiently manage and expand our weather-related functionalities and **avoid the errors produced by a specific API response change in our weather provider**.

## Remappers

To unify data handling and maintain a consistent data structure across the project, I implemented a strategy to create remappers. These remappers reshape the received data into a unified format.

They are organized by type and stored within the utils folder. Currently, we have remappers specifically for weather data, but new ones could be added easily as needed.

Below is an example of a weather data remapper:

```tsx
const remapWeatherInformation = (
  weather: CurrentWeatherApiResponse
): Weather => {
  return {
    cloudPercentage: weather.current.cloud,
    humidity: weather.current.humidity,
    temperature: {
      celsius: weather.current.temp_c,
      fahrenheit: weather.current.feelslike_f,
    },
    windSpeed: {
      kilometersPerHour: weather.current.wind_kph,
      metersPerSecond: weather.current.wind_mph,
    },
    windDirection: weather.current.wind_degree,
  };
};
```

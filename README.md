# Weather app project

Weather application engineered in order to show different architecture strategies.

## Project objective

- Develop a weather forecast application using Next.js.
- Display weather information for cities around the world.
- Build the user interface with Material-UI.
- Implement global state management with React Context.
- Obtain weather information by consuming an API from [Rapid API](https://rapidapi.com/category/Weather).

## Functional Requirements

### Home Page

- Display a search field where users can type the name of a city.
- Upon searching, show results with the current weather information for the selected city. Include data such as:
  - Temperature.
  - Weather description (cloudy, sunny, rainy, etc.).
  - Humidity.
  - Wind speed.
  - An icon representing the weather.
- Allow users to save cities as favourites, which should persist across browser sessions.

### Favourite cities page

- List all cities marked as favourites with basic weather information.
- Provide quick access to the detailed weather page for each favourite city.

### Weather details page

- Show detailed weather information for the selected city, including:
  - The data displayed on the home page.
  - An extended forecast for the next 5 days.

## Technical Requirements

- **Next.js**: Use Next.js for routing and page generation.
- **Material-UI**: Use Material-UI to design the components of the interface, ensuring the application is responsive and visually appealing.
- **State Management and React Context**: Implement React Context to handle the global state of the application, such as the list of favourite cities and weather data.
  - Use local state management for specific components when necessary.
- **API Consumption**:
  - Select and consume a weather forecast API from Rapid API.
  - Document the process of subscribing to the API and how to obtain the API key in the project's README.

## Project specs

### Data Modelling

I have analysed the requirements and gathered all the necessary data to build a comprehensive data model for the application. To ensure future scalability and extendability of the functionality, I have incorporated additional data points into the structure.

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

### Remappers

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

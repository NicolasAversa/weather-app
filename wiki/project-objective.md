# Project objective

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

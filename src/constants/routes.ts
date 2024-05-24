const ROUTES = {
  HOME: "/",
  FAVORITE_CITIES: "/favorite-cities",
  CITY_DETAILS: "/city",
};

const API_BASE_ROUTE = "/api";

const API_ROUTES = {
  autocomplete: `${API_BASE_ROUTE}/autocomplete`,
  clientCity: `${API_BASE_ROUTE}/client-city`,
  forecast: `${API_BASE_ROUTE}/forecast`,
  weather: `${API_BASE_ROUTE}/weather`,
};

export { ROUTES, API_ROUTES };

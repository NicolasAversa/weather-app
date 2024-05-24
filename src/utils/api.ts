import { API_ROUTES, dateFormats, thirdPartyBaseUrls } from "@/constants";
import { FORECAST_DAYS_AMOUNT } from "@/constants/product";
import { Ip64Response, CityDetails, Weather, WeatherForecast } from "@/types";
import { format, addDays } from "date-fns";

interface HttpsClientOptions extends RequestInit {
  onFetchError?: () => void;
}

const httpGet = async <TResponse>(
  url: string,
  { onFetchError, ...restOptions }: HttpsClientOptions
): Promise<TResponse | undefined> => {
  try {
    const response = await fetch(encodeURI(url), restOptions);

    if (!response.ok) {
      onFetchError && onFetchError();
    }

    const parsedResponse: TResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    console.error(error);
  }
};

const fetchWeatherByCityName = async (
  name: string
): Promise<Weather | undefined> => {
  try {
    const response = await httpGet<Weather>(
      `${API_ROUTES.weather}?city=${name}`,
      {
        onFetchError: () =>
          console.error(`Error fetching current weather for: ${name}`),
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchIpFromClient = async (): Promise<string | undefined> => {
  try {
    const response = await httpGet<Ip64Response>(
      `${thirdPartyBaseUrls.api64}?format=json`,
      {
        onFetchError: () => console.error("Error getting client's IP address"),
      }
    );

    if (!response) return;

    return response.ip;
  } catch (error) {
    console.error(error);
  }
};

const fetchCityFromIp = async (ip: string): Promise<string | undefined> => {
  try {
    const response = await httpGet<string>(
      `${API_ROUTES.clientCity}?ip=${ip}`,
      {
        onFetchError: () =>
          console.error("Error getting city from client's IP address"),
      }
    );

    if (!response) return;

    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchWeatherForecastByCityName = async (
  name: string
): Promise<WeatherForecast[] | undefined> => {
  try {
    const forecastDate = format(
      addDays(new Date(), 1),
      dateFormats.yearMonthDay
    );

    const response = await httpGet<WeatherForecast[]>(
      `${API_ROUTES.forecast}?city=${name}&startDay=${forecastDate}&days=${FORECAST_DAYS_AMOUNT}`,
      {
        onFetchError: () =>
          console.error(`Error fetching current city weather for ${name}`),
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchCityOptionsFromTerm = async (
  searchTerm: string
): Promise<CityDetails[] | undefined> => {
  try {
    const response = await httpGet<CityDetails[]>(
      `${API_ROUTES.autocomplete}?search=${searchTerm}`,
      {
        onFetchError: () =>
          console.error("Error getting city from search term"),
      }
    );

    if (!response) return;

    return response;
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchWeatherByCityName,
  fetchIpFromClient,
  fetchCityFromIp,
  fetchWeatherForecastByCityName,
  fetchCityOptionsFromTerm,
  httpGet,
};

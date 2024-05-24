import { thirdPartyBaseUrls } from "@/constants";
import {
  Api64Response,
  IpLookupResponse,
  CityDetails,
  Weather,
  WeatherForecast,
} from "@/types";
import { format } from "date-fns";

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
    console.log(error);
  }
};

const fetchWeatherByCityName = async (
  name: string
): Promise<Weather | undefined> => {
  try {
    const response = await httpGet<Weather>(`/api/weather?city=${name}`, {
      onFetchError: () =>
        console.error(`Error fetching current weather for: ${name}`),
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchIpFromClient = async (): Promise<string | undefined> => {
  try {
    const response = await httpGet<Api64Response>(
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
    const response = await httpGet<IpLookupResponse>(
      `/api/client-city?ip=${ip}`,
      {
        onFetchError: () =>
          console.error("Error getting city from client's IP address"),
      }
    );

    if (!response) return;

    return response.city;
  } catch (error) {
    console.error(error);
  }
};

const fetchWeatherForecastByCityName = async (
  name: string
): Promise<WeatherForecast[] | undefined> => {
  try {
    const response = await httpGet<WeatherForecast[]>(
      `/api/forecast?city=${name}&startDay=${format(
        new Date(),
        "yyyy-MM-dd"
      )}&days=${5}`,
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
      `/api/autocomplete?search=${searchTerm}`,
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

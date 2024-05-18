import { thirdPartyBaseUrls } from "@/constants";
import {
  Api64Response,
  CurrentWeatherApiResponse,
  ForecastApiResponse,
  IpLookupResponse,
} from "@/types";

const fetchWeatherByCityName = async (
  name: string
): Promise<CurrentWeatherApiResponse | undefined> => {
  try {
    const response = await fetch(encodeURI(`/api/weather?city=${name}`));

    if (!response.ok) {
      throw new Error(`Error fetching current city weather for ${name}`);
    }

    const weather: CurrentWeatherApiResponse = await response.json();
    return weather;
  } catch (error) {
    console.error(error);
  }
};

const fetchIpFromClient = async (): Promise<string | undefined> => {
  try {
    const response = await fetch(`${thirdPartyBaseUrls.api64}?format=json`);
    if (!response.ok) {
      throw new Error("Error getting client's IP address");
    }
    const parsedResponse: Api64Response = await response.json();
    return parsedResponse.ip;
  } catch (error) {
    console.error(error);
  }
};

const fetchCityFromIp = async (ip: string): Promise<string | undefined> => {
  try {
    const response = await fetch(`/api/client-city?ip=${ip}`);
    if (!response.ok) {
      throw new Error("Error getting city from client's IP address");
    }
    const parsedResponse: IpLookupResponse = await response.json();
    return parsedResponse.city;
  } catch (error) {
    console.error(error);
  }
};

const fetchWeatherForecastByCityName = async (
  name: string
): Promise<ForecastApiResponse | undefined> => {
  try {
    const response = await fetch(encodeURI(`/api/forecast?city=${name}`));

    if (!response.ok) {
      throw new Error(`Error fetching current city weather for ${name}`);
    }

    const weather: ForecastApiResponse = await response.json();
    return weather;
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchWeatherByCityName,
  fetchIpFromClient,
  fetchCityFromIp,
  fetchWeatherForecastByCityName,
};

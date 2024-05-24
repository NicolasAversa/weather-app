import { thirdPartyBaseUrls } from "@/constants";
import { RealTimeWeatherApiResponse, Weather } from "@/types";
import { httpGet } from "@/utils/api";
import { remapRealTimeWeatherResponse } from "@/utils/remappers";
import { NextApiRequest, NextApiResponse } from "next";

const baseUrl = `${thirdPartyBaseUrls.weatherApi}/current.json`;
const options: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.WEATHER_API_KEY as string,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method !== "GET") {
    res.status(500).json({ error: `Method ${method} not supported` });
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.append("q", query.city as string);

    const response = await httpGet<RealTimeWeatherApiResponse>(
      url.toString(),
      options
    );

    if (!response) {
      throw new Error("The response for the weather endpoint is undefined");
    }

    const remappedResponse: Weather = remapRealTimeWeatherResponse(response);
    res.status(200).json(remappedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

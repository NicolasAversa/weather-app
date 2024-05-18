import { thirdPartyBaseUrls } from "@/constants";
import { NextApiRequest, NextApiResponse } from "next";

const baseUrl = `${thirdPartyBaseUrls.weatherApi}/forecast.json`;
const options: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.WEATHER_API_KEY as string,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export default async function getForecast(
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
    url.searchParams.append("days", "5");

    const response = await fetch(url.toString(), options);
    const parsedResponse = await response.json();

    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

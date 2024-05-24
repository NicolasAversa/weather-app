import { thirdPartyBaseUrls } from "@/constants";
import { AutocompleteApiResponse } from "@/types";
import { remapCityDetails } from "@/utils/remappers";
import { NextApiRequest, NextApiResponse } from "next";

const baseUrl = `${thirdPartyBaseUrls.weatherApi}/search.json`;
const options: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.WEATHER_API_KEY as string,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export default async function autocomplete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method !== "GET") {
    res.status(500).json({ error: `Method ${method} not supported` });
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.append("q", query.search as string);

    const response = await fetch(url.toString(), options);
    const parsedResponse: AutocompleteApiResponse = await response.json();
    const remappedResponse = parsedResponse.map(remapCityDetails);

    res.status(200).json(remappedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

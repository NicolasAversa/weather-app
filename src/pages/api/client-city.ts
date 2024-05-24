import { thirdPartyBaseUrls } from "@/constants";
import { IpLookupResponse } from "@/types";
import { buildLocationLabel } from "@/utils/textFormatters";
import { NextApiRequest, NextApiResponse } from "next";

const baseUrl = `${thirdPartyBaseUrls.weatherApi}/ip.json`;
const options: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.WEATHER_API_KEY as string,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export default async function getClientCity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method !== "GET") {
    res.status(500).json({ error: `Method ${method} not supported` });
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.append("q", query.ip as string);

    const response = await fetch(url.toString(), options);
    const parsedResponse: IpLookupResponse = await response.json();

    const { city, region, country_name } = parsedResponse;
    const location = buildLocationLabel(city, region, country_name);
    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

import { dateFormats, thirdPartyBaseUrls } from "@/constants";
import { ForecastApiResponse, WeatherForecast } from "@/types";
import { httpGet } from "@/utils/api";
import { remapForecast } from "@/utils/remappers";
import { parse, addDays, eachDayOfInterval, format } from "date-fns";
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
    const { city, startDay, days } = query;
    if (!(city || startDay || days)) {
      throw new Error("Parameter is missing");
    }
    if (!startDay) throw new Error("startDay parameter is missing");

    const initialDate = parse(
      startDay as string,
      dateFormats.yearMonthDay,
      new Date()
    );

    if (!days) throw new Error("days parameter is missing");

    const interval = eachDayOfInterval({
      start: initialDate,
      end: addDays(initialDate, parseInt(days as string, 10)),
    });

    const promises = interval.map(
      async (date): Promise<WeatherForecast[] | undefined> => {
        const formatDate = format(date, dateFormats.yearMonthDay);

        const url = new URL(baseUrl);
        url.searchParams.append("q", city as string);
        url.searchParams.append("dt", formatDate);

        const response = await httpGet<ForecastApiResponse>(
          url.toString(),
          options
        );

        if (!response) return;
        const remappedResponse = remapForecast(response);
        return remappedResponse;
      }
    );

    const response = await Promise.all(promises);
    res.status(200).json(response.flat());
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

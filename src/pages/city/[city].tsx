import { useEffect } from "react";
import { RealtimeWeatherReport, ForecastItem } from "@/components/compositions";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import {
  fetchWeatherByCityName,
  fetchWeatherForecastByCityName,
} from "@/utils/api";
import { Stack } from "@/components/base";
import { useRouter } from "next/router";

export default function Location() {
  const {
    query: { city },
  } = useRouter();
  const {
    state: { locationForecasts, locations },
    dispatchers: { setLocationForecast, setLocationWeather },
    helpers: { isCityWeatherCached, isCityForecastCached },
  } = useWeatherContext();
  const weatherForecast = city ? locationForecasts[city as string] : null;
  const realTimeWeather = city ? locations[city as string] : null;

  useEffect(() => {
    (async function () {
      if (city && !isCityForecastCached(city as string)) {
        const forecastReport = await fetchWeatherForecastByCityName(
          city as string
        );
        if (!forecastReport) return;
        setLocationForecast(city as string, forecastReport);
      }
      if (city && !isCityWeatherCached(city as string)) {
        const realTimeReport = await fetchWeatherByCityName(city as string);
        if (!realTimeReport) return;
        setLocationWeather(city as string, realTimeReport);
      }
    })();
  }, [city]);

  return (
    <>
      {realTimeWeather ? (
        <RealtimeWeatherReport weather={realTimeWeather} />
      ) : null}
      {weatherForecast ? (
        <Stack direction="column">
          {weatherForecast?.map((weather) => (
            <ForecastItem
              date={weather.date}
              cloudPercentage={weather.humidity}
              maximumTemperature={weather.maximumTemperature.celsius}
              minimumTemperature={weather.minimumTemperature.celsius}
            />
          ))}
        </Stack>
      ) : null}
    </>
  );
}

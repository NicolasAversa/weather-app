import { useEffect } from "react";
import { CurrentWeather, ForecastItem } from "@/components/compositions";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import { fetchWeatherForecastByCityName } from "@/utils/api";
import { remapForecast } from "@/utils/remappers";
import { Stack } from "@/components/base";
import { useRouter } from "next/router";

export default function Location() {
  const {
    query: { city },
  } = useRouter();
  const {
    state: { locationForecasts },
    dispatchers: { setLocationForecast },
    helpers: { isCityForecastCached },
  } = useWeatherContext();
  const weatherInformation = city ? locationForecasts[city as string] : null;

  useEffect(() => {
    (async function () {
      if (city && !isCityForecastCached(city as string)) {
        const forecast = await fetchWeatherForecastByCityName(city as string);
        if (!forecast) return;

        setLocationForecast(city as string, forecast);
      }
    })();
  }, [city]);

  if (!weatherInformation) return null;
  return (
    <>
      {city ? <CurrentWeather city={city as string} /> : null}
      <Stack direction="column">
        {weatherInformation.map((weather) => (
          <ForecastItem
            date={weather.date}
            cloudPercentage={weather.humidity}
            maximumTemperature={weather.maximumTemperature.celsius}
            minimumTemperature={weather.minimumTemperature.celsius}
          />
        ))}
      </Stack>
    </>
  );
}

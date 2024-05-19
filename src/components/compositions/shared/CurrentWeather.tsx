import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import { getWeatherTypeFromWeather } from "@/utils/weather";
import { Heading } from "@/components/base";
import {
  DegreesIndicator,
  FavoriteButton,
  WeatherIcon,
} from "@/components/compositions";
import { fetchWeatherByCityName } from "@/utils/api";

interface CurrentWeatherProps {
  city: string;
}

function CurrentWeather({ city }: CurrentWeatherProps) {
  const {
    dispatchers: { setLocationWeather },
    helpers: { getCurrentCityWeather, isCityWeatherCached },
  } = useWeatherContext();

  useEffect(() => {
    (async function () {
      if (city && !isCityWeatherCached(city)) {
        const weatherResponse = await fetchWeatherByCityName(city);
        if (!weatherResponse) return;
        setLocationWeather(city, weatherResponse);
      }
    })();
  }, [city]);

  const weatherInformation = getCurrentCityWeather(city);
  if (!weatherInformation) return null;

  const weatherIconType = getWeatherTypeFromWeather(weatherInformation);

  return (
    <Stack alignItems="center" spacing={4}>
      <WeatherIcon type={weatherIconType} size="large" />
      <Stack spacing={1} alignItems="center">
        <Stack direction="row">
          <Heading as="h4" fontWeight="semiBold">
            {city}
          </Heading>
          <FavoriteButton city={city} />
        </Stack>
        <DegreesIndicator
          temperature={weatherInformation?.temperature.celsius}
          scale="celsius"
          size="large"
        />
      </Stack>
    </Stack>
  );
}

export { CurrentWeather };

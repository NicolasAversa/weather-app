import { Stack } from "@mui/material";
import React from "react";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import { getWeatherTypeFromWeather } from "@/utils/weather";
import { Heading } from "@/components/base";
import { FavoriteButton, WeatherIcon } from "@/components/compositions";

interface CurrentWeatherProps {
  city: string;
}

function CurrentWeather({ city }: CurrentWeatherProps) {
  const {
    helpers: { getCurrentCityWeather },
  } = useWeatherContext();

  const weatherInformation = getCurrentCityWeather(city);
  if (!weatherInformation) return null;

  const weatherIconType = getWeatherTypeFromWeather(weatherInformation);

  return (
    <Stack alignItems="center" spacing={4}>
      <WeatherIcon type={weatherIconType} size="large" />
      <Stack spacing={1}>
        <Stack direction="row">
          <Heading as="h4" fontWeight="semiBold">
            {city}
          </Heading>
          <FavoriteButton city={city} />
        </Stack>
        <Heading as="h1" fontWeight="medium" textAlign="center">
          {weatherInformation?.temperature.celsius}
        </Heading>
      </Stack>
    </Stack>
  );
}

export { CurrentWeather };

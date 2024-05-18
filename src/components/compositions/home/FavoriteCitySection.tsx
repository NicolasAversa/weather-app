import { useEffect, useState } from "react";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { WeatherInformation } from "@/context/weatherContext/WeatherContext";
import { fetchWeatherByCityName } from "@/utils/api";
import { remapWeatherInformation } from "@/utils/remappers";
import { getWeatherTypeFromWeather } from "@/utils/weather";
import { Box, Heading, Stack, Text } from "@/components/base";
import { WeatherIcon } from "@/components/compositions";

interface FavoriteCityItemProps {
  city: string;
  weather?: WeatherInformation;
}

function FavoriteCityItem({ city, weather }: FavoriteCityItemProps) {
  return (
    <Link
      key={city}
      href={encodeURI(`/${ROUTES.CITY_DETAILS}/${city}`)}
      passHref
    >
      <Box padding={2.5} backgroundColor="#FDFCFC" borderRadius={2}>
        <Heading as="h5">{city}</Heading>
        {weather ? (
          <Stack direction="row" justifyContent="space-between">
            <Heading as="h2" fontWeight="semiBold">
              {weather.temperature.celsius}
            </Heading>
            <WeatherIcon type={getWeatherTypeFromWeather(weather)} />
          </Stack>
        ) : null}
      </Box>
    </Link>
  );
}

function FavoriteCitySection() {
  const {
    state: { favoriteCities },
    helpers: { getCurrentCityWeather },
    dispatchers: { setLocationWeather },
  } = useWeatherContext();
  const [isClient, setIsClient] = useState(false);
  const isFavoriteLocationsEmpty = favoriteCities.length === 0;

  useEffect(() => {
    setIsClient(true);
    if (isFavoriteLocationsEmpty) return;

    const locationPromises = favoriteCities.map(fetchWeatherByCityName);
    (async function () {
      const results = await Promise.all(locationPromises);
      results.forEach((weather, index) => {
        if (!weather) return;
        setLocationWeather(
          favoriteCities[index],
          remapWeatherInformation(weather)
        );
      });
    })();
  }, []);

  if (!isClient) return null;

  if (isFavoriteLocationsEmpty) {
    return (
      <Text padding={2}>You don't currently have any favorite city yet!</Text>
    );
  }

  return (
    <Stack spacing={1}>
      {favoriteCities.map((city) => (
        <FavoriteCityItem city={city} weather={getCurrentCityWeather(city)} />
      ))}
    </Stack>
  );
}

export { FavoriteCitySection };

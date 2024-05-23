import { useEffect, useState } from "react";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { fetchWeatherByCityName } from "@/utils/api";
import { getWeatherTypeFromWeather } from "@/utils/weather";
import { Heading, Stack, Text } from "@/components/base";
import { WeatherIcon, DegreesIndicator } from "@/components/compositions";
import { Weather } from "@/types";

interface FavoriteCityItemProps {
  city: string;
  weather?: Weather;
}

function FavoriteCityItem({ city, weather }: FavoriteCityItemProps) {
  return (
    <Link
      key={city}
      href={encodeURI(`${ROUTES.CITY_DETAILS}/${city}`)}
      passHref
      style={{ textDecoration: "none" }}
    >
      <Stack
        padding={2.5}
        backgroundColor="#FDFCFC"
        borderRadius={2}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        {weather ? (
          <>
            <Stack alignItems="start">
              <Heading as="h5">{city}</Heading>
              <DegreesIndicator
                temperature={weather.temperature.celsius}
                scale="celsius"
              />
            </Stack>
            <WeatherIcon type={getWeatherTypeFromWeather(weather)} />
          </>
        ) : null}
      </Stack>
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
        setLocationWeather(favoriteCities[index], weather);
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
        <FavoriteCityItem
          key={city}
          city={city}
          weather={getCurrentCityWeather(city)}
        />
      ))}
    </Stack>
  );
}

export { FavoriteCitySection };

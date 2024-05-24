import { useEffect, useState } from "react";
import { useWeatherContext } from "@/context";
import { ROUTES } from "@/constants";
import { fetchWeatherByCityName } from "@/utils/api";
import { getWeatherTypeFromWeather } from "@/utils/weather";
import { Heading, Skeleton, Stack, Text } from "@/components/base";
import { WeatherIcon, DegreesIndicator } from "@/components/compositions";
import { Weather } from "@/types";
import Link from "next/link";

interface FavoriteCityItemProps {
  weatherReport?: Weather;
}

function FavoriteCityItem({ weatherReport }: FavoriteCityItemProps) {
  if (!weatherReport) return <Skeleton height={144} />;
  return (
    <Link
      href={encodeURI(`${ROUTES.CITY_DETAILS}/${weatherReport?.location.id}`)}
      passHref
      style={{ textDecoration: "none" }}
    >
      <Stack
        padding={2.5}
        backgroundColor="#F7F7F7"
        borderRadius={2}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        {weatherReport ? (
          <>
            <Stack alignItems="start">
              <Heading as="h5">{weatherReport.location.name}</Heading>
              <DegreesIndicator
                temperature={weatherReport.temperature.celsius}
                scale="celsius"
              />
            </Stack>
            <WeatherIcon type={getWeatherTypeFromWeather(weatherReport)} />
          </>
        ) : null}
      </Stack>
    </Link>
  );
}

function FavoriteCitySection() {
  const {
    state: { favoriteCities },
    helpers: { getCityRealTimeWeather },
    dispatchers: { setLocationWeather },
  } = useWeatherContext();
  const [isClient, setIsClient] = useState(false);

  const isFavoriteLocationsEmpty = favoriteCities.length === 0;

  useEffect(() => {
    setIsClient(true);
    if (isFavoriteLocationsEmpty) return;

    const weatherReportPromises = favoriteCities.map(fetchWeatherByCityName);

    (async function () {
      const weatherReports = await Promise.all(weatherReportPromises);

      weatherReports.forEach((report, index) => {
        if (!report) return;
        setLocationWeather(favoriteCities[index], report);
      });
    })();
  }, []);

  if (!isClient) return null;

  if (isFavoriteLocationsEmpty) {
    return <Text>You don't currently have any favorite city, yet!</Text>;
  }

  return (
    <Stack spacing={1}>
      {favoriteCities.map((city) => (
        <FavoriteCityItem
          key={city}
          weatherReport={getCityRealTimeWeather(city)}
        />
      ))}
    </Stack>
  );
}

export { FavoriteCitySection };

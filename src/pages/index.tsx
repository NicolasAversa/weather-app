import { useState, useEffect } from "react";
import { Heading, Stack, TextInput } from "@/components/base";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import {
  fetchCityFromIp,
  fetchIpFromClient,
  fetchWeatherByCityName,
} from "@/utils/api";
import {
  FavoriteCitySection,
  CurrentWeatherDisplay,
  RealtimeWeatherReport,
} from "@/components/compositions";
import { useAutoDetectClientCity } from "@/hooks";

export default function Home() {
  const [city, setCity] = useState<string>();
  const {
    state: { locations },
    dispatchers: { setLocationWeather },
    helpers: { isCityWeatherCached },
  } = useWeatherContext();
  const { city: clientCity } = useAutoDetectClientCity();
  const cityWeatherReport = city ? locations[city] : null;

  useEffect(() => {
    setCity(clientCity);
  }, [clientCity]);

  useEffect(() => {
    (async function () {
      if (city && !isCityWeatherCached(city)) {
        const weatherResponse = await fetchWeatherByCityName(city);
        if (weatherResponse) {
          setLocationWeather(city, weatherResponse);
        }
      }
    })();
  }, [city]);

  return (
    <Stack direction="column" spacing={3}>
      <TextInput
        onChange={(event) => setCity(event.target.value)}
        value={city}
      />
      {cityWeatherReport ? (
        <RealtimeWeatherReport weather={cityWeatherReport} />
      ) : null}
      {city ? <CurrentWeatherDisplay city={city} /> : null}
      <Stack spacing={1}>
        <Heading as="h5">Favorite cities</Heading>
        <FavoriteCitySection />
      </Stack>
    </Stack>
  );
}

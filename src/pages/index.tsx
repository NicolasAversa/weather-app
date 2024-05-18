import { useState, useEffect } from "react";
import { Heading, Stack } from "@/components/base";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";

import {
  fetchCityFromIp,
  fetchIpFromClient,
  fetchWeatherByCityName,
} from "@/utils/api";
import { remapWeatherInformation } from "@/utils/remappers";
import {
  FavoriteCitySection,
  CurrentWeatherDisplay,
  CurrentWeather,
} from "@/components/compositions";

export default function Home() {
  const [city, setCity] = useState<string>();
  const {
    dispatchers: { setLocationWeather },
    helpers: { isCityWeatherCached },
  } = useWeatherContext();

  useEffect(() => {
    (async function () {
      const clientIp = await fetchIpFromClient();
      if (!clientIp) return;
      const clientCity = await fetchCityFromIp(clientIp);
      setCity(clientCity);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (city && !isCityWeatherCached(city)) {
        const weatherResponse = await fetchWeatherByCityName(city);
        if (weatherResponse) {
          setLocationWeather(city, remapWeatherInformation(weatherResponse));
        }
      }
    })();
  }, [city]);

  return (
    <Stack direction="column" spacing={3}>
      {/* <TextInput onChange={setCity} value={city} /> */}
      {city ? <CurrentWeather city={city} /> : null}
      {city ? <CurrentWeatherDisplay city={city} /> : null}
      <Stack spacing={1}>
        <Heading as="h5">Favorite cities</Heading>
        <FavoriteCitySection />
      </Stack>
    </Stack>
  );
}

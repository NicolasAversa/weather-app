import { useState, useEffect, ChangeEvent } from "react";
import { Button, LinkButton, Stack, TextInput } from "@/components/base";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import { fetchWeatherByCityName } from "@/utils/api";
import {
  RealtimeWeatherReport,
  DetailedWeatherInformation,
} from "@/components/compositions";
import { useAutoDetectClientCity } from "@/hooks";
import { format } from "date-fns";
import { ROUTES, dateFormats } from "@/constants";

export default function Home() {
  const [inputCity, setInputCity] = useState<string>();
  const [city, setCity] = useState<string>();
  const {
    state: { locations },
    dispatchers: { setLocationWeather },
    helpers: { isCityWeatherCached },
  } = useWeatherContext();
  const { city: clientCity } = useAutoDetectClientCity();

  const cityWeatherReport = city ? locations[city] : null;

  useEffect(() => {
    if (!clientCity) return;
    setCity(clientCity);
    setInputCity(clientCity);
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

  const handleCityInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCity(event.target.value);
  };

  const handleCitySearchClick = () => {
    setCity(inputCity);
  };

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" spacing={1}>
        <TextInput
          onChange={handleCityInputChange}
          value={inputCity}
          leftIcon="search"
          fullWidth
        />
        <Button variant="text" size="small" onClick={handleCitySearchClick}>
          Search
        </Button>
      </Stack>
      {cityWeatherReport ? (
        <RealtimeWeatherReport weather={cityWeatherReport} />
      ) : null}
      {cityWeatherReport ? (
        <DetailedWeatherInformation
          items={[
            {
              label: "Local time",
              value: format(
                cityWeatherReport.localTime,
                dateFormats.hourMinutes
              ),
            },
            {
              label: "Wind speed",
              value: `${cityWeatherReport.windSpeed.kilometersPerHour} Km/h`,
            },
            {
              label: "Humidity",
              value: `${cityWeatherReport.humidity}%`,
            },
            {
              label: "Clouds",
              value: `${cityWeatherReport.cloudPercentage}%`,
            },
          ]}
        />
      ) : null}
      <LinkButton
        href={`${ROUTES.CITY_DETAILS}/${city}`}
        variant="outlined"
        fullWidth
      >
        View detailed weather
      </LinkButton>
    </Stack>
  );
}

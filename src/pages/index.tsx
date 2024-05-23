import { useState, useEffect, ChangeEvent } from "react";
import { Button, LinkButton, Stack, TextInput } from "@/components/base";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import { fetchWeatherByCityName } from "@/utils/api";
import {
  RealtimeWeatherReport,
  DetailedWeatherInformation,
  HomeSkeleton,
} from "@/components/compositions";
import { useAutoDetectClientCity } from "@/hooks";
import { format } from "date-fns";
import { ROUTES, dateFormats } from "@/constants";

export default function Home() {
  const [inputCity, setInputCity] = useState<string>();
  const [city, setCity] = useState<string>();
  const [isFetchingCityWeather, setIsFetchingCityWeather] =
    useState<boolean>(false);
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
      try {
        if (city && !isCityWeatherCached(city)) {
          setIsFetchingCityWeather(true);
          const weatherResponse = await fetchWeatherByCityName(city);
          setIsFetchingCityWeather(false);

          if (weatherResponse) setLocationWeather(city, weatherResponse);
        }
      } catch (error) {
        setIsFetchingCityWeather(false);
        console.error(error);
      }
    })();
  }, [city]);

  const handleCityInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCity(event.target.value);
  };

  const handleCitySearchClick = () => {
    setCity(inputCity);
  };

  const isWeatherReportAvailable = !isFetchingCityWeather && cityWeatherReport;

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
      {!isWeatherReportAvailable ? <HomeSkeleton /> : null}
      {isWeatherReportAvailable ? (
        <>
          <RealtimeWeatherReport weather={cityWeatherReport} />
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
          <LinkButton
            href={`${ROUTES.CITY_DETAILS}/${city}`}
            variant="outlined"
            fullWidth
          >
            View detailed weather
          </LinkButton>
        </>
      ) : null}
    </Stack>
  );
}

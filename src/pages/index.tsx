import { useState, useEffect } from "react";
import { LinkButton, Stack } from "@/components/base";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import { fetchWeatherByCityName } from "@/utils/api";
import {
  RealtimeWeatherReport,
  DetailedWeatherInformation,
  HomeSkeleton,
  SelectCityForm,
} from "@/components/compositions";
import { useAutoDetectClientCity } from "@/hooks";
import { format } from "date-fns";
import { ROUTES, dateFormats } from "@/constants";
import { locationToLocationId } from "@/utils/textFormatters";

export default function Home() {
  const [city, setCity] = useState<string>();
  const [isFetchingCityWeather, setIsFetchingCityWeather] =
    useState<boolean>(false);
  const {
    state: { locations },
    dispatchers: { setLocationWeather },
    helpers: { isCityWeatherCached },
  } = useWeatherContext();
  const { city: clientCity } = useAutoDetectClientCity();
  const cityWeatherReport = city ? locations[locationToLocationId(city)] : null;

  useEffect(() => {
    if (!clientCity) return;
    setCity(clientCity);
  }, [clientCity]);

  useEffect(() => {
    (async function () {
      try {
        if (!city) return;
        const cityId = locationToLocationId(city);
        if (!isCityWeatherCached(cityId)) {
          setIsFetchingCityWeather(true);
          const weatherResponse = await fetchWeatherByCityName(city);
          setIsFetchingCityWeather(false);

          if (weatherResponse) setLocationWeather(cityId, weatherResponse);
        }
      } catch (error) {
        setIsFetchingCityWeather(false);
        console.error(error);
      }
    })();
  }, [city]);

  const isWeatherReportAvailable = !isFetchingCityWeather && cityWeatherReport;

  return (
    <Stack direction="column" spacing={3}>
      <SelectCityForm onCitySelected={setCity} />
      {!isWeatherReportAvailable ? <HomeSkeleton /> : null}
      {isWeatherReportAvailable ? (
        <>
          <RealtimeWeatherReport weather={cityWeatherReport} />
          <DetailedWeatherInformation
            items={[
              {
                label: "Local time",
                value: format(
                  cityWeatherReport.location.localTime,
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
            href={`${ROUTES.CITY_DETAILS}/${cityWeatherReport.location.id}`}
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

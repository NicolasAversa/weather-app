import { useState, useEffect } from "react";
import { LinkButton, Stack } from "@/components/base";
import { useWeatherContext } from "@/context";
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
  const [selectedCity, setSelectedCity] = useState<string>();
  const [isFetchingWeather, setIsFetchingWeather] = useState<boolean>(false);
  const {
    state: { locations },
    dispatchers: { setLocationWeather },
    helpers: { isCityWeatherCached },
  } = useWeatherContext();
  const { city: autoDetectedClientCity } = useAutoDetectClientCity();

  const selectedCityWeatherReport = selectedCity
    ? locations[locationToLocationId(selectedCity)]
    : null;

  useEffect(() => {
    if (!autoDetectedClientCity) return;
    setSelectedCity(autoDetectedClientCity);
  }, [autoDetectedClientCity]);

  useEffect(() => {
    (async function () {
      try {
        if (!selectedCity) return;
        const cityId = locationToLocationId(selectedCity);

        if (!isCityWeatherCached(cityId)) {
          setIsFetchingWeather(true);

          const weatherResponse = await fetchWeatherByCityName(selectedCity);
          setIsFetchingWeather(false);

          if (weatherResponse) setLocationWeather(cityId, weatherResponse);
        }
      } catch (error) {
        setIsFetchingWeather(false);
        console.error(error);
      }
    })();
  }, [selectedCity]);

  const isWeatherReportAvailable =
    !isFetchingWeather && selectedCityWeatherReport;

  return (
    <Stack direction="column" spacing={3}>
      <SelectCityForm onCitySelected={setSelectedCity} />
      {!isWeatherReportAvailable ? <HomeSkeleton /> : null}
      {isWeatherReportAvailable ? (
        <>
          <RealtimeWeatherReport weather={selectedCityWeatherReport} />
          <DetailedWeatherInformation
            items={[
              {
                label: "Local time",
                value: format(
                  selectedCityWeatherReport.location.localTime,
                  dateFormats.hourMinutes
                ),
              },
              {
                label: "Wind speed",
                value: `${selectedCityWeatherReport.windSpeed.kilometersPerHour} Km/h`,
              },
              {
                label: "Humidity",
                value: `${selectedCityWeatherReport.humidity}%`,
              },
              {
                label: "Clouds",
                value: `${selectedCityWeatherReport.cloudPercentage}%`,
              },
            ]}
          />
          <LinkButton
            href={`${ROUTES.CITY_DETAILS}/${selectedCityWeatherReport.location.id}`}
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

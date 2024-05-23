import { Heading, Stack } from "@/components/base";
import { getWeatherTypeFromWeather } from "@/utils/weather";
import {
  DegreesIndicator,
  FavoriteButton,
  WeatherIcon,
} from "@/components/compositions";
import { Weather } from "@/types";

interface RealtimeWeatherReportProps {
  weather: Weather;
}

function RealtimeWeatherReport({ weather }: RealtimeWeatherReportProps) {
  const weatherIconType = getWeatherTypeFromWeather(weather);

  return (
    <Stack alignItems="center" spacing={4}>
      <WeatherIcon type={weatherIconType} size="large" />
      <Stack spacing={1} alignItems="center">
        <Stack direction="row">
          <Heading as="h4" fontWeight="semiBold">
            {weather.city}
          </Heading>
          <FavoriteButton city={weather.city} />
        </Stack>
        <DegreesIndicator
          temperature={weather.temperature.celsius}
          scale="celsius"
          size="large"
        />
      </Stack>
    </Stack>
  );
}

export { RealtimeWeatherReport };

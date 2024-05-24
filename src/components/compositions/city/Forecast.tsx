import { format } from "date-fns";
import { Heading, Stack } from "@/components/base";
import { dateFormats } from "@/constants";
import { WeatherForecast } from "@/types";
import { DetailedWeatherInformation } from "../shared/DetailedWeatherInformation";

interface ForecastItemProps {
  weather: WeatherForecast;
}

function ForecastItem({ weather }: ForecastItemProps) {
  return (
    <Stack backgroundColor="#FDFCFC" borderRadius={2} spacing={1.5}>
      <Heading as="h6" fontWeight="regular">
        {format(weather.date, dateFormats.dayMonth)}
      </Heading>
      <DetailedWeatherInformation
        itemsPerRow={3}
        items={[
          {
            label: "Max. temperature",
            value: `${weather.maximumTemperature.celsius}º`,
          },
          {
            label: "Min. temperature",
            value: `${weather.minimumTemperature.celsius}º`,
          },
          {
            label: "Humidity",
            value: `${weather.humidity}%`,
          },
          {
            label: "Wind speed",
            value: `${weather.maximumWindSpeed.kilometersPerHour} km/h`,
          },
          {
            label: "UV factor",
            value: `${weather.uv} km/h`,
          },
          {
            label: "Chances of rain",
            value: `${weather.chancesOfRain}%`,
          },
        ]}
      />
    </Stack>
  );
}

export { ForecastItem };

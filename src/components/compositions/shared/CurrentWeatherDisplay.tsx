import React from "react";
import { Grid } from "@mui/material";
import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import { Text } from "@/components/base";

interface CurrentWeatherDisplayProps {
  city: string;
}

interface CurrentWeatherInfoItemProps {
  label: string;
  value: string;
}

function CurrentWeatherInfoItem({ label, value }: CurrentWeatherInfoItemProps) {
  return (
    <Grid item xs={3}>
      <Text textAlign="center" color="#C4C4C4">
        {label}
      </Text>
      <Text textAlign="center" color="#9A9A9A">
        {value}
      </Text>
    </Grid>
  );
}

function CurrentWeatherDisplay({ city }: CurrentWeatherDisplayProps) {
  const {
    helpers: { getCurrentCityWeather },
  } = useWeatherContext();
  const weatherInformation = getCurrentCityWeather(city);

  if (!weatherInformation) return null;

  const weatherInfoItemProps: CurrentWeatherInfoItemProps[] = [
    { label: "TIME", value: new Date().toString() },
    {
      label: "WIND SPEED",
      value: `${weatherInformation.windSpeed.kilometersPerHour} Km/h`,
    },
    {
      label: "HUMIDITY",
      value: `${weatherInformation.humidity}%`,
    },
    { label: "CLOUDS", value: `${weatherInformation.cloudPercentage}%` },
  ];

  return (
    <Grid
      container
      padding={2.5}
      sx={{
        backgroundColor: "#FDFCFC",
      }}
      borderRadius={2}
    >
      {weatherInfoItemProps.map((props) => (
        <CurrentWeatherInfoItem {...props} />
      ))}
    </Grid>
  );
}

export { CurrentWeatherDisplay };

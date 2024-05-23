import React from "react";
import { Grid } from "@mui/material";
import { Text } from "@/components/base";
interface WeatherInformationItemProps {
  label: string;
  value: string;
}

interface DetailedWeatherInformationProps {
  items: WeatherInformationItemProps[];
}

function WeatherInfoItem({ label, value }: WeatherInformationItemProps) {
  return (
    <Grid item xs={3}>
      <Text textAlign="center" color="#C4C4C4" textTransform="uppercase">
        {label}
      </Text>
      <Text textAlign="center" color="#9A9A9A">
        {value}
      </Text>
    </Grid>
  );
}

function DetailedWeatherInformation({
  items,
}: DetailedWeatherInformationProps) {
  return (
    <Grid
      container
      padding={2.5}
      sx={{
        backgroundColor: "#FDFCFC",
      }}
      borderRadius={2}
    >
      {items.map((props) => (
        <WeatherInfoItem key={props.label} {...props} />
      ))}
    </Grid>
  );
}

export { DetailedWeatherInformation };

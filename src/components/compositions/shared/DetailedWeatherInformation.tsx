import React from "react";
import { Grid } from "@mui/material";
import { Text } from "@/components/base";
interface WeatherInformationItemProps {
  label: string;
  value: string;
}

interface DetailedWeatherInformationProps {
  items: WeatherInformationItemProps[];
  itemsPerRow?: number;
}

function WeatherInfoItem({ label, value }: WeatherInformationItemProps) {
  return (
    <>
      <Text textAlign="center" color="#C4C4C4" textTransform="uppercase">
        {label}
      </Text>
      <Text textAlign="center" color="#9A9A9A">
        {value}
      </Text>
    </>
  );
}

function DetailedWeatherInformation({
  items,
  itemsPerRow = 4,
}: DetailedWeatherInformationProps) {
  return (
    <Grid
      container
      paddingY={2}
      paddingX={1}
      sx={{
        backgroundColor: "#FDFCFC",
        flexGrow: 1,
      }}
      rowSpacing={1}
      justifyContent="space-between"
      borderRadius={2}
    >
      {items.map((props) => (
        <Grid item xs={12 / itemsPerRow}>
          <WeatherInfoItem key={props.label} {...props} />
        </Grid>
      ))}
    </Grid>
  );
}

export { DetailedWeatherInformation };

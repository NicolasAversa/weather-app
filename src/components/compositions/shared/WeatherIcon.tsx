import Image from "next/image";
import clouds from "@/assets/icons/weatherTypes/clouds.svg";
import cloudy from "@/assets/icons/weatherTypes/cloudy.svg";
import raining from "@/assets/icons/weatherTypes/raining.svg";
import sunny from "@/assets/icons/weatherTypes/sunny.svg";
import { WeatherTypes } from "@/types";

enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}
interface WeatherIconProps {
  type: `${WeatherTypes}`;
  size?: `${IconSize}`;
}

const iconSizes: Record<IconSize, number> = {
  [IconSize.SMALL]: 32,
  [IconSize.MEDIUM]: 80,
  [IconSize.LARGE]: 128,
};

const weatherTypesIcons: Record<WeatherTypes, string> = {
  [WeatherTypes.SUNNY]: sunny,
  [WeatherTypes.CLOUDY]: cloudy,
  [WeatherTypes.CLOUDS]: clouds,
  [WeatherTypes.RAIN]: raining,
};

function WeatherIcon({ type, size = "medium" }: WeatherIconProps) {
  return (
    <Image
      src={weatherTypesIcons[type]}
      alt={`${type} weather`}
      height={iconSizes[size]}
    />
  );
}

export { WeatherIcon };

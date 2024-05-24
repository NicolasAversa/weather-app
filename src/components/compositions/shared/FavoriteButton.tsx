import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import { IconButton, IconProps } from "@/components/base";

interface FavoriteButtonProps {
  cityId: string;
}

function FavoriteButton({ cityId }: FavoriteButtonProps) {
  const {
    dispatchers: { saveLocationToFavorites, removeLocationToFavorites },
    helpers: { isFavoriteCity },
  } = useWeatherContext();

  const isCitySavedAsFavorite = isFavoriteCity(cityId);

  const icon: IconProps["as"] = isCitySavedAsFavorite ? "star" : "starBorder";

  const handleClick = isCitySavedAsFavorite
    ? removeLocationToFavorites
    : saveLocationToFavorites;

  return <IconButton as={icon} onClick={() => handleClick(cityId)} />;
}

export { FavoriteButton };

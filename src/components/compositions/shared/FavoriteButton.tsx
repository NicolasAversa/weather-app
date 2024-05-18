import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { IconButton } from "@mui/material";

interface FavoriteButtonProps {
  city: string;
}

function FavoriteButton({ city }: FavoriteButtonProps) {
  const {
    dispatchers: { saveLocationToFavorites, removeLocationToFavorites },
    helpers: { isFavoriteCity },
  } = useWeatherContext();

  const isCitySavedAsFavorite = isFavoriteCity(city);

  const IconComponent = isCitySavedAsFavorite
    ? StarIcon
    : StarBorderOutlinedIcon;

  const handleClick = isCitySavedAsFavorite
    ? removeLocationToFavorites
    : saveLocationToFavorites;

  return (
    <IconButton onClick={() => handleClick(city)}>
      <IconComponent />
    </IconButton>
  );
}

export { FavoriteButton };

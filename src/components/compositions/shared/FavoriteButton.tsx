import { useWeatherContext } from "@/context/weatherContext/hooks/useWeatherContext";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { IconButton } from "@mui/material";

interface FavoriteButtonProps {
  cityId: string;
}

function FavoriteButton({ cityId }: FavoriteButtonProps) {
  const {
    dispatchers: { saveLocationToFavorites, removeLocationToFavorites },
    helpers: { isFavoriteCity },
  } = useWeatherContext();

  const isCitySavedAsFavorite = isFavoriteCity(cityId);

  const IconComponent = isCitySavedAsFavorite
    ? StarIcon
    : StarBorderOutlinedIcon;

  const handleClick = isCitySavedAsFavorite
    ? removeLocationToFavorites
    : saveLocationToFavorites;

  return (
    <IconButton onClick={() => handleClick(cityId)}>
      <IconComponent />
    </IconButton>
  );
}

export { FavoriteButton };

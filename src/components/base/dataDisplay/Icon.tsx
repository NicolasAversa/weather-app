import { icons } from "./icons";
import { IconProps as MuiIconProps } from "@mui/material";

const { filled } = icons;

interface IconProps {
  as: keyof typeof filled;
  size?: MuiIconProps["fontSize"];
  variant?: keyof typeof icons;
}

function Icon({ as, variant = "filled", size, ...rest }: IconProps) {
  const Icon = icons[variant][as];
  return <Icon {...rest} fontSize={size} />;
}

export { Icon };
export type { IconProps };

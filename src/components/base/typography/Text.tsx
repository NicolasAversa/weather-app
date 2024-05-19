import { Typography } from "@mui/material";
import { CommonTypographyProps } from "./types";
import { fontWeights } from "./constants";

interface TextProps extends CommonTypographyProps {
  as?: "p" | "span";
}

function Text({ fontWeight, color = "#2C2C2C", as = "p", ...rest }: TextProps) {
  return (
    <Typography
      {...rest}
      component={as}
      variant="body1"
      color={color}
      fontWeight={fontWeight ? fontWeights[fontWeight] : undefined}
    />
  );
}

export { Text };

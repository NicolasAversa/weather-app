import { Typography } from "@mui/material";
import { CommonTypographyProps } from "./types";
import { fontWeights } from "./constants";

interface TextProps extends CommonTypographyProps {}

function Text({ fontWeight, color = "#2C2C2C", ...rest }: TextProps) {
  return (
    <Typography
      {...rest}
      variant="body1"
      color={color}
      fontWeight={fontWeight ? fontWeights[fontWeight] : undefined}
    />
  );
}

export { Text };

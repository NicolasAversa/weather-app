import { Typography, TypographyProps } from "@mui/material";
import { CommonTypographyProps } from "./types";
import { fontWeights } from "./constants";

interface TextProps extends CommonTypographyProps {
  as: Extract<
    TypographyProps["variant"],
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  >;
}

function Heading({ fontWeight, color = "#2C2C2C", ...rest }: TextProps) {
  return (
    <Typography
      {...rest}
      variant={rest.as}
      color={color}
      fontWeight={fontWeight ? fontWeights[fontWeight] : undefined}
    />
  );
}

export { Heading };

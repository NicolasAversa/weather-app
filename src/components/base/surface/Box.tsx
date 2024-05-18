import { Box as MuiBox } from "@mui/material";
import {
  BackgroundProps,
  BorderRadiusProps,
  MarginProps,
  PaddingProps,
} from "../types";

interface BoxProps
  extends MarginProps,
    PaddingProps,
    BorderRadiusProps,
    BackgroundProps {}

const Box = ({ backgroundColor, ...rest }: BoxProps) => {
  return (
    <MuiBox
      {...rest}
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : undefined,
      }}
    />
  );
};

export { Box };

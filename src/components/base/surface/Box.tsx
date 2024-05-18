import { Box as MuiBox } from "@mui/material";
import {
  BackgroundProps,
  BorderProps,
  BorderRadiusProps,
  MarginProps,
  PaddingProps,
} from "../types";

interface BoxProps
  extends MarginProps,
    PaddingProps,
    BorderProps,
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

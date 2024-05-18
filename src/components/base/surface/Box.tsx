import { Box as MuiBox } from "@mui/material";
import { ReactNode } from "react";
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
    BackgroundProps {
  children?: ReactNode;
}

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

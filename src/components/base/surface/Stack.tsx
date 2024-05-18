import { ReactNode } from "react";
import { Stack as MuiStack, StackProps as MuiStackProps } from "@mui/material";
import {
  BackgroundProps,
  BorderRadiusProps,
  MarginProps,
  PaddingProps,
  FlexboxProps,
} from "../types";

interface StackProps
  extends MarginProps,
    PaddingProps,
    BorderRadiusProps,
    BackgroundProps,
    FlexboxProps,
    Pick<MuiStackProps, "direction" | "spacing"> {
  children?: ReactNode;
}

const Stack = ({ backgroundColor, ...rest }: StackProps) => {
  return (
    <MuiStack
      {...rest}
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : undefined,
      }}
    />
  );
};

export { Stack };

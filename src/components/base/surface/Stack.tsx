import { Stack as MuiStack } from "@mui/material";
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
    FlexboxProps {}

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

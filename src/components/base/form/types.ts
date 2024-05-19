import { TextFieldProps } from "@mui/material";
import { IconProps } from "..";

interface CommonInputSpecificProps
  extends Pick<
    TextFieldProps,
    | "id"
    | "label"
    | "onChange"
    | "name"
    | "onFocus"
    | "onBlur"
    | "value"
    | "autoComplete"
    | "size"
    | "fullWidth"
  > {}

interface CommonInputProps extends CommonInputSpecificProps {
  rightIcon?: IconProps["as"];
  leftIcon?: IconProps["as"];
}

export type { CommonInputProps };

import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { MarginProps } from "../types";
import { Icon, IconProps } from "@/components/base";

interface ButtonProps
  extends MarginProps,
    Pick<
      MuiButtonProps,
      "onClick" | "variant" | "size" | "fullWidth" | "children"
    > {
  startIcon?: IconProps["as"];
  endIcon?: IconProps["as"];
}

function Button({ startIcon, endIcon, ...rest }: ButtonProps) {
  return (
    <MuiButton
      {...rest}
      startIcon={startIcon ? <Icon as={startIcon} /> : undefined}
      endIcon={endIcon ? <Icon as={endIcon} /> : undefined}
    />
  );
}

export { Button };
export type { ButtonProps };

import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";
import { MarginProps } from "../types";
import { Icon, IconProps } from "@/components/base";

interface ButtonProps
  extends MarginProps,
    IconProps,
    Pick<MuiIconButtonProps, "onClick"> {}

function IconButton({ as, variant, size, ...rest }: ButtonProps) {
  return (
    <MuiIconButton {...rest}>
      <Icon as={as} size={size} variant={variant} />
    </MuiIconButton>
  );
}

export { IconButton };

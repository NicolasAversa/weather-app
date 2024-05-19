import { InputAdornment, TextField } from "@mui/material";
import { CommonInputProps } from "./types";
import { Icon, IconProps } from "@/components/base";

interface TextInputProps extends CommonInputProps {}

interface InputIconProps {
  as: IconProps["as"];
  position: "start" | "end";
}

function InputIcon({ as, position }: InputIconProps) {
  return (
    <InputAdornment position={position}>
      <Icon as={as} />
    </InputAdornment>
  );
}

function TextInput({ leftIcon, rightIcon, ...rest }: TextInputProps) {
  return (
    <TextField
      size="small"
      {...rest}
      InputProps={{
        sx: { borderRadius: 3 },
        startAdornment: leftIcon ? (
          <InputIcon as={leftIcon} position="start" />
        ) : undefined,
        endAdornment: rightIcon ? (
          <InputIcon as={rightIcon} position="end" />
        ) : undefined,
      }}
    />
  );
}

export { TextInput };

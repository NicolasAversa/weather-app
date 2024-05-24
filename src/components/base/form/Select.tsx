import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  TextField,
} from "@mui/material";

type Option = {
  label: string;
  value: string;
};

interface SelectProps
  extends Pick<
    MuiAutocompleteProps<Option, false, false, false>,
    "inputValue" | "onInputChange" | "value" | "onChange"
  > {
  label?: string;
  options: Option[];
}

function Select({ label, ...rest }: SelectProps) {
  return (
    <MuiAutocomplete
      {...rest}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export { Select };
export type { Option };

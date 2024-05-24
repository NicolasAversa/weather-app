import { useState } from "react";
import { Option, Select } from "@/components/base";
import { useAutocomplete } from "@/hooks";
import { CityDetails } from "@/types";
import { buildLocationLabel } from "@/utils/textFormatters";

interface SelectCityFormProps {
  onCitySelected: (city: string) => void;
}

const formatOption = (option: CityDetails): Option => {
  const { name, region, country } = option;
  const location = buildLocationLabel(name, region, country);

  return {
    label: location,
    value: location,
  };
};

function SelectCityForm({ onCitySelected }: SelectCityFormProps) {
  const [input, setInput] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const { options } = useAutocomplete(input);

  return (
    <Select
      label="Search your city"
      options={options.map(formatOption)}
      inputValue={input}
      onInputChange={(_, newInputValue) => {
        setInput(newInputValue);
      }}
      value={selectedCity}
      onChange={(_, newValue) => {
        if (!newValue) return;
        setSelectedCity(newValue);
        onCitySelected(newValue.value);
      }}
    />
  );
}

export { SelectCityForm };

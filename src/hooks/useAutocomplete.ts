import { CityDetails } from "@/types";
import { useDebounce } from "./useDebounce";
import { useEffect, useState } from "react";
import { fetchCityOptionsFromTerm } from "@/utils/api";

interface UseAutocompleteReturn {
  options: CityDetails[];
}

const DELAY = 300;

const useAutocomplete = (searchTerm?: string): UseAutocompleteReturn => {
  const debouncedSearchTerm = useDebounce(searchTerm, DELAY);
  const [options, setOptions] = useState<CityDetails[]>([]);

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    (async () => {
      const response = await fetchCityOptionsFromTerm(debouncedSearchTerm);
      if (!response) return;
      setOptions(response);
    })();
  }, [debouncedSearchTerm]);

  return { options };
};

export { useAutocomplete };

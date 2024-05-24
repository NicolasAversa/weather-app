type AutocompleteApiOption = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

type AutocompleteApiResponse = AutocompleteApiOption[];

export type { AutocompleteApiResponse, AutocompleteApiOption };

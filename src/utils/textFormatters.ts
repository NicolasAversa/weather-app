const buildLocationLabel = (
  name: string,
  region: string,
  country: string
): string => [name, region, country].join(", ");

const locationToLocationId = (location: string): string => {
  const locationId = location
    .split(" ")
    .map((location) => location.replace(",", "").trim())
    .join("-")
    .toLowerCase();

  return locationId;
};

export { buildLocationLabel, locationToLocationId };

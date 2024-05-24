const stringifyLocation = (
  name: string,
  region: string,
  country: string
): string => `${name}, ${region}, ${country}`;

const locationToLocationId = (location: string): string => {
  const locationId = location.toLowerCase().replace(",", "").replace(" ", "-");

  return locationId;
};

export { stringifyLocation, locationToLocationId };

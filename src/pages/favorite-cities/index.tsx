import { Heading, Stack } from "@/components/base";
import { FavoriteCitySection } from "@/components/compositions";

export default function FavoriteCities() {
  return (
    <Stack spacing={1}>
      <Heading as="h4" fontWeight="semiBold">
        Favorite cities
      </Heading>
      <FavoriteCitySection />
    </Stack>
  );
}

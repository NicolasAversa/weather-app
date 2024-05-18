import { format } from "date-fns";
import { Box, Stack, Text } from "@/components/base";

interface ForecastItemProps {
  date: Date;
  maximumTemperature: number;
  minimumTemperature: number;
  cloudPercentage: number;
}

function ForecastItem({
  cloudPercentage,
  date,
  maximumTemperature,
  minimumTemperature,
}: ForecastItemProps) {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        paddingX={2}
        paddingY={1}
      >
        <Text>{format(date, "d MMM")}</Text>
        <Stack direction="row" justifyContent="space-between">
          <Text>{maximumTemperature}</Text>
          <Text>----</Text>
          <Text>{minimumTemperature}</Text>
        </Stack>
        <Text>{cloudPercentage}</Text>
      </Stack>
    </Box>
  );
}

export { ForecastItem };

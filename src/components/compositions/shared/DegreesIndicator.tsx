import { Heading, Text } from "@/components/base";
import { Sizes } from "@/components/base/types";
import { CommonTypographyProps } from "@/components/base/typography/types";

type DegreesIndicatorSizes = Extract<Sizes, "medium" | "large">;

interface DegreesIndicatorProps {
  temperature: number;
  scale: "celsius" | "fahrenheit";
  size?: `${DegreesIndicatorSizes}`;
}

const scaleSymbolsProps: Record<
  DegreesIndicatorProps["scale"],
  {
    label: string;
    fontSize: Record<DegreesIndicatorSizes, CommonTypographyProps["fontSize"]>;
  }
> = {
  celsius: {
    label: "º",
    fontSize: {
      medium: "2rem",
      large: 32,
    },
  },
  fahrenheit: {
    label: "ºF",
    fontSize: {
      medium: "1.5rem",
      large: 0,
    },
  },
};

const sizes: Record<DegreesIndicatorSizes, CommonTypographyProps["fontSize"]> =
  {
    medium: "3.75rem",
    large: "6rem",
  };

function DegreesIndicator({
  temperature,
  scale,
  size = "medium",
}: DegreesIndicatorProps) {
  return (
    <Heading
      as="h2"
      fontWeight="semiBold"
      position="relative"
      textAlign="center"
      fontSize={sizes[size]}
    >
      {temperature}
      <Text
        as="span"
        fontSize={scaleSymbolsProps[scale].fontSize[size]}
        fontWeight="semiBold"
        position="absolute"
        top={0}
        marginTop={0.25}
      >
        {scaleSymbolsProps[scale].label}
      </Text>
    </Heading>
  );
}

export { DegreesIndicator };

import { BoxProps } from "@mui/material";

interface MarginProps
  extends Pick<
    BoxProps,
    | "margin"
    | "marginLeft"
    | "marginTop"
    | "marginRight"
    | "marginBottom"
    | "marginX"
    | "marginY"
  > {}

interface PaddingProps
  extends Pick<
    BoxProps,
    | "padding"
    | "paddingLeft"
    | "paddingTop"
    | "paddingRight"
    | "paddingBottom"
    | "paddingX"
    | "paddingY"
  > {}

interface BorderProps
  extends Pick<
    BoxProps,
    "border" | "borderLeft" | "borderTop" | "borderRight" | "borderBottom"
  > {}

interface BorderRadiusProps extends Pick<BoxProps, "borderRadius"> {}

interface PositionProps
  extends Pick<BoxProps, "position" | "left" | "top" | "right" | "bottom"> {}

interface TransformProps extends Pick<BoxProps, "translate"> {}

interface SizeProps
  extends Pick<
    BoxProps,
    "width" | "minWidth" | "maxWidth" | "height" | "minHeight" | "maxHeight"
  > {}

interface BackgroundProps {
  backgroundColor?: string;
}

interface FlexboxProps
  extends Pick<
    BoxProps,
    | "justifyContent"
    | "justifyItems"
    | "justifySelf"
    | "alignContent"
    | "alignItems"
    | "alignSelf"
  > {}

enum Sizes {
  EXTRA_SMALL = "extraSmall",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  EXTRA_LARGE = "extraLarge",
}

export type {
  MarginProps,
  PaddingProps,
  BorderProps,
  BorderRadiusProps,
  PositionProps,
  TransformProps,
  SizeProps,
  BackgroundProps,
  FlexboxProps,
};
export { Sizes };

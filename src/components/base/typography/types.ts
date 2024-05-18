import { TypographyProps } from "@mui/material";
import { MarginProps, PaddingProps, PositionProps } from "../types";

enum FontWeight {
  REGULAR = "regular",
  MEDIUM = "medium",
  SEMI_BOLD = "semiBold",
}

interface CommonTypographySpecificProps
  extends Pick<
    TypographyProps,
    | "children"
    | "color"
    | "fontSize"
    | "fontStyle"
    | "fontWeight"
    | "textAlign"
    | "textTransform"
    | "letterSpacing"
    | "lineHeight"
  > {
  fontWeight?: `${FontWeight}`;
}

interface CommonTypographyProps
  extends CommonTypographySpecificProps,
    MarginProps,
    PaddingProps,
    PositionProps {}

export type { CommonTypographyProps };
export { FontWeight };

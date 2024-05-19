import {
  Skeleton as MuiSkeleton,
  SkeletonProps as MuiSkeletonProps,
} from "@mui/material";

interface SkeletonProps
  extends Pick<MuiSkeletonProps, "variant" | "width" | "height"> {}

function Skeleton(props: SkeletonProps) {
  return <MuiSkeleton {...props} sx={{ borderRadius: 3 }} />;
}

export { Skeleton };

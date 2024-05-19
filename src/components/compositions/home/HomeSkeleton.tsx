import { Skeleton, Stack } from "@/components/base";
import React from "react";

const HomeSkeleton = () => {
  return (
    <Stack direction="column" spacing={3}>
      <Skeleton variant="rectangular" height={325} />
      <Skeleton variant="rectangular" height={88} />
    </Stack>
  );
};

export { HomeSkeleton };

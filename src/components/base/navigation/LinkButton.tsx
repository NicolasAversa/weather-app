import Link from "next/link";
import React from "react";
import { Button, ButtonProps } from "@/components/base";

interface LinkButtonProps extends ButtonProps {
  href: string;
}

function LinkButton({ href, ...rest }: LinkButtonProps) {
  return (
    <Link href={href}>
      <Button {...rest} />
    </Link>
  );
}

export { LinkButton };

import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./arrow";

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="text-link" href={href}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

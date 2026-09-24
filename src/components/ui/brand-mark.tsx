import Image from "next/image";
import { withBasePath } from "@/lib/base-path";

export function BrandMark({ priority = false }: { priority?: boolean }) {
  return (
    <span className="brand-mark">
      <Image
        src={withBasePath("/brand/lockup-light.png")}
        alt="Nuvora"
        width={2172}
        height={725}
        priority={priority}
        sizes="180px"
      />
    </span>
  );
}

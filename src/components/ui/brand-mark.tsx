import Image from "next/image";

export function BrandMark({ priority = false }: { priority?: boolean }) {
  return (
    <span className="brand-mark">
      <Image
        src="/brand/lockup-light.png"
        alt="Nuvora"
        width={2172}
        height={725}
        priority={priority}
        sizes="180px"
      />
    </span>
  );
}

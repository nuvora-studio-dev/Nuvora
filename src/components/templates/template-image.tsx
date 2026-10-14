import Image, { type ImageProps } from "next/image";

// Static export uses prebuilt derivatives rather than a runtime image optimizer.
export function TemplateImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  ...props
}: Omit<ImageProps, "src"> & { src: string }) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${src.replace(/\.webp$/, "-small.webp")} 700w, ${src} 1400w`}
        sizes={sizes}
      />
      <Image
        {...props}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

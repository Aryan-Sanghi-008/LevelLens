import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const FALLBACK_SRC =
  "https://ui-avatars.com/api/?name=Company&background=random&color=fff&rounded=true";

/** ui-avatars.com serves SVG; bypass the optimizer to avoid "received null" errors */
function shouldSkipOptimization(src: string): boolean {
  try {
    const host = new URL(src).hostname;
    return host === "ui-avatars.com";
  } catch {
    return false;
  }
}

export interface CompanyLogoProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt?: string;
  name?: string;
}

export function CompanyLogo({
  src,
  alt = "Company",
  name,
  className,
  width = 32,
  height = 32,
  ...props
}: CompanyLogoProps) {
  const resolved =
    src ||
    (name
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&rounded=true`
      : FALLBACK_SRC);

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
      unoptimized={shouldSkipOptimization(resolved)}
      {...props}
    />
  );
}

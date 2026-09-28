import Image from "next/image";
import type { ProjectMedia as Media } from "@/lib/content";

/**
 * Full-bleed background for a project panel. Projects without photography
 * yet get a 3D perspective grid so the layout still reads as intentional.
 */
export default function ProjectMedia({ media, sizes = "100vw" }: { media: Media; sizes?: string }) {
  if (media?.type === "video") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        src={media.src}
      />
    );
  }

  if (media?.type === "image") {
    return <Image src={media.src} alt="" fill sizes={sizes} className="object-cover" />;
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#040607] [perspective:600px]">
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[60%] aspect-square rounded-full blur-[100px] opacity-40"
        style={{ background: "radial-gradient(closest-side, #0cb0d0, transparent)" }}
      />
      <div
        className="absolute -inset-x-1/2 -bottom-[10%] h-[85%] origin-bottom [transform:rotateX(68deg)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(12,176,208,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(12,176,208,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to top, black 10%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 90%)",
        }}
      />
    </div>
  );
}

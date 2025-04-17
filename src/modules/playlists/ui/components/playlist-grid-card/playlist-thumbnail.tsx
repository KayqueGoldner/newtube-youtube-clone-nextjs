import Image from "next/image";
import { ListVideoIcon, PlayIcon } from "lucide-react";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { Skeleton } from "@/components/ui/skeleton";

interface PlaylistThumbnailProps {
  title: string;
  imageUrl?: string | null;
  videoCount: number;
  className?: string;
}

export const PlaylistThumbnailSkeleton = () => {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl pt-3">
      <Skeleton className="size-full" />
    </div>
  );
};

export const PlaylistThumbnail = ({
  title,
  imageUrl,
  videoCount,
  className,
}: PlaylistThumbnailProps) => {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(videoCount);
  }, [videoCount]);

  return (
    <div className={cn("relative pt-3", className)}>
      {/* stack effect layers */}
      <div className="relative">
        {/* background layers */}
        <div className="absolute -top-3 left-1/2 aspect-video w-[97%] -translate-x-1/2 overflow-hidden rounded-xl bg-black/20" />
        <div className="absolute -top-1.5 left-1/2 aspect-video w-[98.5%] -translate-x-1/2 overflow-hidden rounded-xl bg-black/25" />
        {/* main image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={imageUrl ?? THUMBNAIL_FALLBACK}
            alt={title}
            className="size-full object-cover"
            fill
          />

          {/* hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-x-2">
              <PlayIcon className="size-4 fill-white text-white" />
              <span className="font-medium text-white">Play all</span>
            </div>
          </div>
        </div>
      </div>

      {/* video count indicator */}
      <div className="absolute bottom-2 right-2 flex items-center gap-x-1 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
        <ListVideoIcon className="size-4" />
        <span className="font-medium">{compactViews} videos</span>
      </div>
    </div>
  );
};

import Image from "next/image";

import { formatDuration } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoThumbnailProps {
  title: string;
  imageUrl?: string | null;
  previewUrl?: string | null;
  duration: number;
}

export const VideoThumbnailSkeleton = () => {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <Skeleton className="size-full" />
    </div>
  );
};

export const VideoThumbnail = ({
  imageUrl,
  title,
  previewUrl,
  duration,
}: VideoThumbnailProps) => {
  return (
    <div className="group relative">
      {/* thumbnail wrapper */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={imageUrl ?? THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="size-full object-cover group-hover:opacity-0"
        />
        <Image
          src={previewUrl ?? THUMBNAIL_FALLBACK}
          alt={title}
          className="size-full object-cover opacity-0 group-hover:opacity-100"
          unoptimized={!!previewUrl}
          fill
        />
      </div>

      {/* video duration box */}
      <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
        {formatDuration(duration)}
      </div>
    </div>
  );
};

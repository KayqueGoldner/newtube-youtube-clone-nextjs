import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/client";

import { VideoGetOneOutput } from "../../types";

interface VideoReactionsProps {
  videoId: string;
  likes: number;
  dislikes: number;
  viewerReaction: VideoGetOneOutput["viewerReaction"];
}

export const VideoReactions = ({
  dislikes,
  likes,
  videoId,
  viewerReaction,
}: VideoReactionsProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const like = trpc.videoReactions.like.useMutation({
    onError: (error) => {
      toast.error(error.message);
      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
      utils.playlists.getLiked.invalidate();
    },
  });
  const dislike = trpc.videoReactions.dislike.useMutation({
    onError: (error) => {
      toast.error(error.message);
      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
      utils.playlists.getLiked.invalidate();
    },
  });

  return (
    <div className="flex flex-none items-center">
      <Button
        variant="secondary"
        className="gap-2 rounded-l-full rounded-r-none pr-4"
        onClick={() => like.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
      >
        <ThumbsUpIcon
          className={cn("size-5", viewerReaction === "like" && "fill-black")}
        />
        {likes}
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        variant="secondary"
        className="rounded-l-none rounded-r-full pl-3"
        onClick={() => dislike.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
      >
        <ThumbsDownIcon
          className={cn("size-5", viewerReaction === "dislike" && "fill-black")}
        />
        {dislikes}
      </Button>
    </div>
  );
};

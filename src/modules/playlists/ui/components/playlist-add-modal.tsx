import { toast } from "sonner";
import { Loader2Icon, SquareCheckIcon, SquareIcon } from "lucide-react";

import { ResponsiveModal } from "@/components/responsive-modal";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT } from "@/constants";
import { InfiniteScroll } from "@/components/infinite-scroll";

interface PlaylistAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string;
}

export const PlaylistAddModal = ({
  open,
  onOpenChange,
  videoId,
}: PlaylistAddModalProps) => {
  const utils = trpc.useUtils();
  const {
    data: playlists,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = trpc.playlists.getManyForVideo.useInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
      videoId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!videoId && open,
    },
  );

  const addVideo = trpc.playlists.addVideo.useMutation({
    onSuccess: () => {
      toast.success("Video added to playlist");
      utils.playlists.getMany.invalidate();
      utils.playlists.getManyForVideo.invalidate({ videoId });
      // TODO: invalidate playlists.getOne
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const removeVideo = trpc.playlists.removeVideo.useMutation({
    onSuccess: () => {
      toast.success("Video removed from playlist");
      utils.playlists.getMany.invalidate();
      utils.playlists.getManyForVideo.invalidate({ videoId });
      // TODO: invalidate playlists.getOne
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <ResponsiveModal
      title="Add to playlist"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          playlists?.pages[0].items.map((playlist) => (
            <Button
              key={playlist.id}
              variant="ghost"
              size="lg"
              className="w-full justify-start px-2 [&_svg]:size-5"
              onClick={() => {
                if (playlist.containsVideo) {
                  removeVideo.mutate({ playlistId: playlist.id, videoId });
                } else {
                  addVideo.mutate({ playlistId: playlist.id, videoId });
                }
              }}
              disabled={
                playlist.containsVideo &&
                removeVideo.isPending &&
                addVideo.isPending
              }
            >
              {playlist.containsVideo ? (
                <SquareCheckIcon className="mr-2" />
              ) : (
                <SquareIcon className="mr-2" />
              )}
              {playlist.name}
            </Button>
          ))
        )}
        {!isLoading && (
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            isManual={true}
          />
        )}
      </div>
    </ResponsiveModal>
  );
};

import { HydrateClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { VideosView } from "@/modules/playlists/ui/views/videos-view";

export const dynamic = "force-dynamic";

interface PlaylistIdPageProps {
  params: Promise<{ playlistId: string }>;
}

const PlaylistIdPage = async ({ params }: PlaylistIdPageProps) => {
  const { playlistId } = await params;

  void trpc.playlists.getVideos.prefetchInfinite({
    playlistId,
    limit: DEFAULT_LIMIT,
  });
  void trpc.playlists.getOne.prefetch({
    id: playlistId,
  });

  return (
    <HydrateClient>
      <VideosView playlistId={playlistId} />
    </HydrateClient>
  );
};

export default PlaylistIdPage;

import { HydrateClient, trpc } from "@/trpc/server";
import { PlaylistsView } from "@/modules/playlists/ui/views/playlists-view";
import { DEFAULT_LIMIT } from "@/constants";

const PlaylistsPage = async () => {
  void trpc.playlists.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <PlaylistsView />
    </HydrateClient>
  );
};

export default PlaylistsPage;

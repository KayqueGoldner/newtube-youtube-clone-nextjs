"use client";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { InfiniteScroll } from "@/components/infinite-scroll";

import { VideoRowCard } from "../components/video-row-card";
import { VideoGridCard } from "../components/video-grid-card";

interface SuggestionsSectionProps {
  videoId: string;
  isManual?: boolean;
}

export const SuggestionsSection = ({
  videoId,
  isManual,
}: SuggestionsSectionProps) => {
  const [suggestions, query] =
    trpc.suggestions.getMany.useSuspenseInfiniteQuery(
      {
        videoId,
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  return (
    <>
      <div className="hidden space-y-3 md:block">
        {suggestions.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoRowCard key={video.id} data={video} size="compact" />
          ))}
      </div>
      <div className="block space-y-10 md:hidden">
        {suggestions.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard key={video.id} data={video} />
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
        isManual={isManual}
      />
    </>
  );
};

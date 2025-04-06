"use client";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "@/modules/videos/ui/components/video-row-card";
import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "@/modules/videos/ui/components/video-grid-card";
import { InfiniteScroll } from "@/components/infinite-scroll";

interface ResultsSectionProps {
  query: string | undefined;
  categoryId: string | undefined;
}

export const ResultsSection = ({ categoryId, query }: ResultsSectionProps) => {
  const isMobile = useIsMobile();

  const [results, resultsQuery] = trpc.search.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
      query,
      categoryId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-4 gap-y-10">
          {results.pages
            .flatMap((page) => page.items)
            .map((result) => (
              <VideoGridCard key={result.id} data={result} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.pages
            .flatMap((page) => page.items)
            .map((result) => (
              <VideoRowCard key={result.id} data={result} />
            ))}
        </div>
      )}
      <InfiniteScroll
        hasNextPage={resultsQuery.hasNextPage}
        fetchNextPage={resultsQuery.fetchNextPage}
        isFetchingNextPage={resultsQuery.isFetchingNextPage}
        isManual={false}
      />
    </>
  );
};

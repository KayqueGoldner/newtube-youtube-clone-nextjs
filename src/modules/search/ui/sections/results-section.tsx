"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
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
  return (
    <Suspense
      key={`${query}-${categoryId}`}
      fallback={<ResultsSectionSkeleton />}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <ResultsSectionSuspense categoryId={categoryId} query={query} />
      </ErrorBoundary>
    </Suspense>
  );
};

const ResultsSectionSuspense = ({ categoryId, query }: ResultsSectionProps) => {
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
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {results.pages
          .flatMap((page) => page.items)
          .map((result) => (
            <VideoGridCard key={result.id} data={result} />
          ))}
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {results.pages
          .flatMap((page) => page.items)
          .map((result) => (
            <VideoRowCard key={result.id} data={result} />
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={resultsQuery.hasNextPage}
        fetchNextPage={resultsQuery.fetchNextPage}
        isFetchingNextPage={resultsQuery.isFetchingNextPage}
        isManual={false}
      />
    </>
  );
};

const ResultsSectionSkeleton = () => {
  return (
    <div>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <VideoRowCardSkeleton key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-4 gap-y-10 p-4 pt-6 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

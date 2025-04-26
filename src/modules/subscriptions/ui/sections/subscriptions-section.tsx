"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import Link from "next/link";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { InfiniteScroll } from "@/components/infinite-scroll";

import {
  SubscriptionItem,
  SubscriptionItemSkeleton,
} from "../components/subscription-item";

export const SubscriptionsSection = () => {
  return (
    <Suspense fallback={<SubscriptionsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <SubscriptionsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const SubscriptionsSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <SubscriptionItemSkeleton key={index} />
      ))}
    </div>
  );
};

const SubscriptionsSectionSuspense = () => {
  const utils = trpc.useUtils();
  const [subscriptions, query] =
    trpc.subscriptions.getMany.useSuspenseInfiniteQuery(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const unsubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: (data) => {
      toast.success("Unsubscribed");
      utils.videos.getManySubscribed.invalidate();
      utils.users.getOne.invalidate({ id: data.creatorId });
      utils.subscriptions.getMany.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        {subscriptions.pages
          .flatMap((page) => page.items)
          .map((subscription) => (
            <Link
              href={`/users/${subscription.user.id}`}
              key={subscription.creatorId}
            >
              <SubscriptionItem
                name={subscription.user.name}
                imageUrl={subscription.user.imageUrl}
                subscribrCount={subscription.user.subscriberCount}
                onUnsubscribe={() =>
                  unsubscribe.mutate({ userId: subscription.creatorId })
                }
                disabled={unsubscribe.isPending}
              />
            </Link>
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};

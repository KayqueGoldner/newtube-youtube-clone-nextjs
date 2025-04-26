import { HydrateClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { SubscriptionsView } from "@/modules/subscriptions/ui/views/subscriptions-view";

const SubscriptionsPage = () => {
  void trpc.subscriptions.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <SubscriptionsView />
    </HydrateClient>
  );
};

export default SubscriptionsPage;

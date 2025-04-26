import { SubscriptionsSection } from "../sections/subscriptions-section";

export const SubscriptionsView = () => {
  return (
    <div className="mx-auto mb-10 flex max-w-screen-md flex-col gap-y-6 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">All subscriptions</h1>
        <p className="text-xs text-muted-foreground">
          View and manage all your subscriptions
        </p>
      </div>
      <SubscriptionsSection />
    </div>
  );
};

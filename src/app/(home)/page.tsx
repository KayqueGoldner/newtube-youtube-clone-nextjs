import { Suspense } from "react";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

import { PageClient } from "./client";

export default async function Home() {
  void trpc.hello.prefetch({ text: "Kayque" });

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}

import { categoriesRouter } from "@/modules/categories/server/procedures";
import { studioRouter } from "@/modules/studio/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";
import { videoViewsRouter } from "@/modules/video-views/server/procedure";
import { videoReactionsRouter } from "@/modules/video-reactions/server/procedure";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  studio: studioRouter,
  videos: videosRouter,
  videoViews: videoViewsRouter,
  videoReactions: videoReactionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

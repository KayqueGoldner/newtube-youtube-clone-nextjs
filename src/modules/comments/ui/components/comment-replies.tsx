import { CornerDownRightIcon, Loader2Icon } from "lucide-react";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";

import { CommentItem } from "./comment-item";

interface CommentRepliesProps {
  parentId: string;
  videoId: string;
}

export const CommentReplies = ({ parentId, videoId }: CommentRepliesProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.comments.getMany.useInfiniteQuery(
      {
        limit: DEFAULT_LIMIT,
        videoId,
        parentId,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  return (
    <div className="pl-14">
      <div className="mt-2 flex flex-col gap-4">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading &&
          data?.pages
            .flatMap((page) => page.items)
            .map((comment) => (
              <CommentItem key={comment.id} comment={comment} variant="reply" />
            ))}
      </div>
      {hasNextPage && (
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          <CornerDownRightIcon />
          Show more replies
        </Button>
      )}
    </div>
  );
};

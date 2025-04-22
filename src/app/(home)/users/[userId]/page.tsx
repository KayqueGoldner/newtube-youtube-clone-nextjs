import { HydrateClient, trpc } from "@/trpc/server";
import { UserView } from "@/modules/users/ui/views/user-view";
import { DEFAULT_LIMIT } from "@/constants";

interface UsersIdPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UsersIdPage = async ({ params }: UsersIdPageProps) => {
  const { userId } = await params;

  void trpc.users.getOne.prefetch({ id: userId });
  void trpc.videos.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
    userId,
  });

  return (
    <HydrateClient>
      <UserView userId={userId} />
    </HydrateClient>
  );
};

export default UsersIdPage;

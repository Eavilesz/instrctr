import { ReviewLog } from "@/app/_components/review-log";
import { CommentBank } from "@/app/_components/comment-bank";
import { getGeneralComments, getHubResponses, getReviews } from "@/app/_lib/queries";

// Without this the route is prerendered at build time and reloads serve a
// stale snapshot of the reviews. Render on every request instead.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [initialReviews, initialHubResponses, initialComments] = await Promise.all([
    getReviews(),
    getHubResponses(),
    getGeneralComments(),
  ]);
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <div className="mx-auto w-full max-w-280 px-6 py-10 sm:py-12">
        <ReviewLog
          initialReviews={initialReviews}
          initialHubResponses={initialHubResponses}
          sidePanel={<CommentBank initialComments={initialComments} />}
        />
      </div>
    </div>
  );
}

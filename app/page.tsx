import { ReviewLog } from "@/app/_components/review-log";
import { CommentBank } from "@/app/_components/comment-bank";
import { getGeneralComments, getReviews } from "@/app/_lib/actions";

export default async function Home() {
  const [initialReviews, initialComments] = await Promise.all([
    getReviews(),
    getGeneralComments(),
  ]);
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <div className="mx-auto w-full max-w-280 px-6 py-10 sm:py-12">
        <ReviewLog
          initialReviews={initialReviews}
          sidePanel={<CommentBank initialComments={initialComments} />}
        />
      </div>
    </div>
  );
}

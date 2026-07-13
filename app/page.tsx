import { ReviewLog } from "@/app/_components/review-log";
import { getReviews } from "@/app/_lib/actions";

export default async function Home() {
  const initialReviews = await getReviews();
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <ReviewLog initialReviews={initialReviews} />
    </div>
  );
}

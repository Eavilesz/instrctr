import { FinalReview } from "@/app/_components/final-review";

export default function FinalReviewPage() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <div className="mx-auto w-full max-w-280 px-6 py-10 sm:py-12">
        <FinalReview />
      </div>
    </div>
  );
}

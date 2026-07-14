"use client";

import { useState } from "react";
import type { Review } from "@/app/_lib/types";
import { addDays, getWeekDays, isSameDay, startOfWeek } from "@/app/_lib/date";
import {
  addReview,
  removeReview,
  toggleReview,
  updateReviewEmail,
} from "@/app/_lib/actions";
import { WeekNav } from "./week-nav";
import { DayCard } from "./day-card";

export function ReviewLog({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));

  async function handleAdd(day: Date, email: string) {
    const now = new Date();
    const createdAt = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ).toISOString();

    const review = await addReview(createdAt, email);
    setReviews((prev) => [...prev, review]);
  }

  function handleToggle(id: string) {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)),
    );
    toggleReview(id).catch(console.error);
  }

  function handleRemove(id: string) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    removeReview(id).catch(console.error);
  }

  function handleEmailChange(id: string, email: string) {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, email } : r)),
    );
    updateReviewEmail(id, email).catch(console.error);
  }

  const weekDays = getWeekDays(weekStart);
  const today = new Date();

  return (
    <div className="mx-auto w-full max-w-[760px] px-6 py-10 sm:py-12">
      <WeekNav
        weekStart={weekStart}
        weekTotal={reviews.filter((r) =>
          weekDays.some((day) => isSameDay(new Date(r.createdAt), day)),
        ).length}
        onPrevWeek={() => setWeekStart((d) => addDays(d, -7))}
        onNextWeek={() => setWeekStart((d) => addDays(d, 7))}
      />

      <main className="flex flex-col gap-[18px]">
        {weekDays.map((day) => (
          <DayCard
            key={day.toISOString()}
            day={day}
            isToday={isSameDay(day, today)}
            reviews={reviews.filter((r) => isSameDay(new Date(r.createdAt), day))}
            onAdd={handleAdd}
            onToggle={handleToggle}
            onRemove={handleRemove}
            onEmailChange={handleEmailChange}
          />
        ))}
      </main>
    </div>
  );
}

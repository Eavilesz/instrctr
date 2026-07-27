"use client";

import { useEffect, useRef, useState } from "react";
import type { HubResponse, Review } from "@/app/_lib/types";
import { addDays, getWeekDays, isSameDay, startOfWeek } from "@/app/_lib/date";
import {
  addHubResponse,
  addReview,
  removeHubResponse,
  removeReview,
  setHubResponseChecked,
  setReviewDone,
  updateHubResponseUsername,
  updateReviewUsername,
} from "@/app/_lib/actions";
import { WeekNav } from "./week-nav";
import { DayCard, type DayCardHandle } from "./day-card";
import { HubDayCard } from "./hub-day-card";

export function ReviewLog({
  initialReviews,
  initialHubResponses,
  sidePanel,
}: {
  initialReviews: Review[];
  initialHubResponses: HubResponse[];
  sidePanel?: React.ReactNode;
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [hubResponses, setHubResponses] = useState<HubResponse[]>(initialHubResponses);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const todayCardRef = useRef<DayCardHandle>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "i") return;

      e.preventDefault();
      todayCardRef.current?.focusNewInput();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function handleAdd(day: Date, username: string) {
    const now = new Date();
    const createdAt = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ).toISOString();

    const review: Review = {
      id: crypto.randomUUID(),
      username,
      done: false,
      createdAt,
      completedAt: null,
    };
    setReviews((prev) => [...prev, review]);
    try {
      await addReview(review);
    } catch (error) {
      console.error(error);
      setReviews((prev) => prev.filter((r) => r.id !== review.id));
    }
  }

  function handleToggle(id: string) {
    const current = reviews.find((r) => r.id === id);
    if (!current) return;
    const done = !current.done;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, done, completedAt: done ? new Date().toISOString() : null }
          : r,
      ),
    );
    setReviewDone(id, done).catch((error) => {
      console.error(error);
      setReviews((prev) => prev.map((r) => (r.id === id ? current : r)));
    });
  }

  function handleRemove(id: string) {
    const removed = reviews.find((r) => r.id === id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    removeReview(id).catch((error) => {
      console.error(error);
      if (removed) setReviews((prev) => [...prev, removed]);
    });
  }

  function handleUsernameChange(id: string, username: string) {
    const current = reviews.find((r) => r.id === id);
    if (!current) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, username } : r)),
    );
    updateReviewUsername(id, username).catch((error) => {
      console.error(error);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, username: current.username } : r)),
      );
    });
  }

  async function handleHubAdd(day: Date, username: string) {
    const now = new Date();
    const createdAt = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ).toISOString();

    const hubResponse: HubResponse = {
      id: crypto.randomUUID(),
      username,
      checked: false,
      createdAt,
      completedAt: null,
    };
    setHubResponses((prev) => [...prev, hubResponse]);
    try {
      await addHubResponse(hubResponse);
    } catch (error) {
      console.error(error);
      setHubResponses((prev) => prev.filter((r) => r.id !== hubResponse.id));
    }
  }

  function handleHubToggle(id: string) {
    const current = hubResponses.find((r) => r.id === id);
    if (!current) return;
    const checked = !current.checked;
    setHubResponses((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, checked, completedAt: checked ? new Date().toISOString() : null }
          : r,
      ),
    );
    setHubResponseChecked(id, checked).catch((error) => {
      console.error(error);
      setHubResponses((prev) => prev.map((r) => (r.id === id ? current : r)));
    });
  }

  function handleHubRemove(id: string) {
    const removed = hubResponses.find((r) => r.id === id);
    setHubResponses((prev) => prev.filter((r) => r.id !== id));
    removeHubResponse(id).catch((error) => {
      console.error(error);
      if (removed) setHubResponses((prev) => [...prev, removed]);
    });
  }

  function handleHubUsernameChange(id: string, username: string) {
    const current = hubResponses.find((r) => r.id === id);
    if (!current) return;
    setHubResponses((prev) =>
      prev.map((r) => (r.id === id ? { ...r, username } : r)),
    );
    updateHubResponseUsername(id, username).catch((error) => {
      console.error(error);
      setHubResponses((prev) =>
        prev.map((r) => (r.id === id ? { ...r, username: current.username } : r)),
      );
    });
  }

  const weekDays = getWeekDays(weekStart);
  const today = new Date();

  return (
    <>
      <WeekNav
        weekStart={weekStart}
        weekTotal={reviews.filter(
          (r) =>
            r.done &&
            weekDays.some((day) => isSameDay(new Date(r.createdAt), day)),
        ).length}
        hubWeekTotal={hubResponses.filter(
          (r) =>
            r.checked &&
            weekDays.some((day) => isSameDay(new Date(r.createdAt), day)),
        ).length}
        onPrevWeek={() => setWeekStart((d) => addDays(d, -7))}
        onNextWeek={() => setWeekStart((d) => addDays(d, 7))}
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex flex-col gap-8 lg:w-85 lg:shrink-0">
          <main className="flex flex-col gap-4.5">
            {weekDays.map((day) => (
              <DayCard
                key={day.toISOString()}
                ref={isSameDay(day, today) ? todayCardRef : undefined}
                day={day}
                isToday={isSameDay(day, today)}
                reviews={reviews.filter((r) => isSameDay(new Date(r.createdAt), day))}
                onAdd={handleAdd}
                onToggle={handleToggle}
                onRemove={handleRemove}
                onUsernameChange={handleUsernameChange}
              />
            ))}
          </main>

          <div className="flex flex-col gap-4.5 border-t border-border pt-6">
            <span className="font-display text-[15px] font-semibold">
              HUB Responses
            </span>
            {weekDays.map((day) => (
              <HubDayCard
                key={day.toISOString()}
                day={day}
                isToday={isSameDay(day, today)}
                hubResponses={hubResponses.filter((r) => isSameDay(new Date(r.createdAt), day))}
                onAdd={handleHubAdd}
                onToggle={handleHubToggle}
                onRemove={handleHubRemove}
                onUsernameChange={handleHubUsernameChange}
              />
            ))}
          </div>
        </div>
        {sidePanel && <div className="min-w-0 flex-1">{sidePanel}</div>}
      </div>
    </>
  );
}

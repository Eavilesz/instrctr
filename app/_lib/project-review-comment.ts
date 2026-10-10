const SUMMARY_TOGGLE = "**↓ Expand to see the whole summary ↓**";

const INTRO = `Fantastic job on submitting your Project! This is a significant milestone, and you should be proud of your progress.`;

const CORRECTIONS = `There are few things that need to be corrected in your project. They're mostly minor issues that are easy to fix.

- Element_1`;

const REMINDER = `**Reminder:** For the project to be accepted, you must fix all **"Needs correcting"** comments. **"Could be improved"** comments are optional, so you can implement them if you choose.`;

const CONTACT = `If you have any questions or if any part of this review needs clarification, please don’t hesitate to reach out to me on TripleTen HUB (Ernesto Aviles).`;

const CLOSING = `Your hard work on this project is truly commendable. While there are still some adjustments needed, don't forget to celebrate your progress and achievements. If you need any assistance with the feedback or understanding certain concepts, our tutors are here to help. Keep moving forward and maintain your dedication—you're doing an amazing job!✨`;

// Accepts one item per line and tolerates items pasted in as "- item" / "* item".
export function parseDoneWell(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim().replace(/^[-*•]\s+/, ""))
    .filter(Boolean);
}

export function generateProjectComment(studentName: string, doneWell: string[]): string {
  const parts = [
    SUMMARY_TOGGLE,
    `Hello, ${studentName.trim() || "student"}!`,
    INTRO,
  ];

  if (doneWell.length > 0) {
    parts.push(
      [
        "**Parts I really liked in your project:**",
        "",
        ...doneWell.map((item) => `- ${item}`),
      ].join("\n"),
    );
  }

  parts.push(CORRECTIONS, REMINDER, CONTACT, CLOSING);

  return parts.join("\n\n") + "\n";
}

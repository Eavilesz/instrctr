"use server";

import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { createSession, deleteSession } from "./session";

if (!process.env.APP_PASSWORD) {
  throw new Error("Missing APP_PASSWORD environment variable");
}
const appPassword: string = process.env.APP_PASSWORD;

function passwordsMatch(input: string, expected: string): boolean {
  const inputBuf = Buffer.from(input);
  const expectedBuf = Buffer.from(expected);
  if (inputBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(inputBuf, expectedBuf);
}

export type LoginState = { error?: string } | undefined;

export async function login(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || !passwordsMatch(password, appPassword)) {
    return { error: "Incorrect password." };
  }

  await createSession();
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

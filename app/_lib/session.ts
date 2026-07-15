import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("Missing SESSION_SECRET environment variable");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession() {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);

  (await cookies()).set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function verifySession(): Promise<boolean> {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return false;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload.authenticated === true;
  } catch {
    return false;
  }
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

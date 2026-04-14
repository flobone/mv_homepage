import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return true;
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) {
    return true;
  }

  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { syncCalendars } = await import("@/lib/calendar-sync");
    const result = await syncCalendars();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unbekannter Fehler beim Kalendersync.",
      },
      { status: 500 },
    );
  }
}
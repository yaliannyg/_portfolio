import type { Context } from "@netlify/edge-functions";

declare const Deno: { env: { get(key: string): string | undefined } };

export default async function handler(request: Request, _context: Context): Promise<Response> {
  const url = new URL(request.url);
  const airtablePath = url.pathname.replace(/^\/airtable/, "");
  const upstreamUrl = `https://api.airtable.com${airtablePath}${url.search}`;

  const token = Deno.env.get("AIRTABLE_TOKEN");
  if (!token) {
    return new Response(JSON.stringify({ error: "Missing AIRTABLE_TOKEN" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const upstreamResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: ["GET", "HEAD"].includes(request.method) ? null : await request.text(),
  });

  return new Response(await upstreamResponse.text(), {
    status: upstreamResponse.status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    },
  });
}

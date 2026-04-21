import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const rawPath = event.path.replace(/^\/(\.netlify\/functions\/airtable|airtable)/, "");
  const url = `https://api.airtable.com${rawPath}${event.rawQuery ? `?${event.rawQuery}` : ""}`;

  const response = await fetch(url, {
    method: event.httpMethod,
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : (event.body ?? undefined),
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    },
    body: JSON.stringify(data),
  };
};

export { handler };
